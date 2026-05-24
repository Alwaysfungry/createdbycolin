# I Think, Then I Build — Portfolio Playlist

A static, playlist-style portfolio page created by Colin.

## Preview locally

Use a local HTTP server. This is important for YouTube embeds because recent YouTube iframe behavior can reject players that do not send a valid referrer.

```bash
cd portfolio_playlist_project_v4
python -m http.server 5173
```

Then open:

```txt
http://localhost:5173
```

Do not preview the video drawer by double-clicking `index.html` under `file://`. The page itself will open, but YouTube may show Error 153 because `file://` cannot provide the normal HTTP referrer expected by the embedded player.

## Edit content

All portfolio data lives at the top of `script.js` in the `works` array.

## Video note

The Vibe Coding preview uses muted YouTube iframe autoplay with `autoplay=1`, `mute=1`, `enablejsapi=1`, `allow="autoplay"`, iframe `referrerPolicy="strict-origin-when-cross-origin"`, and a matching page-level referrer meta tag. This is the most compatible YouTube approach for this static page.

YouTube still controls the inside of the iframe. For a completely clean player with no YouTube title, share layer, branding, or Error 153 risk, replace the YouTube links with hosted MP4/WebM files and render them through the native HTML5 `<video>` element.
