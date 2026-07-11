# Yatish Gurrala Portfolio

A modern, premium, responsive portfolio and case-study website built with Next.js, TypeScript, and Tailwind CSS. The site is statically exported so it can be deployed for free with GitHub Pages.

## 1. Project overview

This portfolio is designed to showcase:

- AI and SaaS products
- Mobile and web development work
- Techbckp agency services
- Detailed project case studies
- Professional Android experience with confidentiality-safe summaries
- Articles, contact options, and shareable LinkedIn-friendly pages

The content system is data-driven. Most future updates happen inside the `data/` directory plus image folders under `public/images/`.

## 2. Local setup

### Prerequisites

- Node.js 20+
- npm 10+

### Clone and install

```bash
npm install
```

## 3. Installation commands

```bash
npm install
```

## 4. Development commands

```bash
npm run dev
npm run lint
npm run typecheck
```

## 5. Production build

```bash
npm run build
```

The static export is written to `out/`.

## 6. GitHub Pages deployment

GitHub Actions workflow: `/home/runner/work/portfolio/portfolio/.github/workflows/deploy.yml`

### Activation steps

1. Push the repository to GitHub.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Make sure the default branch used for deployment matches the workflow trigger (`Main`).
5. Trigger the workflow by pushing to `Main` or running it manually from the Actions tab.

### How basePath and assetPrefix work

The site reads the repository name from `package.json`.

- Repository name: `portfolio`
- GitHub Pages path: `https://USERNAME.github.io/portfolio/`

`next.config.ts` automatically applies `basePath` and `assetPrefix` during GitHub Actions builds.

### How to change `USERNAME` or repository name

- Change `package.json` → `name` if the repository name changes.
- Update `NEXT_PUBLIC_SITE_URL` in the workflow if your published URL changes.
- If you fork the repository, the workflow automatically uses the GitHub repository owner for the `USERNAME` portion of the Pages URL.

## 7. How to edit personal information

Update these files:

- `data/site.ts` for name, positioning, hero indicators, and navigation
- `data/socialLinks.ts` for LinkedIn, GitHub, X, email, Techbckp, and contact destinations
- `app/about/page.tsx` for biography and positioning copy
- `app/contact/page.tsx` for project inquiry labels and budget options

## 8. How to add a project

1. Add a new project object in `data/projects.ts`.
2. Provide a unique `slug`.
3. Add images inside `public/images/projects/<slug>/`.
4. Set `thumbnail`, `screenshots`, `tags`, `category`, and case-study sections.
5. The project automatically appears on the Projects page and gets a dynamic case-study route at `/projects/<slug>/`.

## 9. How to add screenshots

Place new files under:

```text
public/images/projects/<slug>/
```

Recommended images to add per project:

- `cover` image for cards and Open Graph sharing
- 1 dashboard or desktop screenshot
- 1 mobile screenshot or mockup
- Optional architecture diagram
- Optional GIF or linked video demo

Use descriptive alt text inside `data/projects.ts` for every screenshot entry.

## 10. How to add an article

1. Add a new object to `data/articles.ts`.
2. Add a cover image under `public/images/articles/`.
3. Update title, description, publication date, tags, and external URL.

## 11. How to update social links

Edit `data/socialLinks.ts`:

- LinkedIn
- GitHub
- X
- Email
- Techbckp website
- Formspree
- Calendly
- Google Form

## 12. How to configure the contact form

The contact page is static-hosting friendly. Choose one or more of these options in `data/socialLinks.ts`:

- `formspreeEndpoint`
- `emailLink`
- `calendlyLink`
- `googleFormLink`

Do not commit API keys or secrets. Only public URLs should be stored in the repo.

## 13. How to configure a custom domain later

If you want to use a custom domain later:

1. Add your custom domain in **Settings → Pages**.
2. Set `NEXT_PUBLIC_CUSTOM_DOMAIN=true` during the build so `next.config.ts` does not apply the repository base path.
3. Add a `CNAME` file to `public/` when you are ready.
4. Update `NEXT_PUBLIC_SITE_URL` to your final domain.

## 14. How to update SEO images

- Default social image: `public/og/default.svg`
- Project share images: each project currently uses its `thumbnail`
- Replace placeholder SVGs with real branded images when available

For better LinkedIn previews, replace the SVG placeholders with polished 1200×630 images.

## 15. How to avoid exposing confidential information

For professional experience entries:

- Do not add private repositories
- Do not add internal screenshots
- Do not add proprietary architecture diagrams
- Do not add internal API shapes or company-specific documentation
- Keep results qualitative unless you have explicit permission to share metrics
- Use the existing “Professional experience — details limited due to confidentiality.” label when needed

## Folder structure

```text
app/
  page.tsx
  projects/
    page.tsx
    [slug]/page.tsx
  services/
    page.tsx
  about/
    page.tsx
  articles/
    page.tsx
  contact/
    page.tsx
components/
  layout/
  projects/
  case-study/
  ui/
data/
  projects.ts
  services.ts
  articles.ts
  skills.ts
  socialLinks.ts
  site.ts
public/
  images/
    projects/
    articles/
  og/
.github/
  workflows/
    deploy.yml
```

## Content placeholders you should replace before launch

- LinkedIn, X, email, and Techbckp URLs in `data/socialLinks.ts`
- Formspree, Calendly, and Google Form links in `data/socialLinks.ts`
- Timeline and live-product details in `data/projects.ts`
- Placeholder article entries in `data/articles.ts`
- Placeholder screenshots and SVG graphics in `public/images/`
- Optional architecture details and hosting/payment notes in case studies

## Screenshot and image suggestions per project

### CiteGPT

- Public landing page hero
- SaaS dashboard screenshot
- Chat widget screenshot
- Source citation interaction
- Optional short GIF showing ingestion to answer flow

### ResumeLoop AI

- Resume analysis screen
- Career dashboard
- Job tracking workflow screenshot
- Content generation view
- Optional onboarding flow visual

### Techbckp

- Branded homepage hero
- Services overview section
- Proposal/process graphic
- Studio or capabilities mockup

### Android Application Projects

- Sanitized Android UI screens
- Device mockups
- Architecture flow diagram
- Optional release or feature storyboard visual

### Web Application Projects

- Public dashboard screenshot
- Marketing/landing page screenshot
- Responsive browser mockups
- Architecture diagram or flow graphic

### Professional Experience entries

- Only use approved abstractions
- Consider neutral diagrams, workflow illustrations, or device frames with non-confidential placeholder UI
