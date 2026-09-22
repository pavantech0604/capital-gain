import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  numeric,
  date,
} from "drizzle-orm/pg-core";

// Role definition type
export type UserRole = "admin" | "telecaller" | "relationship_manager";
export type LeadStatus =
  | "new"
  | "called"
  | "not_interested"
  | "follow_up_later"
  | "interested_rm_required"
  | "rm_contacted"
  | "active_trader"
  | "lost";
export type PaymentStatus = "pending_verification" | "approved" | "rejected";
export type PaymentMode = "UPI" | "Bank Transfer" | "Other";
export type TradingExperience = "beginner" | "intermediate" | "advanced";

// Users Table with Role
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  phone: text("phone"),
  role: text("role").$type<UserRole>().default("telecaller").notNull(),
  kycStatus: text("kyc_status").default("pending"), // pending, verified, rejected
  kycTier: integer("kyc_tier").default(1),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Leads Table
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  source: text("source").default("Website"),
  assignedTo: uuid("assigned_to").references(() => users.id, { onDelete: "set null" }),
  rmAssignedTo: uuid("rm_assigned_to").references(() => users.id, { onDelete: "set null" }),
  status: text("status").$type<LeadStatus>().default("new").notNull(),
  telecallerNotes: text("telecaller_notes"),
  rmNotes: text("rm_notes"),
  investmentCapacity: numeric("investment_capacity"),
  tradingExperience: text("trading_experience").$type<TradingExperience>(),
  preferredMarket: text("preferred_market"),
  nextFollowUpAt: timestamp("next_follow_up_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Active Traders Table
export const activeTraders = pgTable("active_traders", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id").references(() => leads.id, { onDelete: "set null" }),
  rmAssignedTo: uuid("rm_assigned_to").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow().notNull(),
  totalProfitGained: numeric("total_profit_gained", { precision: 12, scale: 2 }).default("0.00").notNull(),
  totalProfitShared: numeric("total_profit_shared", { precision: 12, scale: 2 }).default("0.00").notNull(),
  currentStreak: integer("current_streak").default(0).notNull(),
  lastTradeDate: date("last_trade_date"),
  lastProfitShareDate: date("last_profit_share_date"),
  status: text("status").default("active").notNull(), // active, inactive, paused
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Trading Days Table
export const tradingDays = pgTable("trading_days", {
  id: uuid("id").primaryKey().defaultRandom(),
  traderId: uuid("trader_id").references(() => activeTraders.id, { onDelete: "cascade" }).notNull(),
  tradeDate: date("trade_date").notNull(),
  pnl: numeric("pnl", { precision: 12, scale: 2 }).default("0.00").notNull(),
  profitShared: numeric("profit_shared", { precision: 12, scale: 2 }).default("0.00").notNull(),
  status: text("status").default("profit").notNull(), // profit, loss, breakeven
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Payments Table (Profit-Share verification)
export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  traderId: uuid("trader_id").references(() => activeTraders.id, { onDelete: "set null" }),
  rmId: uuid("rm_id").references(() => users.id, { onDelete: "set null" }),
  traderName: text("trader_name"),
  traderPhone: text("trader_phone"),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  paymentMode: text("payment_mode").$type<PaymentMode>().default("UPI").notNull(),
  utrNumber: text("utr_number"),
  transactionAt: timestamp("transaction_at", { withTimezone: true }),
  screenshotUrl: text("screenshot_url"),
  remarks: text("remarks"),
  status: text("status").$type<PaymentStatus>().default("pending_verification").notNull(),
  verifiedAt: timestamp("verified_at", { withTimezone: true }),
  verifiedBy: uuid("verified_by").references(() => users.id, { onDelete: "set null" }),
  verificationRemark: text("verification_remark"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Expenses Table
export const expenses = pgTable("expenses", {
  id: uuid("id").primaryKey().defaultRandom(),
  category: text("category").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  description: text("description"),
  date: date("date").notNull(),
  createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Plans Table (existing)
export const plans = pgTable("plans", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  price: integer("price"),
  period: text("period").notNull(),
  features: jsonb("features").notNull(),
  isPopular: boolean("is_popular").default(false),
  tier: text("tier").default("retail"),
});

// Subscriptions Table (existing)
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  planId: text("plan_id").references(() => plans.id),
  status: text("status").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  paymentMethod: text("payment_method"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Research Reports Table (existing)
export const researchReports = pgTable("research_reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(),
  sector: text("sector").notNull(),
  coverImageUrl: text("cover_image_url"),
  fileUrl: text("file_url"),
  fileSize: text("file_size"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
});

// Recommendations Table (existing)
export const recommendations = pgTable("recommendations", {
  id: uuid("id").primaryKey().defaultRandom(),
  symbol: text("symbol").notNull(),
  companyName: text("company_name").notNull(),
  type: text("type").notNull(),
  action: text("action").notNull(),
  entryRange: text("entry_range").notNull(),
  target: text("target").notNull(),
  stopLoss: text("stop_loss").notNull(),
  riskLevel: text("risk_level").notNull(),
  confidence: text("confidence").notNull(),
  sector: text("sector").notNull(),
  timeHorizon: text("time_horizon").notNull(),
  rationale: text("rationale"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  tier: text("tier").default("starter"),
});

// Watchlists Table (existing)
export const watchlists = pgTable("watchlists", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  symbol: text("symbol").notNull(),
  companyName: text("company_name").notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

// Support Tickets Table (existing)
export const supportTickets = pgTable("support_tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  category: text("category").notNull(),
  message: text("message").notNull(),
  status: text("status").default("open").notNull(),
  priority: text("priority").default("normal").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
});

// Payment History Table (existing)
export const paymentHistory = pgTable("payment_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  subscriptionId: uuid("subscription_id").references(() => subscriptions.id),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  gst: numeric("gst", { precision: 10, scale: 2 }).notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  method: text("method").notNull(),
  status: text("status").notNull(),
  utrNumber: text("utr_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Disclosure Tracker Table (existing)
export const disclosureTracker = pgTable("disclosure_tracker", {
  id: uuid("id").primaryKey().defaultRandom(),
  monthYear: text("month_year").notNull().unique(),
  complaintsReceived: integer("complaints_received").default(0).notNull(),
  resolved: integer("resolved").default(0).notNull(),
  status: text("status").default("compliant").notNull(),
});
