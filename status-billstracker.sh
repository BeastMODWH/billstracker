#!/bin/bash
LOG_DIR="$HOME/.billstracker-logs"

echo "=== BillsTracker Status ==="
echo ""

# Check PocketBase
if pgrep -f "pocketbase serve" > /dev/null; then
    echo "✅ PocketBase: Running"
else
    echo "❌ PocketBase: Not running"
fi

# Check Frontend
if pgrep -f "next start" > /dev/null || pgrep -f "next-server" > /dev/null; then
    echo "✅ Frontend: Running"
else
    echo "❌ Frontend: Not running"
fi

# Check Cloudflare
if pgrep -f "cloudflared tunnel" > /dev/null; then
    echo "✅ Cloudflare Tunnel: Running"
    echo ""
    echo "=== Your Tunnel URLs ==="
    grep -o 'https://[a-z-]*\.trycloudflare\.com' "$LOG_DIR/cf-frontend.log" 2>/dev/null | tail -1 | xargs -I{} echo "📱 App URL: {}"
    grep -o 'https://[a-z-]*\.trycloudflare\.com' "$LOG_DIR/cf-pb.log" 2>/dev/null | tail -1 | xargs -I{} echo "🗄️  PocketBase: {}"
else
    echo "❌ Cloudflare Tunnel: Not running"
fi

echo ""
echo "💻 Local URL: http://localhost:3000"
