const navLinks = document.querySelector(".nav-links");
const toggle = document.querySelector(".menu-toggle");
const themeToggles = document.querySelectorAll(".theme-toggle");
const root = document.documentElement;
const themeIcons = {
  light:
    '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="currentColor"></circle><path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.2 4.2L6.3 6.3M17.7 17.7L19.8 19.8M4.2 19.8L6.3 17.7M17.7 6.3L19.8 4.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
  dark:
    '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.8C19.2 15.5 17.7 15.9 16.1 15.9C11.8 15.9 8.3 12.4 8.3 8.1C8.3 6.5 8.7 5 9.4 3.7C6 4.7 3.5 7.9 3.5 11.7C3.5 16.3 7.2 20 11.8 20C15.6 20 18.8 17.5 20.5 14.8Z" fill="currentColor"></path></svg>',
};

if (themeToggles.length) {
  const syncThemeToggles = (theme) => {
    themeToggles.forEach((toggleButton) => {
      toggleButton.innerHTML = themeIcons[theme];
      toggleButton.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    });
  };

  const applyTheme = (theme) => {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
    syncThemeToggles(theme);
  };

  const storedTheme = localStorage.getItem("theme");
  const initialTheme = storedTheme === "dark" ? "dark" : "light";
  applyTheme(initialTheme);

  themeToggles.forEach((toggleButton) => {
    toggleButton.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  });
}

const viewTransitionMs = 250;

const updateUrlParam = (key, value, { replace = false } = {}) => {
  const url = new URL(window.location.href);
  if (value) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.delete(key);
  }
  const method = replace ? "replaceState" : "pushState";
  window.history[method]({}, "", url);
};

const swapViews = (listView, detailView, showDetail) => {
  if (!listView || !detailView) return;
  const showEl = showDetail ? detailView : listView;
  const hideEl = showDetail ? listView : detailView;

  if (hideEl._hideTimeout) {
    window.clearTimeout(hideEl._hideTimeout);
  }
  if (showEl._hideTimeout) {
    window.clearTimeout(showEl._hideTimeout);
  }

  hideEl.classList.add("is-hidden");
  hideEl.setAttribute("aria-hidden", "true");
  hideEl._hideTimeout = window.setTimeout(() => {
    hideEl.setAttribute("hidden", "");
  }, viewTransitionMs);

  showEl.removeAttribute("hidden");
  window.requestAnimationFrame(() => {
    showEl.classList.remove("is-hidden");
    showEl.setAttribute("aria-hidden", "false");
  });
};

const scrollToView = (viewEl) => {
  if (!viewEl) return;
  const offsetTop = viewEl.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top: Math.max(0, offsetTop), behavior: "smooth" });
};

