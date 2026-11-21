/* Curated Pinterest sources shared by Siya. These are site-wide, not localStorage. */
(function () {
  "use strict";
  const sources = [
    { url: "https://pin.it/614Wbjj9F", number: "01" },
    { url: "https://pin.it/5Os9Uxw9p", number: "02" }
  ];
  const destination = document.getElementById("featured-pinterest");
  if (!destination) return;

  const typeNames = {
    profile: "Pinterest profile",
    board: "Pinterest board",
    pin: "Pinterest Pin"
  };
  const embedTypes = {
    profile: "embedUser",
    board: "embedBoard",
    pin: "embedPin"
  };

  function make(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function refreshWidgets() {
    if (window.PinUtils && typeof window.PinUtils.build === "function") {
      window.PinUtils.build();
      return;
    }
    let script = document.querySelector('script[data-pinterest-script]');
    if (!script) {
      script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.src = "https://assets.pinterest.com/js/pinit.js";
      script.setAttribute("data-pinterest-script", "1");
      document.body.appendChild(script);
    }
    script.addEventListener("load", function () {
      if (window.PinUtils && typeof window.PinUtils.build === "function") {
        window.PinUtils.build();
      }
    }, { once: true });
  }

  async function drawSource(source) {
    const card = make("article", "featured-pinterest-card");
    const top = make("span", "board-meta", "CONNECTED SOURCE / " + source.number);
    const title = make("h3", "", "Shared Pinterest link " + source.number);
    const description = make("p", "featured-pinterest-help", "Loading the public Pinterest preview…");
    const preview = make("div", "featured-pinterest-preview");
    preview.setAttribute("aria-live", "polite");
    const directLink = make("a", "external", "Open on Pinterest ");
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("class", "line-icon");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("stroke-width", "1.6");
    icon.setAttribute("stroke-linecap", "round");
    icon.setAttribute("stroke-linejoin", "round");
    icon.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M7 17 17 7M7 7h10v10");
    icon.appendChild(path);
    directLink.appendChild(icon);
    directLink.href = source.url;
    directLink.target = "_blank";
    directLink.rel = "noopener noreferrer";

    card.append(top, title, description, preview, directLink);
    destination.appendChild(card);

    try {
      const response = await fetch(
        "/api/pinterest-resolve?url=" + encodeURIComponent(source.url),
        { headers: { Accept: "application/json" } }
      );
      if (!response.ok) throw new Error("Unable to resolve shared link");
      const result = await response.json();
      if (!embedTypes[result.kind] || !/^https:\/\/www\.pinterest\.com\//.test(result.url)) {
        throw new Error("Not an embeddable Pinterest URL");
      }
      title.textContent = typeNames[result.kind];
      description.textContent =
        result.kind === "profile" ? "The latest public Pins from this profile." :
        result.kind === "board" ? "Live inspiration saved to this public board." :
        "A Pin from your creative archive.";
      directLink.href = result.url;
      const embed = make("a", "", "View on Pinterest");
      embed.href = result.url;
      embed.target = "_blank";
      embed.rel = "noopener noreferrer";
      embed.setAttribute("data-pin-do", embedTypes[result.kind]);
      embed.setAttribute("data-pin-board-width", String(
        Math.max(260, Math.min(480, card.clientWidth - 44))
      ));
      embed.setAttribute("data-pin-scale-height", "315");
      embed.setAttribute("data-pin-scale-width", "90");
      preview.appendChild(embed);
      refreshWidgets();
    } catch (error) {
      description.textContent =
        "This Pinterest short link cannot currently be previewed here. " +
        "The original is still available below.";
      preview.appendChild(make("p", "featured-pinterest-placeholder",
        "Open the link on Pinterest to see this collection. " +
        "A full public pinterest.com board or profile link is needed for a guaranteed widget preview."
      ));
    }
  }

  sources.forEach(drawSource);
})();
