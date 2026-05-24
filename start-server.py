#!/usr/bin/env python3
import http.server
import socketserver
import socket
import webbrowser
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
os.chdir(ROOT)

PREFERRED_PORT = 5173
HOST = "127.0.0.1"

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, format, *args):
        print("[local-preview] " + format % args)

def port_available(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            s.bind((HOST, port))
            return True
        except OSError:
            return False

port = PREFERRED_PORT
if not port_available(port):
    for candidate in range(5174, 5190):
        if port_available(candidate):
            port = candidate
            break
    else:
        print("No available port found between 5173 and 5189.")
        sys.exit(1)

url = f"http://{HOST}:{port}/"
print("\nPortfolio local preview is running.")
print(f"Open: {url}")
print("Keep this terminal window open while previewing.")
print("Press Ctrl+C to stop.\n")

try:
    webbrowser.open(url)
except Exception:
    pass

with socketserver.TCPServer((HOST, port), QuietHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
