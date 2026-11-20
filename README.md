# Portfolio

Personal portfolio website of Gourav Shukla - Python/Django developer based in Bengaluru.

## Stack

Plain HTML, CSS and vanilla JavaScript. No build step, no dependencies.

## Structure

```
index.html        Single-page markup (semantic sections)
css/style.css     Design tokens, layout, components, animations, responsive rules
js/main.js        Typing effect, nav behaviour, scroll reveals
assets/           Favicon and static assets
robots.txt        Crawler rules
sitemap.xml       Sitemap for search engines
```

## Running locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deployment

The site is fully static and deploys as-is:

- **Vercel**: import the repo, framework preset "Other", no build command, output directory `/`.
- **Netlify**: import the repo, no build command, publish directory `/`.
- **GitHub Pages**: Settings > Pages > deploy from branch, root folder.
