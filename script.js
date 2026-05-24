const works = [
  { section: "Copywriting", title: "Copy Optimization", tag: "Copywriting", url: "https://copyoptimization.vercel.app/", date: "2025.12" },
  { section: "Copywriting", title: "Brand Story", tag: "Brand Voice, Copywriting", url: "https://brand-story-page.vercel.app/", date: "2026.1" },
  { section: "Copywriting", title: "Landing Page", tag: "Brand Marketing", url: "https://slipper-dtc-landing-page.vercel.app/", date: "2026.2" },
  { section: "Copywriting", title: "Copywriting", tag: "Copywriting", url: "https://2shortcopies.vercel.app/", date: "2026.3" },
  { section: "Copywriting", title: "Landing Page", tag: "Brand Voice, Copywriting", url: "https://busu-dtc-landing-page.vercel.app/", date: "2026.4" },
  { section: "Copywriting", title: "TVC Full Case", tag: "TVC, Video Campaign", url: "https://plant-awaken-tvc-full-case.vercel.app/", date: "2026.4" },
  { section: "Commerce Ops", title: "Amazon Launch Plan Example", tag: "Amazon", url: "https://amazonlaunchplan.vikiclarkson.workers.dev/", date: "2026.1" },
  { section: "Commerce Ops", title: "Shopify Store Redesign", tag: "Shopify", url: "https://shopify-rebuild.vercel.app/", date: "2026.3" },
  { section: "Commerce Ops", title: "Amazon Skill Map", tag: "Amazon", url: "https://amazonopskillstack.pages.dev/", date: "2026.5" },
  { section: "Commerce Ops", title: "DTC Brand System", tag: "Shopify", url: "https://dtcbrandingsystem.pages.dev/", date: "2026.5" },
  {
    section: "Vibe Coding",
    title: "Image Collage Tool",
    tag: "Image",
    url: "",
    date: "2026.2",
    video: "https://youtu.be/s4ZS35VYgGg",
    duration: 18,
    description: "A lightweight image utility for composing grids and collage layouts. The experience is intentionally direct: select, arrange, export, and keep moving."
  },
  {
    section: "Vibe Coding",
    title: "My Bookshelf",
    tag: "Reading",
    url: "",
    date: "2026.2",
    video: "https://youtu.be/ihRSH_mvAdg",
    duration: 18,
    description: "A quiet personal reading interface that turns a bookshelf into a small digital room for browsing, memory, and collection."
  },
  {
    section: "Vibe Coding",
    title: "Upstand App",
    tag: "Health",
    url: "https://upstandlandingpage.pages.dev/",
    date: "2026.2",
    video: "https://youtu.be/LIAnaDmaO7o",
    duration: 18,
    description: "A health-oriented product concept for better standing habits. Calm behavior change, posture awareness, and one clear product story."
  },
  {
    section: "Vibe Coding",
    title: "Loma App",
    tag: "Management",
    url: "https://lomaapplandingpage.pages.dev/",
    date: "2026.5",
    video: "",
    duration: 18,
    description: "A management-focused app concept designed around clarity, calm hierarchy, and reduced operational noise."
  },
  { section: "Vibe Marketing", title: "Campaign Poster", tag: "Marketing, Design", url: "https://vibemarketing-two.vercel.app/", date: "2026.2" },
  { section: "Vibe Marketing", title: "Campaign Poster", tag: "Marketing, Design", url: "https://marketingportofolio.vikiclarkson.workers.dev/", date: "2026.4" }
];

const sections = ["Copywriting", "Commerce Ops", "Vibe Coding", "Vibe Marketing"];
const rowsEl = document.querySelector("#playlistRows");
const drawer = document.querySelector("#previewDrawer");
const backdrop = document.querySelector("#drawerBackdrop");
const closeDrawerButton = document.querySelector("#closeDrawer");
const drawerTitle = document.querySelector("#drawerTitle");
const drawerDescription = document.querySelector("#drawerDescription");
const videoShell = document.querySelector("#videoShell");
const progressBar = document.querySelector("#progressBar");
const learnMore = document.querySelector("#learnMore");
const toast = document.querySelector("#toast");

let activeWork = null;
let toastTimer = null;
let activePlayerFrame = null;
let playCommandTimers = [];

function hostFromUrl(url) {
  if (!url) return "—";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "—";
  }
}

function youtubeId(url) {
  if (!url) return "";
  const patterns = [
    /youtu\.be\/([^?&/]+)/,
    /youtube\.com\/watch\?v=([^?&]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
    /youtube-nocookie\.com\/embed\/([^?&/]+)/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }
  return "";
}

function openExternal(url) {
  if (!url) {
    showToast();
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

function showToast() {
  clearTimeout(toastTimer);
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1500);
}

function clearPlayCommandTimers() {
  playCommandTimers.forEach((timer) => clearTimeout(timer));
  playCommandTimers = [];
}

function postYoutubeCommand(iframe, func, args = []) {
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: "command", func, args }),
    "*"
  );
}

