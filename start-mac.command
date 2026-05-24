#!/bin/bash
cd "$(dirname "$0")"
if command -v python3 >/dev/null 2>&1; then
  python3 start-server.py
elif command -v python >/dev/null 2>&1; then
  python start-server.py
else
  echo "Python is not installed. Install Python 3, then run this file again."
  read -p "Press Enter to close..."
fi
