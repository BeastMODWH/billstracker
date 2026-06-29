#!/bin/bash
# BillsTracker Auto-Start Script
# Place this in ~/.config/autostart/ for auto-start on login

PROJECT_DIR="$HOME/Desktop/learnhub/BillsTrackers/bills-tracker"
POCKETBASE="$PROJECT_DIR/pocketbase/pocketbase_0/pocketbase"
FRONTEND="$PROJECT_DIR/frontend"
LOG_DIR="$HOME/.billstracker-logs"

mkdir -p "$LOG_DIR"

echo "Starting BillsTracker..."

# Start PocketBase
nohup "$POCKETBASE" serve --http="0.0.0.0:8090" > "$LOG_DIR/pocketbase.log" 2>&1 &
echo "PocketBase started (PID: $!)"

# Wait for PocketBase to be ready
sleep 2

# Start Frontend
cd "$FRONTEND"
nohup npm run dev > "$LOG_DIR/frontend.log" 2>&1 &
echo "Frontend started (PID: $!)"

# Start Cloudflare tunnels
sleep 1
nohup cloudflared tunnel --url http://localhost:8090 > "$LOG_DIR/cf-pb.log" 2>&1 &
echo "PocketBase tunnel started (PID: $!)"

nohup cloudflared tunnel --url http://localhost:3000 > "$LOG_DIR/cf-frontend.log" 2>&1 &
echo "Frontend tunnel started (PID: $!)"

# Wait for tunnels to get URLs then update config
sleep 6
PB_TUNNEL=$(grep -o 'https://[a-z-]*\.trycloudflare\.com' "$LOG_DIR/cf-pb.log" 2>/dev/null | tail -1)
if [ ! -z "$PB_TUNNEL" ]; then
  # Update runtime config file
  echo "// Runtime config - auto-generated" > "$PROJECT_DIR/frontend/public/config.js"
  echo "window.__BT_CONFIG__ = { pbUrl: '$PB_TUNNEL' };" >> "$PROJECT_DIR/frontend/public/config.js"
  echo "Updated PocketBase URL: $PB_TUNNEL"
fi

echo ""
echo "BillsTracker is starting up!"
echo "Logs are in: $LOG_DIR"
echo ""
echo "App URL: http://localhost:3000"
echo "Check tunnel URLs with: ~/Desktop/learnhub/BillsTrackers/bills-tracker/status-billstracker.sh"
