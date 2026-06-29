#!/bin/bash
echo "Stopping BillsTracker..."
pkill -f "pocketbase serve" && echo "PocketBase stopped"
pkill -f "npm run start" && echo "Frontend stopped"  
pkill -f "cloudflared tunnel" && echo "Cloudflare tunnels stopped"
pkill -f "next start" && echo "Next.js stopped"
echo "All stopped!"
