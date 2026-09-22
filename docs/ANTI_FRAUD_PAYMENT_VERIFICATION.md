# Anti-Fraud Payment Verification Standard Operating Procedure (SOP)

This document outlines the mandatory protocol for administrators to verify profit-share receipts and prevent fake payment fraud.

---

## 1. The Threat: Why Screenshots Alone Are Unreliable

In financial advisory desks, malicious actors frequently attempt to fake payments using:
1. **Fake UPI Generator Apps / Telegram Bots:** Tools that generate pixel-perfect Google Pay, PhonePe, and Paytm success screens with custom names, amounts, and fake UTR numbers.
2. **Canva / Image Editing:** Editing real receipts by altering the transaction amount or changing the date.
3. **Spoofed SMS Receipts:** Fake SMS text messages simulating bank credits.

> ⛔ **GOLDEN RULE:** A screenshot is only a **notification of intent**, not proof of funds. **Never approve a payment based solely on an image.**

---

## 2. Mandatory 4-Step Verification Checklist

Before clicking **"Approve Verified Payment"** in the Admin Portal, the reviewer MUST perform all 4 checks:

```
[✓] Step 1: Copy UTR & Query Bank / UPI Merchant Console
    • Copy the UTR / Reference ID from the dashboard.
    • Open your bank portal (HDFC / ICICI / Kotak / Razorpay / PhonePe Merchant).
    • Search for the exact UTR in the Credit / Inward ledger.

[✓] Step 2: Exact Amount Match
    • Ensure the bank credit amount matches the submitted profit share (down to paise).

[✓] Step 3: Timestamp & Date Match
    • Confirm the bank statement credit timestamp aligns with the transaction time on the receipt.

[✓] Step 4: Sender Identity Corroboration
    • Check that the remitter's bank account or VPA name corresponds with the registered trader profile.
```

---

## 3. Handling Discrepancies & Rejections

If any of the 4 checks fail:

1. Click **Reject (Fake / Unverified)** in the Admin Payment Drawer.
2. Select or enter the mandatory rejection reason:
   - `UTR not found in bank statement / ledger`
   - `Amount mismatch (Received ₹X vs Claimed ₹Y)`
   - `Duplicate UTR already redeemed`
   - `Sender name does not match registered account`
3. The record is flagged with a cryptographic timestamp and administrator ID.
4. The system prevents the trader from receiving trading calls until verified funds are settled.

---

## 4. Audit Trail & Compliance

Every approval and rejection records:
- `verified_by`: UUID of the reviewing administrator.
- `verified_at`: UTC timestamp of the verification action.
- `verification_remark`: Specific bank statement reference used to validate.