const pricingPlans = {
  "starter-creator": {
    type: "creator",
    title: "Creator Starter Kit",
    summary: "Essential recording package for new podcasters and solo creators.",
    name: "Creator Starter Kit",
    tagline: "Best for beginners setting up their first recording space.",
    price: "$149",
    period: "/kit",
    description:
      "Start creating with clear, broadcast-ready sound. Includes a plug-and-play USB condenser microphone, integrated pop filter, heavy-duty desk stand, and studio monitoring earbuds.",
    features: [
      "24-bit / 96kHz USB Condenser Microphone",
      "Integrated Dual-Layer Pop Filter",
      "Weighted Anti-Vibration Desk Stand",
      "High-Fidelity Studio Earbuds",
    ],
    meta: [
      { label: "Ideal for", value: "Solo podcasting, streaming & voiceovers" },
      { label: "Connectivity", value: "USB-C Plug & Play (Mac/PC/iOS)" },
      { label: "Warranty", value: "2-Year Hardware Replacement" },
      { label: "Shipping", value: "Free Express Delivery" },
    ],
    highlights: [
      "24-bit / 96kHz USB Condenser Microphone",
      "Integrated Dual-Layer Pop Filter",
      "Weighted Anti-Vibration Desk Stand",
      "High-Fidelity Studio Earbuds",
    ],
  },
  "growth-creator": {
    type: "creator",
    title: "Creator Pro XLR Bundle",
    summary: "Studio-grade XLR microphone and audio interface for rising podcasters.",
    name: "Creator Pro XLR Bundle",
    tagline: "Perfect for creators ready to upgrade to professional analog audio.",
    price: "$299",
    period: "/kit",
    description:
      "Level up to warm broadcast sound with our Studio Pro XLR Dynamic Microphone, low-noise USB audio interface, 360-degree boom arm, and closed-back monitoring headphones.",
    features: [
      "Studio Pro XLR Dynamic Cardioid Mic",
      "24-bit/192kHz USB-C Audio Interface",
      "Heavy-Duty Spring-Loaded Boom Arm",
      "Closed-Back Studio Monitoring Headphones",
    ],
    meta: [
      { label: "Ideal for", value: "Dedicated podcast hosts & studio creators" },
      { label: "Connectivity", value: "XLR to USB-C with 48V Phantom Power" },
      { label: "Preamps", value: "Ultra-low-noise +60dB Gain Preamp" },
      { label: "Warranty", value: "3-Year Pro Hardware Coverage" },
    ],
    highlights: [
      "Studio Pro XLR Dynamic Cardioid Mic",
      "24-bit/192kHz USB-C Audio Interface",
      "Heavy-Duty Spring-Loaded Boom Arm",
      "Closed-Back Studio Monitoring Headphones",
    ],
  },
  "pro-creator": {
    type: "creator",
    title: "Podcast Master Kit",
    summary: "Complete dual-host recording setup with dedicated mixer and accessories.",
    name: "Podcast Master Kit",
    tagline: "Built for dual-host shows and in-studio interview sessions.",
    price: "$499",
    period: "/kit",
    description:
      "Everything needed for high-profile interviews. Features two Studio Pro XLR microphones, dual boom arms, shock mounts, studio headphones, and a multi-channel mixer with sound pads.",
    features: [
      "2x Studio Pro XLR Dynamic Microphones",
      "Dual-Channel Podcast Mixer & Interface",
      "2x Low-Profile Broadcast Boom Arms",
      "2x Studio Over-Ear Reference Headphones",
    ],
    meta: [
      { label: "Ideal for", value: "2-Host podcasts & interview studios" },
      { label: "Channels", value: "2 XLR Inputs + Bluetooth + USB Channel" },
      { label: "Sound Pads", value: "6 Programmable Jingle/SFX Pads" },
      { label: "Warranty", value: "3-Year Pro Hardware Coverage" },
    ],
    highlights: [
      "2x Studio Pro XLR Dynamic Microphones",
      "Dual-Channel Podcast Mixer & Interface",
      "2x Low-Profile Broadcast Boom Arms",
      "2x Studio Over-Ear Reference Headphones",
    ],
  },
  "studio-creator": {
    type: "creator",
    title: "Studio Master Suite",
    summary: "Turnkey multi-microphone broadcast studio console and acoustic package.",
    name: "Studio Master Suite",
    tagline: "Full-scale professional podcast studio setup for production teams.",
    price: "$899",
    period: "/kit",
    description:
      "Our flagship studio setup. Includes a 4-channel audio production console, four broadcast dynamic microphones, four boom arms, powered studio monitors, and acoustic treatment panels.",
    features: [
      "4-Channel Pro Broadcast Console with DSP",
      "4x Flagship Dynamic Studio Microphones",
      "4x Heavy-Duty Internal Spring Boom Arms",
      "Pair of Active 5-Inch Studio Monitors",
    ],
    meta: [
      { label: "Ideal for", value: "Production agencies, networks & studios" },
      { label: "Channels", value: "4 Multi-Source XLR/TRS Inputs" },
      { label: "Recording", value: "Direct Multi-track to MicroSD & USB" },
      { label: "Support", value: "Dedicated Audio Engineer VIP Support" },
    ],
    highlights: [
      "4-Channel Pro Broadcast Console with DSP",
      "4x Flagship Dynamic Studio Microphones",
      "4x Heavy-Duty Internal Spring Boom Arms",
      "Pair of Active 5-Inch Studio Monitors",
    ],
  },
  "starter-sponsor": {
    type: "sponsor",
    title: "Solo Broadcaster Package",
    summary: "Compact all-in-one broadcast kit with lighting and acoustic shield.",
    name: "Solo Broadcaster Package",
    tagline: "Compact broadcast equipment for video podcasters.",
    price: "$199",
    period: "/kit",
    description:
      "A complete video podcasting package featuring a high-resolution condenser mic, adjustable bi-color ring light, portable reflection filter, and travel hardcase.",
    features: [
      "High-Resolution USB-C Mic with Mute Sensor",
      "Bi-Color Dimmable Studio Ring Light",
      "Curved High-Density Acoustic Shield",
      "Heavy-Duty Protective Travel Hardcase",
    ],
    meta: [
      { label: "Ideal for", value: "Video podcasters, YouTubers & streamers" },
      { label: "Lighting", value: "3200K-5600K CRI 95+ Studio LED" },
      { label: "Shielding", value: "High-density sound absorbing foam" },
      { label: "Warranty", value: "2-Year Hardware Replacement" },
    ],
    highlights: [
      "High-Resolution USB-C Mic with Mute Sensor",
      "Bi-Color Dimmable Studio Ring Light",
      "Curved High-Density Acoustic Shield",
      "Heavy-Duty Protective Travel Hardcase",
    ],
  },
  "growth-sponsor": {
    type: "sponsor",
    title: "Dual Host Studio Bundle",
    summary: "Two-microphone setup with high-headroom preamps and isolation mounts.",
    name: "Dual Host Studio Bundle",
    tagline: "Dual XLR setup with matched cardioid capsules.",
    price: "$399",
    period: "/kit",
    description:
      "Engineered for co-hosted shows with pristine stereo separation, custom shock mounts, low-noise braided cables, and hardware gain controls.",
    features: [
      "2x Matched Cardioid Studio Microphones",
      "Dual-Input USB-C Interface with Preamp Boost",
      "2x Heavy-Duty Custom Shock Mounts",
      "2x Gold-Plated 10ft Braided XLR Cables",
    ],
    meta: [
      { label: "Ideal for", value: "Co-hosted podcasts & interviews" },
      { label: "Preamp", value: "+65dB Ultra-Clean Gain Range" },
      { label: "Outputs", value: "Dual Independent Headphone Jacks" },
      { label: "Warranty", value: "3-Year Pro Hardware Coverage" },
    ],
    highlights: [
      "2x Matched Cardioid Studio Microphones",
      "Dual-Input USB-C Interface with Preamp Boost",
      "2x Heavy-Duty Custom Shock Mounts",
      "2x Gold-Plated 10ft Braided XLR Cables",
    ],
  },
  "signature-sponsor": {
    type: "sponsor",
    title: "Enterprise Broadcast Console",
    summary: "Flagship integrated production console with motorized faders and DSP.",
    name: "Enterprise Broadcast Console",
    tagline: "High-end studio console for commercial media networks.",
    price: "$1,199",
    period: "/unit",
    description:
      "The ultimate audio production powerhouse. Featuring motorized faders, Aphex audio processing, multi-track recording, dual USB interfaces, and soundboard buttons.",
    features: [
      "Motorized Touch-Sensitive Studio Faders",
      "Onboard Hardware Aphex Audio Processing (EQ/Compressor/De-Esser)",
      "Dual USB-C Audio Interfaces for 2 Computers",
      "8 Fully Programmable SMART Sound Pads",
    ],
    meta: [
      { label: "Ideal for", value: "Commercial studios & enterprise networks" },
      { label: "Processing", value: "Aural Exciter, Big Bottom & Compellor" },
      { label: "Preamps", value: "Revolution Preamps with -131.5dBV EIN" },
      { label: "Support", value: "24/7 Dedicated Studio Priority Line" },
    ],
    highlights: [
      "Motorized Touch-Sensitive Studio Faders",
      "Onboard Hardware Aphex Audio Processing",
      "Dual USB-C Audio Interfaces",
      "8 Fully Programmable SMART Sound Pads",
    ],
  },
  "network-sponsor": {
    type: "sponsor",
    title: "Full Production 4-Person Kit",
    summary: "Complete four-microphone package for professional broadcast tables.",
    name: "Full Production 4-Person Kit",
    tagline: "Turnkey roundtable podcasting gear for teams.",
    price: "$799",
    period: "/kit",
    description:
      "A complete package for panel discussions. Includes 4 dynamic broadcast microphones, 4 desktop boom arms, 4 headphone channels, and a central studio recording hub.",
    features: [
      "4x Professional Broadcast Microphones",
      "4x Desk-Clamp Articulated Boom Arms",
      "4-Channel High-Power Headphone Amp",
      "4x Over-Ear Studio Monitoring Headphones",
    ],
    meta: [
      { label: "Ideal for", value: "Panel discussions & roundtable shows" },
      { label: "Monitoring", value: "4 Independent Volume Controls" },
      { label: "Cables", value: "4x Color-Coded Studio XLR Cables" },
      { label: "Warranty", value: "3-Year Pro Hardware Coverage" },
    ],
    highlights: [
      "4x Professional Broadcast Microphones",
      "4x Desk-Clamp Articulated Boom Arms",
      "4-Channel High-Power Headphone Amp",
      "4x Over-Ear Studio Monitoring Headphones",
    ],
  },
};

