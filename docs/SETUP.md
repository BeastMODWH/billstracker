# BillsTracker — Setup Guide
## Get running in under 10 minutes

---

## What you need
- A laptop/PC running Windows, Mac, or Linux
- Node.js 18+ installed → https://nodejs.org
- All your devices on the same WiFi

---

## Step 1 — Download PocketBase (your backend)

1. Go to: **https://pocketbase.io/docs/**
2. Download the version for your OS (Windows / Mac / Linux)
3. Create a folder on your laptop: `C:\BillsTracker\pocketbase\`
4. Put the `pocketbase.exe` file inside that folder

---

## Step 2 — Start PocketBase

**Windows** — Open Command Prompt in the pocketbase folder:
```
pocketbase.exe serve --http="0.0.0.0:8090"
```

**Mac/Linux:**
```bash
chmod +x ./pocketbase
./pocketbase serve --http="0.0.0.0:8090"
```

You should see: `Server started at http://0.0.0.0:8090`

---

## Step 3 — Set up the database

1. Go to: **http://localhost:8090/_/**
2. Create admin account (for PocketBase management only)
3. Create 5 Collections with these fields:

### billers
- name (text, required)
- category (select: Water, Council Tax, Energy, Internet, Insurance, Mobile, TV Licence, Other)
- account_number (text)
- contact_info (text)
- notes (text)
- vulnerability_flag (bool)
- is_active (bool)

### bills
- biller_id (relation → billers)
- current_balance (number)
- last_bill_date (date)
- last_bill_amount (number)
- next_bill_date (date)
- notes (text)

### payments
- biller_id (relation → billers)
- bill_id (relation → bills)
- amount (number, required)
- payment_date (date, required)
- method (select: Direct Debit, Bank Transfer, Card, Cash, Standing Order, Other)
- notes (text)

### direct_debits
- biller_id (relation → billers)
- amount (number)
- collection_day (number)
- next_dd_date (date)
- status (select: active, paused, cancelled)
- notes (text)

### reminders
- biller_id (relation → billers)
- reminder_date (date)
- type (select: payment_due, follow_up, review, custom)
- message (text)
- status (select: pending, snoozed, done)

4. IMPORTANT: For EACH collection, go to API Rules and set ALL 5 rules to empty string "" (allows no-login access)

---

## Step 4 — Run the frontend

```bash
cd bills-tracker/frontend
npm install
npm run dev
```

Look for: `Network: http://192.168.1.x:3000` — note this IP address.

---

## Step 5 — Access from any device

On any phone/tablet on the same WiFi, open browser and go to:
**http://192.168.1.x:3000** (your laptop's IP from Step 4)

Add to home screen on your phone for an app-like experience.

---

## Find your laptop IP

- Windows: `ipconfig` in Command Prompt → IPv4 Address
- Mac: System Settings → WiFi → Details
- Linux: `ip addr show`

---

## Backup

Your data is in `pocketbase/pb_data/` — copy this folder to back up everything.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Phone can't connect | Allow ports 3000 and 8090 in Windows Firewall |
| CORS errors | Use `--http="0.0.0.0:8090"` not `127.0.0.1` |
| PocketBase errors | Check all collections and API rules are set |
