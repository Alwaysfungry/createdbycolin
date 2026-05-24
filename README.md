# Portfolio Playlist Project

## Best way to preview

### macOS
Double-click `start-mac.command`.

If macOS says it cannot open the file, open Terminal in this folder and run:

```bash
chmod +x start-mac.command
./start-mac.command
```

### Windows
Double-click `start-windows.bat`.

### Manual preview
Open Terminal / Command Prompt in this folder and run:

```bash
python3 start-server.py
```

or:

```bash
python start-server.py
```

The script will open the correct local URL automatically. It prefers:

```txt
http://127.0.0.1:5173/
```

If port 5173 is already occupied, it will automatically use another port between 5174 and 5189. Check the terminal output for the exact URL.

## Important
Do not preview YouTube videos by double-clicking `index.html` directly. YouTube iframe playback needs a normal local HTTP server. Keep the terminal/server window open while viewing the page.