function forceMutedAutoplay(iframe) {
  clearPlayCommandTimers();
  const attempts = [80, 280, 700, 1400, 2400];
  attempts.forEach((delay) => {
    playCommandTimers.push(setTimeout(() => {
      postYoutubeCommand(iframe, "mute");
      postYoutubeCommand(iframe, "setVolume", [0]);
      postYoutubeCommand(iframe, "playVideo");
    }, delay));
  });
}

function makeWorkRow(work, index) {
  const row = document.createElement("div");
  row.className = "work-row";
  row.dataset.kind = work.section === "Vibe Coding" ? "coding" : "link";

  const number = document.createElement("span");
  number.className = "col-index";
  number.textContent = String(index + 1).padStart(2, "0");

  const titleCell = document.createElement("div");
  titleCell.className = "col-title";
  const titleButton = document.createElement("button");
  titleButton.type = "button";
  titleButton.className = "row-title";

  const titleText = document.createElement("span");
  titleText.textContent = work.title;
  titleButton.appendChild(titleText);

  if (work.section === "Vibe Coding") {
    const previewDot = document.createElement("span");
    previewDot.className = "preview-dot";
    previewDot.setAttribute("aria-hidden", "true");
    titleButton.appendChild(previewDot);
  }

  titleButton.addEventListener("click", () => {
    if (work.section === "Vibe Coding") openPreview(work, row);
    else openExternal(work.url);
  });
  titleCell.appendChild(titleButton);

  const tag = document.createElement("span");
  tag.className = "col-tag";
  tag.textContent = work.tag;

  const url = document.createElement("span");
  url.className = "col-url";
  if (work.url) {
    const link = document.createElement("a");
    link.href = work.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = hostFromUrl(work.url);
    url.appendChild(link);
  } else {
    const broken = document.createElement("button");
    broken.type = "button";
    broken.textContent = "—";
    broken.addEventListener("click", showToast);
    url.appendChild(broken);
  }

  const date = document.createElement("span");
  date.className = "col-date";
  date.textContent = work.date;

  row.append(number, titleCell, tag, url, date);
  return row;
}

function renderPlaylist() {
  let index = 0;
  sections.forEach((section) => {
    const sectionRow = document.createElement("div");
    sectionRow.className = "section-row";
    sectionRow.textContent = section;
    rowsEl.appendChild(sectionRow);

    works.filter((work) => work.section === section).forEach((work) => {
      rowsEl.appendChild(makeWorkRow(work, index));
      index += 1;
    });
  });
}

function openPreview(work, sourceRow) {
  activeWork = work;
  activePlayerFrame = null;
  clearPlayCommandTimers();

  document.querySelectorAll(".work-row.active").forEach((row) => row.classList.remove("active"));
  if (sourceRow) sourceRow.classList.add("active");

  drawerTitle.textContent = work.title;
  drawerDescription.textContent = work.description || "";
  progressBar.style.setProperty("--duration", `${work.duration || 18}s`);
  videoShell.innerHTML = "";

  const id = youtubeId(work.video);
  if (id) {
    const iframe = document.createElement("iframe");
    iframe.title = `${work.title} video preview`;
    const origin = window.location.origin && window.location.origin !== "null"
      ? `&origin=${encodeURIComponent(window.location.origin)}`
      : "";
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${id}&controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1${origin}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.setAttribute("allowfullscreen", "");
    iframe.addEventListener("load", () => forceMutedAutoplay(iframe));
    videoShell.appendChild(iframe);
    activePlayerFrame = iframe;
    forceMutedAutoplay(iframe);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "video-placeholder";
    placeholder.textContent = "NO VIDEO PREVIEW";
    videoShell.appendChild(placeholder);
  }

  backdrop.hidden = false;
  requestAnimationFrame(() => {
    backdrop.classList.add("show");
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
  });
}

function closePreview() {
  clearPlayCommandTimers();
  if (activePlayerFrame) postYoutubeCommand(activePlayerFrame, "stopVideo");
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  backdrop.classList.remove("show");
  document.querySelectorAll(".work-row.active").forEach((row) => row.classList.remove("active"));
  setTimeout(() => {
    backdrop.hidden = true;
    videoShell.innerHTML = "";
    activeWork = null;
    activePlayerFrame = null;
  }, 260);
}

learnMore.addEventListener("click", () => openExternal(activeWork?.url));
closeDrawerButton.addEventListener("click", closePreview);
backdrop.addEventListener("click", closePreview);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && drawer.classList.contains("open")) closePreview();
});

renderPlaylist();
