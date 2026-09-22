# Google Forms → Excel Automation Guide (Capital Grow)

This document provides complete instructions for setting up the automated profit-sharing submission pipeline from **Google Forms** directly into **Microsoft Excel** (OneDrive / SharePoint).

---

## 1. Google Form Specification

Create a new Google Form named **"Capital Grow — Profit Share Submission"** with the following fields:

| # | Field Name in Google Form | Field Type | Validation / Options | Required |
|---|---|---|---|---|
| 1 | **Trader Full Name** | Short answer | Text | **Yes** |
| 2 | **Trader Phone Number** | Short answer | 10-digit number / regex: `^[0-9+ ]+$` | **Yes** |
| 3 | **Profit Share Amount (₹)** | Short answer | Number > 0 | **Yes** |
| 4 | **Payment Mode** | Multiple choice | `UPI`, `Bank Transfer (IMPS/NEFT)`, `Other` | **Yes** |
| 5 | **Bank UTR / Transaction ID** | Short answer | Alphanumeric (12-22 chars) | **Yes** |
| 6 | **Transaction Date & Time** | Date + Time | Include time | **Yes** |
| 7 | **Payment Receipt Screenshot** | File upload | Allow image / PDF (Max 10MB) | **Yes** |
| 8 | **Assigned Relationship Manager** | Dropdown | List of RM names | **Yes** |
| 9 | **Remarks / Strategy Notes** | Paragraph | Optional comments | No |

> 💡 **Form Response Destination:** In Google Forms, go to the **Responses** tab → click **Link to Sheets** → create `Capital Grow Profit Submissions (Responses)`.

---

## 2. Setting Up Excel in OneDrive / SharePoint

1. Open **Microsoft OneDrive** or **SharePoint**.
2. Create an Excel workbook named `Capital_Grow_Official_Profit_Ledger.xlsx`.
3. In Sheet 1, create a table (Home → Format as Table) named `ProfitLedger` with columns:
   - `Submission_ID`
   - `Timestamp`
   - `Trader_Name`
   - `Trader_Phone`
   - `Amount_INR`
   - `Payment_Mode`
   - `UTR_Number`
   - `Transaction_Datetime`
   - `Screenshot_URL`
   - `RM_Name`
   - `Verification_Status` (Default: `Pending`)
   - `Verified_By`
   - `Remarks`

---

## 3. Automation Workflow Setup via Zapier

### Step 1: Create a New Zap
- **Name:** `Capital Grow: Form to Excel Profit Sync`

### Step 2: Set the Trigger
- **App:** `Google Forms` (or `Google Sheets`)
- **Event:** `New Form Response` (or `New Spreadsheet Row in Google Sheets`)
- **Account:** Connect your official Google Workspace account.
- **Form:** Select `Capital Grow — Profit Share Submission`.
- Click **Test Trigger** to pull the latest response.

### Step 3: Set the Action (Microsoft Excel)
- **App:** `Microsoft Excel`
- **Event:** `Add Row to Table`
- **Account:** Connect your Microsoft 365 / OneDrive account.
- **Folder / Drive:** Select OneDrive / SharePoint.
- **Spreadsheet:** `Capital_Grow_Official_Profit_Ledger.xlsx`
- **Table:** `ProfitLedger`

### Step 4: Map the Data Fields
| Excel Column | Value from Google Form Trigger |
|---|---|
| `Submission_ID` | `{{Step 1. Response ID}}` |
| `Timestamp` | `{{Step 1. Timestamp}}` |
| `Trader_Name` | `{{Step 1. Trader Full Name}}` |
| `Trader_Phone` | `{{Step 1. Trader Phone Number}}` |
| `Amount_INR` | `{{Step 1. Profit Share Amount}}` |
| `Payment_Mode` | `{{Step 1. Payment Mode}}` |
| `UTR_Number` | `{{Step 1. Bank UTR / Transaction ID}}` |
| `Transaction_Datetime` | `{{Step 1. Transaction Date & Time}}` |
| `Screenshot_URL` | `{{Step 1. Payment Receipt Screenshot URL}}` |
| `RM_Name` | `{{Step 1. Assigned Relationship Manager}}` |
| `Verification_Status` | `Pending` |
| `Remarks` | `{{Step 1. Remarks}}` |

### Step 5: Test and Turn ON
1. Run a live test in Zapier.
2. Verify that a new row appears in `Capital_Grow_Official_Profit_Ledger.xlsx`.
3. Turn the Zap **ON**.

---

## 4. Alternative: Setup via Make (Integromat)

1. Create a Scenario:
   - **Module 1:** `Google Forms: Watch Responses` (or `Google Sheets: Watch New Rows`)
   - **Module 2:** `Microsoft 365 Excel: Add a worksheet row`
2. Map the corresponding response fields to your OneDrive Excel table.
3. Set schedule to **Immediately / On change**.
4. Activate the scenario.

---

## 5. Security & Access Rules

1. **Write Access:** Only the Zapier / Make API service account should have automated Write access to the Excel workbook.
2. **Read Access:** Admin and Auditor roles can view and download the Excel file.
3. **Immutability:** Never manually edit amounts or UTRs in Excel — update verification state via the Admin Dashboard.
