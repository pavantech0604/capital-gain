import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  numeric,
} from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  phone: text("phone"),
  kycStatus: text("kyc_status").default("pending"), // pending, verified, rejected
  kycTier: integer("kyc_tier").default(1),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Plans Table
export const plans = pgTable("plans", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  price: integer("price"), // null for HNI/Custom
  period: text("period").notNull(), // month, quarter, annual
  features: jsonb("features").notNull(), // text array of features
  isPopular: boolean("is_popular").default(false),
  tier: text("tier").default("retail"), // retail, professional, institutional
});

// Subscriptions Table
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  planId: text("plan_id").references(() => plans.id),
  status: text("status").notNull(), // active, expired, pending
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  paymentMethod: text("payment_method"), // Bank Transfer, UPI, Credit Card
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Research Reports Table
export const researchReports = pgTable("research_reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(), // sectorial, strategy, quarterly
  sector: text("sector").notNull(),
  coverImageUrl: text("cover_image_url"),
  fileUrl: text("file_url"),
  fileSize: text("file_size"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
});

// Recommendations Table
export const recommendations = pgTable("recommendations", {
  id: uuid("id").primaryKey().defaultRandom(),
  symbol: text("symbol").notNull(),
  companyName: text("company_name").notNull(),
  type: text("type").notNull(), // Long-term, Positional, Swing Trade
  action: text("action").notNull(), // BUY, ACCUMULATE, HOLD, SELL
  entryRange: text("entry_range").notNull(),
  target: text("target").notNull(),
  stopLoss: text("stop_loss").notNull(),
  riskLevel: text("risk_level").notNull(), // Low, Moderate, High
  confidence: text("confidence").notNull(), // High, Medium, Low
  sector: text("sector").notNull(),
  timeHorizon: text("time_horizon").notNull(),
  rationale: text("rationale"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  tier: text("tier").default("starter"), // starter, professional, institutional
});

// Watchlists Table
export const watchlists = pgTable("watchlists", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  symbol: text("symbol").notNull(),
  companyName: text("company_name").notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

// Support Tickets Table
export const supportTickets = pgTable("support_tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  category: text("category").notNull(), // Technical, Subscription, Grievance, Feedback
  message: text("message").notNull(),
  status: text("status").default("open").notNull(), // open, in-progress, resolved, closed
  priority: text("priority").default("normal").notNull(), // normal, high, critical
  createdAt: timestamp("created_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
});

// Payment History Table
export const paymentHistory = pgTable("payment_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  subscriptionId: uuid("subscription_id").references(() => subscriptions.id),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  gst: numeric("gst", { precision: 10, scale: 2 }).notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  method: text("method").notNull(),
  status: text("status").notNull(), // successful, pending, failed
  utrNumber: text("utr_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Disclosure Tracker Table
export const disclosureTracker = pgTable("disclosure_tracker", {
  id: uuid("id").primaryKey().defaultRandom(),
  monthYear: text("month_year").notNull().unique(), // e.g. "January 2026"
  complaintsReceived: integer("complaints_received").default(0).notNull(),
  resolved: integer("resolved").default(0).notNull(),
  status: text("status").default("compliant").notNull(),
});
