/* ============================================================
   walk.js — scroll-driven day->night, horizontal parallax,
   drifting autumn leaves, and the pastel-mist dissolve.
   Vanilla JS, no dependencies.
   ============================================================ */
(function () {
  "use strict";

  var root   = document.documentElement;
  var track  = document.getElementById("track");
  var layers = Array.prototype.slice.call(document.querySelectorAll(".layer"));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SVGNS  = "http://www.w3.org/2000/svg";

  function el(name, attrs) {
    var n = document.createElementNS(SVGNS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function rand(a, b) { return a + Math.random() * (b - a); }

  /* ---- stars ---- */
  var stars = document.getElementById("stars");
  if (stars) {
    for (var i = 0; i < 90; i++) {
      var s = document.createElement("div");
      s.className = "star";
      s.style.left = rand(0, 100) + "%";
      s.style.top  = rand(0, 62) + "%";
      s.style.animationDelay = rand(0, 4) + "s";
      if (Math.random() > 0.8) { s.style.width = "3px"; s.style.height = "3px"; }
      stars.appendChild(s);
    }
  }

  /* ---- distant skyline windows ---- */
  var winGroup = document.querySelector(".layer--skyline .windows");
  if (winGroup) {
    document.querySelectorAll(".layer--skyline > svg > g:first-child rect").forEach(function (b) {
      var x = +b.getAttribute("x"), y = +b.getAttribute("y");
      var w = +b.getAttribute("width"), h = +b.getAttribute("height");
      for (var gx = x + 12; gx < x + w - 10; gx += 26) {
        for (var gy = y + 16; gy < y + h - 20; gy += 34) {
          if (Math.random() > 0.45) {
            winGroup.appendChild(el("rect", { x: gx, y: gy, width: 10, height: 16 }));
          }
        }
      }
    });
  }

  /* ---- bridge suspender rods + deck lamps ---- */
  var suspenders = document.querySelector(".suspenders");
  var lamps = document.querySelector(".lamps");
  if (suspenders && lamps) {
    function sag(x) {
      if (x < 777)  return quadY(0, 470, 390, 600, 777, 316, x);
      if (x < 2077) return quadY(777, 316, 1418, 560, 2077, 316, x);
      return quadY(2077, 316, 2520, 600, 3000, 470, x);
    }
    for (var bx = 60; bx < 3000; bx += 70) {
      suspenders.appendChild(el("line", { x1: bx, y1: sag(bx), x2: bx, y2: 560 }));
      lamps.appendChild(el("circle", { cx: bx, cy: 552, r: 4, fill: "var(--lamp-glow)" }));
    }
  }
  function quadY(x0, y0, x1, y1, x2, y2, x) {
    var best = 0, bestd = Infinity;
    for (var t = 0; t <= 1; t += 0.02) {
      var mt = 1 - t;
      var px = mt * mt * x0 + 2 * mt * t * x1 + t * t * x2;
      var d = Math.abs(px - x);
      if (d < bestd) { bestd = d; best = t; }
    }
    var m = 1 - best;
    return m * m * y0 + 2 * m * best * y1 + best * best * y2;
  }

  /* ---- drifting leaves: each tree sheds its own (ginkgo fans / maple palmate) ---- */
  var emitters = Array.prototype.slice.call(document.querySelectorAll(".emitter"));

  // Pin each emitter to its tree's exact spot by replaying the SVG's
  // preserveAspectRatio="...Max slice" layout from the live render geometry.
  function layoutEmitters() {
    emitters.forEach(function (em) {
      var layer = em.closest(".layer");
      var svg = layer && layer.querySelector("svg");
      if (!svg) return;
      var vb = svg.viewBox.baseVal;
      // svg is scaled to layer height; its intrinsic width sits at the layer's left edge
      var scale = layer.clientHeight / vb.height;
      em.style.left = ((+em.getAttribute("data-vbx")) * scale) + "px";
      em.style.top  = ((+em.getAttribute("data-vby")) * scale) + "px";
      em.dataset.scale = scale;
    });
  }
  layoutEmitters();

  emitters.forEach(function (em) {
    var kind   = em.getAttribute("data-kind") || "ginkgo";
    var count  = +em.getAttribute("data-count") || 6;
    var spread = (+em.getAttribute("data-spread") || 120) * (+em.dataset.scale || 1);
    for (var l = 0; l < count; l++) {
      var size = Math.max(12, Math.min(46, rand(16, 30) * (+em.dataset.scale || 1)));
      var leaf = document.createElementNS(SVGNS, "svg");
      leaf.setAttribute("class", "leaf leaf--" + kind);
      leaf.setAttribute("viewBox", kind === "ginkgo" ? "0 0 40 40" : "0 0 40 44");
      leaf.style.width = size + "px";
      leaf.style.height = (size * 1.05) + "px";
      // start somewhere in the canopy, then tumble down and gently left
      leaf.style.setProperty("--x0", rand(-spread, spread) + "px");
      leaf.style.setProperty("--y0", rand(-spread * 0.55, spread * 0.45) + "px");
      leaf.style.setProperty("--dx", rand(-spread * 0.8, -spread * 0.1) + "px");
      leaf.style.setProperty("--dy", rand(34, 54) + "vh");
      leaf.style.setProperty("--spin", rand(220, 520) + "deg");
      if (reduce) {
        leaf.style.animation = "none";
      } else {
        leaf.style.animationDuration = rand(9, 18) + "s";
        leaf.style.animationDelay = (-rand(0, 18)) + "s";
      }
      var use = document.createElementNS(SVGNS, "use");
      use.setAttribute("href", "#leaf-" + kind);
      leaf.appendChild(use);
      em.appendChild(leaf);
    }
  });

  /* ---- scroll -> progress ---- */
  function smoothstep(a, b, x) {
    var t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  var ranges = [];
  function measure() {
    ranges = layers.map(function (l) {
      var speed = parseFloat(l.getAttribute("data-speed"));
      if (isNaN(speed)) speed = 1;
      return Math.max(0, l.scrollWidth - window.innerWidth) * speed;
    });
  }

  var ticking = false;
  function render() {
    var max = track.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

    root.style.setProperty("--t", p.toFixed(4));
    root.style.setProperty("--day-op",   (1 - smoothstep(0.08, 0.5, p)).toFixed(3));
    root.style.setProperty("--dusk-op",  smoothstep(0.18, 0.55, p).toFixed(3));
    root.style.setProperty("--night-op", smoothstep(0.5, 0.92, p).toFixed(3));
    root.style.setProperty("--star-op",  smoothstep(0.62, 1, p).toFixed(3));
    root.style.setProperty("--light-op", smoothstep(0.42, 0.85, p).toFixed(3));
    root.style.setProperty("--mist-op",  (smoothstep(0.66, 1, p) * 0.82).toFixed(3));
    root.style.setProperty("--city-fade", (1 - smoothstep(0.74, 1, p) * 0.4).toFixed(3));

    if (!reduce) {
      for (var i = 0; i < layers.length; i++) {
        layers[i].style.transform = "translateX(" + (-p * ranges[i]).toFixed(1) + "px)";
      }
    }
    ticking = false;
  }

  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(render); } }

  if (reduce) {
    root.style.setProperty("--day-op", "0.15");
    root.style.setProperty("--dusk-op", "1");
    root.style.setProperty("--night-op", "0.35");
    root.style.setProperty("--star-op", "0.4");
    root.style.setProperty("--light-op", "0.7");
    root.style.setProperty("--mist-op", "0.5");
  } else {
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () { layoutEmitters(); measure(); render(); });
    render();
  }
})();