const pricingCards = document.querySelectorAll(".price-card[data-plan]");
if (pricingCards.length) {
  pricingCards.forEach((card) => {
    const fallbackLink = card.querySelector(".plan-cta a");
    const navigateFromCard = () => {
      if (fallbackLink) {
        window.location.href = fallbackLink.getAttribute("href");
      } else {
        window.location.href = "contact.html";
      }
    };
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      navigateFromCard();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      navigateFromCard();
    });
  });
}



const blogPosts = {
  "community-rituals": {
    title: "Choosing the Right Microphone: Dynamic vs Condenser for Podcasts",
    subtitle: "How capsule types, room acoustics, and pickup patterns impact your audio quality.",
    category: "Microphone Guide",
    date: "Jan 14, 2026",
    author: "Jules Harper",
    authorRole: "Audio Engineer & Producer",
    authorImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653a5?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Studio microphone and headphones guide",
    excerpt: "Understand when to pick a warm dynamic mic or a detailed condenser for your podcast.",
    content: [
      "Choosing the right microphone is the single most important decision for your vocal presence. Dynamic microphones are the broadcast standard because their low sensitivity naturally rejects background room echo, computer fans, and untreated room reverberation.",
      "Condenser microphones, on the other hand, provide exquisite detail, rich high-frequency sparkle, and deep low-end resonance, but require a quiet, acoustically treated room to sound their best.",
      "Cardioid pickup patterns remain the gold standard for podcasting, ensuring that sound directly in front of the capsule is captured clearly while off-axis room reflections are rejected.",
      "When pairing your microphone with an audio interface, pay close attention to gain requirements. Low-sensitivity dynamic mics often benefit from high-headroom preamps with at least +60dB of clean gain.",
      "Don't overlook proximity effect: speaking closer to a directional capsule adds warmth and intimacy, making your voice sound authoritative and broadcast-ready.",
      "Always test your mic with pop filters and shock mounts to eliminate plosives and desk bumps before hitting record.",
    ],
    related: ["live-roundtable", "listener-memberships", "sponsor-briefs"],
  },
  "live-roundtable": {
    title: "Setting Up Your First Home Podcast Studio: Gear & Acoustics",
    subtitle: "From boom arms to audio interfaces, everything you need for broadcast sound.",
    category: "Studio Setup",
    date: "Jan 10, 2026",
    author: "Amira Yates",
    authorRole: "Senior Hardware Specialist",
    authorImage: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Professional podcast recording studio setup",
    excerpt: "A step-by-step breakdown of studio desk ergonomics, mic placement, and sound isolation.",
    content: [
      "Building a home recording studio does not require thousands of dollars in construction. Strategic gear choices and basic acoustic treatment can yield world-class sound in any spare room.",
      "Position your desk away from bare corners and reflective glass windows. Adding soft furnishings, rugs, or acoustic foam panels behind your head immediately tames harsh room flutter echoes.",
      "Invest in an articulated broadcast boom arm with internal springs to decouple your microphone from desk vibration, mechanical keyboard clicks, and accidental bumps.",
      "Use closed-back reference headphones during tracking to ensure zero audio bleed from your monitoring mix back into the sensitive microphone capsule.",
      "Keep cable management clean by routing XLR and USB-C cords through boom arm channels to avoid electrical interference and physical clutter.",
      "Run sample test recordings and analyze waveforms in your DAW to calibrate your noise floor before your first guest interview.",
    ],
    related: ["community-rituals", "sonic-identity", "global-distribution"],
  },
  "listener-memberships": {
    title: "Top 5 Audio Interfaces for Crystal-Clear Voice Recording",
    subtitle: "Low-noise preamps, hardware DSP, and zero-latency monitoring compared.",
    category: "Audio Interfaces",
    date: "Jan 06, 2026",
    author: "Kenji Matos",
    authorRole: "Sound Tech Reviewer",
    authorImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "High-end USB audio interface on studio console",
    excerpt: "Discover the best USB audio interfaces with pristine converters and high-gain preamps.",
    content: [
      "An audio interface is the bridge between your microphone's analog signal and your digital recording software. The quality of its preamps and analog-to-digital converters defines your signal clarity.",
      "Look for interfaces with an Equivalent Input Noise (EIN) rating below -128dBu. This ensures that even when cranking gain for quiet speakers, you introduce zero audible hiss.",
      "Hardware loopback channels have become a crucial feature for podcasters, allowing seamless recording of remote guests from Zoom, Discord, or Skype directly into your recording timeline.",
      "Direct hardware monitoring allows hosts and guests to hear their own voices with true zero-latency, preventing confusing echo and vocal strain during long recording sessions.",
      "Built-in DSP processing like compressors, high-pass filters, and limiters can protect your recording from unexpected vocal clipping during enthusiastic moments.",
      "Choose an interface with expandable I/O if you plan to host in-person multi-guest panel discussions down the road.",
    ],
    related: ["community-rituals", "sponsor-briefs", "global-distribution"],
  },
  "sonic-identity": {
    title: "How to Dial in Gain, Compression, and EQ for Pro Vocals",
    subtitle: "Step-by-step vocal chain calibration for warm, punchy broadcast audio.",
    category: "Vocal Processing",
    date: "Jan 02, 2026",
    author: "Rina Castillo",
    authorRole: "Mastering Engineer",
    authorImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653a5?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Audio mixer and equalizer faders",
    excerpt: "Learn how to calibrate your hardware gain staging, high-pass filters, and vocal limiters.",
    content: [
      "Proper gain staging is the foundation of professional audio production. Set your preamp gain so average speech peaks around -18dBFS to -12dBFS, leaving plenty of digital headroom.",
      "Engage a high-pass filter (low-cut) at 80Hz on vocal tracks to eliminate low-frequency rumble from HVAC units, outdoor traffic, and desk vibrations.",
      "Apply gentle compression with a 2:1 to 3:1 ratio to smooth out dynamics between quiet whispers and loud laughter without making the voice sound artificial.",
      "Subtle subtractive EQ around 300Hz to 500Hz cleans up boxy room resonance, while a gentle high-shelf boost around 10kHz adds broadcast sheen and clarity.",
      "Always listen to your final mix on both studio monitoring headphones and consumer earbuds to ensure consistent vocal translation across all listening devices.",
      "Save your calibrated vocal chain as a template in your DAW to speed up episode post-production and maintain brand consistency.",
    ],
    related: ["live-roundtable", "community-rituals", "global-distribution"],
  },
  "global-distribution": {
    title: "Boom Arms, Pop Filters & Shock Mounts: The Essential Accessories",
    subtitle: "How mechanical isolation and acoustic diffusion transform raw recordings.",
    category: "Accessories",
    date: "Jan 20, 2026",
    author: "Maya Chen",
    authorRole: "Studio Gear Curator",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1520523839898-5071282543e2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Microphone boom arm and dual layer pop filter",
    excerpt: "Eliminate plosives, desk vibrations, and cable noise with the right mounting hardware.",
    content: [
      "Even the most expensive studio microphone will sound mediocre if it captures desk bumps, keyboard vibrations, and explosive plosives. Isolation accessories are non-negotiable.",
      "A dual-layer nylon or perforated metal pop filter slows down fast-moving air bursts from 'P' and 'B' consonants, preventing unwanted capsule overload.",
      "Elastic shock mounts isolate the microphone body from mechanical desk energy, preventing footstep thumps and table movements from entering your audio track.",
      "Heavy-duty articulated boom arms keep your workspace clear and let you position the microphone at the optimal 45-degree angle to your mouth for natural speech delivery.",
      "Braided, oxygen-free copper XLR cables with Neutrik connectors ensure noise-free signal transfer without RF interference from nearby mobile devices and monitors.",
      "Investing in premium mounting hardware protects your gear and creates a comfortable, professional recording environment.",
    ],
    related: ["community-rituals", "sonic-identity", "listener-memberships"],
  },
  "sponsor-briefs": {
    title: "Why Studio Monitoring Headphones Matter for Audio Editing",
    subtitle: "Flat frequency response vs consumer sound profiles for accurate podcast mixing.",
    category: "Headphone Guide",
    date: "Jan 18, 2026",
    author: "Talia Brooks",
    authorRole: "Audio Hardware Specialist",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Closed-back studio reference headphones",
    excerpt: "Why flat-response reference headphones are essential for spotting editing mistakes.",
    content: [
      "Consumer headphones often feature boosted bass and artificially hyped treble that can deceive your ears during podcast editing. Studio monitors deliver an uncolored, flat response.",
      "When editing vocals, flat response headphones let you hear subtle mouth clicks, breath noises, room reverb tails, and background hums that consumer earbuds might mask.",
      "Closed-back designs offer superior passive sound isolation, preventing headphone bleed from escaping into live recording microphones during tracking.",
      "Comfort is paramount: look for plush memory foam earcups and padded, adjustable headbands for multi-hour editing and mastering sessions.",
      "Consider impedance ratings: low-impedance headphones (32 to 80 ohms) work effortlessly with laptop jacks and USB interfaces without needing a dedicated headphone amplifier.",
      "Pair your studio headphones with cross-checks on smartphone speakers and car audio to guarantee your podcast sounds punchy and intelligible everywhere.",
    ],
    related: ["community-rituals", "listener-memberships", "live-roundtable"],
  },
};

