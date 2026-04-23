/**
 * Deep Landing Page Audit — Waters Edge Medical Clinic
 * Covers: Visual Design, Layout, Typography, CRO, Copy, UX, Trust Signals
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const LPS = [
  { slug: 'softwave',       url: 'https://softwave.watersedgemedicalclinic.com',       label: 'SoftWave $49' },
  { slug: 'morpheus8',      url: 'https://morpheus8.watersedgemedicalclinic.com',      label: 'Morpheus8' },
  { slug: 'hairrestoration',url: 'https://hairrestoration.watersedgemedicalclinic.com',label: 'Hair Restoration' },
  { slug: 'jointpain',      url: 'https://jointpain.watersedgemedicalclinic.com',      label: 'Joint Pain' },
  { slug: 'neuropathy',     url: 'https://neuropathy.watersedgemedicalclinic.com',     label: 'Neuropathy Treatment' },
  { slug: 'vampirefacial',  url: 'https://vampirefacial.watersedgemedicalclinic.com',  label: 'Vampire Facial' },
  { slug: 'potenza',        url: 'https://potenza.watersedgemedicalclinic.com',        label: 'Potenza' },
  { slug: 'weightloss',     url: 'https://weightloss.watersedgemedicalclinic.com',     label: 'Weight Loss $49' },
];

const OUT_DIR = path.resolve('data/lp-analysis');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function auditPage(browser, lp) {
  console.log(`\n→ Auditando: ${lp.label} (${lp.url})`);
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto(lp.url, { waitUntil: 'networkidle', timeout: 30000 });

  // Full page screenshot (desktop)
  const ssDesktop = path.join(OUT_DIR, `${lp.slug}-desktop.png`);
  await page.screenshot({ path: ssDesktop, fullPage: true });

  // Mobile screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  const ssMobile = path.join(OUT_DIR, `${lp.slug}-mobile.png`);
  await page.screenshot({ path: ssMobile, fullPage: true });
  await page.setViewportSize({ width: 1440, height: 900 });

  // Extract structured data from the page
  const data = await page.evaluate(() => {
    const getText = (sel) => document.querySelector(sel)?.innerText?.trim() || '';
    const getAll = (sel) => [...document.querySelectorAll(sel)].map(el => el.innerText?.trim()).filter(Boolean);
    const attr = (sel, att) => document.querySelector(sel)?.[att] || '';

    // Typography
    const h1 = getText('h1');
    const h2s = getAll('h2');
    const h3s = getAll('h3');
    const bodyText = document.body.innerText.substring(0, 3000);

    // Fonts in use
    const allEls = [...document.querySelectorAll('*')];
    const fonts = [...new Set(allEls.map(el => getComputedStyle(el).fontFamily).filter(Boolean))].slice(0, 10);

    // Colors (background + text of key elements)
    const heroEl = document.querySelector('section, .hero, [class*="hero"], header') || document.body;
    const heroBg = getComputedStyle(heroEl).backgroundColor;
    const heroColor = getComputedStyle(heroEl).color;
    const bodyBg = getComputedStyle(document.body).backgroundColor;

    // CTAs
    const ctaButtons = [...document.querySelectorAll('a[href*="book"], a[href*="schedule"], a[href*="contact"], a[href*="form"], button, .cta, [class*="cta"], [class*="btn"]')]
      .map(el => ({ text: el.innerText?.trim(), tag: el.tagName, href: el.href || '' }))
      .filter(el => el.text?.length > 0 && el.text.length < 60)
      .slice(0, 10);

    // Images
    const images = [...document.querySelectorAll('img')].map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      loading: img.loading,
    })).slice(0, 15);

    // Videos
    const videos = [...document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]')].map(v => ({
      tag: v.tagName,
      src: v.src || v.querySelector('source')?.src,
    }));

    // Trust signals
    const trustKeywords = ['guarantee', 'risk-free', 'certified', 'award', 'stars', 'reviews', 'google', 'bbb', 'licensed', 'board-certified', 'dr.', 'before', 'after'];
    const fullText = document.body.innerText.toLowerCase();
    const trustFound = trustKeywords.filter(k => fullText.includes(k));

    // Forms
    const forms = [...document.querySelectorAll('form')].map(f => ({
      fields: [...f.querySelectorAll('input, select, textarea')].map(i => ({ type: i.type, name: i.name, placeholder: i.placeholder })),
      submitBtn: f.querySelector('button[type=submit], input[type=submit]')?.innerText || f.querySelector('button')?.innerText,
    }));

    // Navigation
    const navLinks = [...document.querySelectorAll('nav a, header a')].map(a => ({ text: a.innerText?.trim(), href: a.href })).slice(0, 15);

    // Sections (count scroll depth)
    const sections = [...document.querySelectorAll('section, [class*="section"]')].length;

    // Social proof
    const testimonials = [...document.querySelectorAll('[class*="testimonial"], [class*="review"], blockquote')].map(el => el.innerText?.trim()?.substring(0, 200));

    // Countdown / urgency
    const countdownPresent = !!document.querySelector('[class*="countdown"], [class*="timer"], [id*="countdown"]');
    const urgencyWords = ['limited', 'today only', 'expires', 'hurry', 'last chance', 'spots'];
    const urgencyFound = urgencyWords.filter(k => fullText.includes(k));

    // Spacing/layout
    const sectionPaddings = [...document.querySelectorAll('section')].slice(0, 3).map(s => ({
      paddingTop: getComputedStyle(s).paddingTop,
      paddingBottom: getComputedStyle(s).paddingBottom,
    }));

    return {
      h1, h2s, h3s,
      bodyText,
      fonts,
      colors: { heroBg, heroColor, bodyBg },
      ctaButtons,
      images,
      videos,
      trustFound,
      forms,
      navLinks,
      sections,
      testimonials,
      countdownPresent,
      urgencyFound,
      sectionPaddings,
    };
  });

  await ctx.close();

  return {
    slug: lp.slug,
    label: lp.label,
    url: lp.url,
    screenshots: { desktop: ssDesktop, mobile: ssMobile },
    data,
  };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const lp of LPS) {
    try {
      const result = await auditPage(browser, lp);
      results.push(result);
      console.log(`  ✓ ${lp.label} — ${result.data.sections} seções, ${result.data.videos.length} vídeos, ${result.data.forms.length} formulários`);
    } catch (e) {
      console.error(`  ✗ Erro em ${lp.label}: ${e.message}`);
      results.push({ slug: lp.slug, label: lp.label, url: lp.url, error: e.message });
    }
  }

  await browser.close();

  const outFile = path.join('data', 'lp-raw.json');
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log(`\n✅ Dados salvos em ${outFile}`);
}

main().catch(console.error);
