/* Hero code card: types out developer.py line by line, then highlights it. */

(function () {
  var el = document.getElementById("typed-code");
  if (!el) return;

  var source = [
    "class Developer:",
    "    def __init__(self):",
    '        self.name = "Gourav Shukla"',
    '        self.role = "Python Developer"',
    '        self.stack = ["Django", "React",',
    '                      "PostgreSQL"]',
    '        self.focus = "Generative AI"',
    "",
    "    def open_to_work(self):",
    "        return True"
  ].join("\n");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function highlight(text) {
    var escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    var strings = [];
    escaped = escaped.replace(/"([^"\n]*)"/g, function (match) {
      strings.push(match);
      return "\u0000" + (strings.length - 1) + "\u0000";
    });
    escaped = escaped
      .replace(/\b(class|def|return|self|True)\b/g, '<span class="tok-kw">$1</span>')
      .replace(/\b(__init__|open_to_work)\b/g, '<span class="tok-fn">$1</span>')
      .replace(/\b(name|role|stack|focus)(?=\s*=)/g, '<span class="tok-attr">$1</span>');
    return escaped.replace(/\u0000(\d+)\u0000/g, function (match, index) {
      return '<span class="tok-str">' + strings[Number(index)] + "</span>";
    });
  }

  if (reduceMotion) {
    el.innerHTML = highlight(source);
    return;
  }

  var i = 0;
  function tick() {
    i += 1;
    el.textContent = source.slice(0, i);
    if (i < source.length) {
      var ch = source.charAt(i - 1);
      var delay = ch === "\n" ? 90 : 18 + Math.random() * 26;
      window.setTimeout(tick, delay);
    } else {
      el.innerHTML = highlight(source);
    }
  }
  window.setTimeout(tick, 600);
})();
/* Scroll reveals: fade sections in as they enter the viewport. */

(function () {
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (item) {
      item.classList.add("visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  items.forEach(function (item) {
    observer.observe(item);
  });
})();
/* Navigation: condensed header on scroll, mobile menu toggle. */

(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");

  function onScroll() {
    if (window.scrollY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });

    links.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }
})();
/* Active section highlighting in the nav, plus the footer year. */

(function () {
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a[href^="#"]')
  );
  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          links.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