const blogListView = document.querySelector('[data-blog-view="list"]');
const blogDetailView = document.querySelector('[data-blog-view="detail"]');
const blogBackBtn = document.querySelector("[data-blog-back]");

const showBlogDetail = (postId) => {
  const fallbackId = Object.keys(blogPosts)[0];
  const selectedId = blogPosts[postId] ? postId : fallbackId;
  const post = blogPosts[selectedId];
  if (!post) return;

  const blogSubtitle = document.getElementById("blog-subtitle");
  const blogTitle = document.getElementById("blog-title");
  const blogMeta = document.getElementById("blog-meta");
  const blogImage = document.getElementById("blog-image");
  const blogContent = document.getElementById("blog-content");
  const blogAuthorImage = document.getElementById("blog-author-image");
  const blogAuthorName = document.getElementById("blog-author-name");
  const blogAuthorRole = document.getElementById("blog-author-role");
  const relatedList = document.getElementById("related-list");
  const relatedPosts = document.getElementById("related-posts");

  if (blogSubtitle) blogSubtitle.textContent = post.subtitle;
  if (blogTitle) blogTitle.textContent = post.title;
  if (blogMeta) {
    blogMeta.innerHTML = "";
    [post.category, post.date, `By ${post.author}`].forEach((metaText) => {
      const span = document.createElement("span");
      span.textContent = metaText;
      blogMeta.appendChild(span);
    });
  }
  if (blogImage) {
    blogImage.src = post.image;
    blogImage.alt = post.imageAlt;
  }
  if (blogContent) {
    blogContent.innerHTML = "";
    post.content.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      blogContent.appendChild(p);
    });
  }
  if (blogAuthorImage) {
    blogAuthorImage.src = post.authorImage;
    blogAuthorImage.alt = `${post.author} portrait`;
  }
  if (blogAuthorName) blogAuthorName.textContent = post.author;
  if (blogAuthorRole) blogAuthorRole.textContent = post.authorRole;

  if (relatedList && relatedPosts) {
    const relatedIds =
      post.related && post.related.length
        ? post.related
        : Object.keys(blogPosts).filter((id) => id !== selectedId).slice(0, 3);

    relatedList.innerHTML = "";
    relatedPosts.innerHTML = "";

    relatedIds.forEach((relId) => {
      const relPost = blogPosts[relId];
      if (!relPost) return;
      const link = document.createElement("a");
      link.textContent = relPost.title;
      link.setAttribute("href", "#detail");
      link.dataset.post = relId;
      link.addEventListener("click", (e) => {
        e.preventDefault();
        showBlogDetail(relId);
      });
      relatedList.appendChild(link);

      const card = document.createElement("article");
      card.className = "blog-card";
      card.dataset.post = relId;
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Read ${relPost.title}`);

      const image = document.createElement("img");
      image.src = relPost.image;
      image.alt = relPost.imageAlt;

      const content = document.createElement("div");
      content.className = "content";

      const meta = document.createElement("div");
      meta.className = "meta";
      [relPost.category, relPost.date, `By ${relPost.author}`].forEach((metaText) => {
        const span = document.createElement("span");
        span.textContent = metaText;
        meta.appendChild(span);
      });

      const heading = document.createElement("h3");
      heading.textContent = relPost.title;

      const excerpt = document.createElement("p");
      excerpt.textContent = relPost.excerpt;

      const button = document.createElement("a");
      button.className = "btn btn-outline";
      button.setAttribute("href", "#detail");
      button.dataset.post = relId;
      button.textContent = "Read Article";

      content.appendChild(meta);
      content.appendChild(heading);
      content.appendChild(excerpt);
      content.appendChild(button);

      card.appendChild(image);
      card.appendChild(content);

      card.addEventListener("click", (e) => {
        e.preventDefault();
        showBlogDetail(relId);
      });

      relatedPosts.appendChild(card);
    });
  }

  if (blogListView && blogDetailView) {
    blogListView.classList.add("is-hidden");
    blogListView.setAttribute("aria-hidden", "true");
    blogListView.hidden = true;

    blogDetailView.classList.remove("is-hidden");
    blogDetailView.removeAttribute("aria-hidden");
    blogDetailView.hidden = false;
    blogDetailView.scrollIntoView({ behavior: "smooth" });
  }
};

const showBlogList = () => {
  if (blogListView && blogDetailView) {
    blogDetailView.classList.add("is-hidden");
    blogDetailView.setAttribute("aria-hidden", "true");
    blogDetailView.hidden = true;

    blogListView.classList.remove("is-hidden");
    blogListView.removeAttribute("aria-hidden");
    blogListView.hidden = false;
    blogListView.scrollIntoView({ behavior: "smooth" });
  }
};

if (blogBackBtn) {
  blogBackBtn.addEventListener("click", showBlogList);
}

document.querySelectorAll(".blog-card[data-post], a[data-post]").forEach((el) => {
  el.addEventListener("click", (event) => {
    const postId = el.dataset.post || el.closest("[data-post]")?.dataset.post;
    if (postId && blogPosts[postId]) {
      event.preventDefault();
      showBlogDetail(postId);
    }
  });
});

// Entrance animations (fade + slide + bloom)
(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const candidates = document.querySelectorAll(
    "main section, .card, .price-card, .blog-card, .hero-card, .feature, .form-card, .episode-row, .cta-banner, .story-block, .stats .stat, .blog-article, .blog-aside, .plan-detail .form-card, .plan-detail aside, .plan-detail article"
  );

  const reveal = (el) => {
    el.classList.add("reveal");
  };

  candidates.forEach(reveal);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  candidates.forEach((el) => io.observe(el));

  window.addEventListener("load", () => {
    candidates.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add("is-visible");
        io.unobserve(el);
      }
    });
  });
})();

// unified Menu functionality for premium drawer
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelector(".nav-links");
  const menuToggles = document.querySelectorAll(".menu-toggle");
  const closeNavBtn = document.querySelector(".close-nav-toggle");

  if (navLinks) {
    menuToggles.forEach(toggle => {
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        navLinks.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scroll
      });
    });

    const closeMenu = () => {
      navLinks.classList.remove("active");
      document.body.style.overflow = ""; // Restore scroll
    };

    if (closeNavBtn) {
      closeNavBtn.addEventListener("click", closeMenu);
    }

    // Click outside to close menu
    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(e.target) &&
        ![...menuToggles].some(toggle => toggle.contains(e.target))
      ) {
        closeMenu();
      }
    });

    // Handle Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("active")) {
        closeMenu();
      }
    });
  }
});

// Pricing Tab Switcher
document.addEventListener("DOMContentLoaded", () => {
  const tabBtns = document.querySelectorAll(".pricing-tab-btn");
  const tabContents = document.querySelectorAll(".pricing-tab-content");

  if (tabBtns.length) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.pricingTab;

        // Update buttons
        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Update content
        tabContents.forEach((content) => {
          if (content.id === `${target}-plans`) {
            content.classList.add("active");
          } else {
            content.classList.remove("active");
          }
        });
      });
    });
  }
});
