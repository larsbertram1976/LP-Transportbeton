import { test, expect } from "@playwright/test";

test.describe("PROJ-1: Page Shell & Hero-Sektion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("AC-1: Page shell has semantic header, main, footer with required content", async ({
    page,
  }) => {
    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    // Logo / Mölders wordmark accessible from header
    await expect(
      page.getByRole("link", { name: /zur startseite/i }),
    ).toBeVisible();

    // Footer: Impressum & Datenschutz outbound to moelders.de
    await expect(
      footer.getByRole("link", { name: /impressum/i }),
    ).toBeVisible();
    await expect(
      footer.getByRole("link", { name: /datenschutz/i }),
    ).toBeVisible();

    // Footer: Region hint + copyright
    await expect(footer).toContainText(
      /Hamburg.*Hannover.*Berlin/i,
    );
    await expect(footer).toContainText(/Mölders Holding/i);
  });

  test("AC-2: Mölders brand colors are wired via CSS variables and used in the UI", async ({
    page,
  }) => {
    const primary = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim(),
    );
    const brandRed = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--brand-red")
        .trim(),
    );
    const brandCream = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--brand-cream")
        .trim(),
    );

    expect(primary).toBe("353 100% 44%");
    expect(brandRed).toBe("353 100% 44%");
    expect(brandCream).toBe("40 30% 97%");

    // Brand red is applied somewhere in the header/hero (logo wordmark)
    const logoColor = await page
      .locator('span[aria-label="Mölders"] span')
      .first()
      .evaluate((el) => getComputedStyle(el).color);
    // Mölders red ≈ rgb(224, 0, 28) ± rendering tolerance
    expect(logoColor).toMatch(/rgb\(2[12]\d,\s*0,\s*\d+\)/);
  });

  test("AC-3: Hero has H1 with 'Transportbeton', subline, 3–5 trust anchors, and a visual", async ({
    page,
  }) => {
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(/Transportbeton/i);

    // Subline (factual sentence about Frischbeton)
    await expect(
      page.getByText(/Frischbeton in geprüfter Qualität/i),
    ).toBeVisible();

    // Trust anchors list (3–5 items)
    const trustItems = page.locator(
      'ul[aria-label="Vorteile auf einen Blick"] > li',
    );
    const count = await trustItems.count();
    expect(count).toBeGreaterThanOrEqual(3);
    expect(count).toBeLessThanOrEqual(5);

    // Hero visual placeholder content (CSS-only, but contains visible text)
    await expect(page.getByText(/C20\/25 bis C30\/37/i)).toBeVisible();
  });

  test("AC-4: No horizontal scrollbar at current viewport", async ({ page }) => {
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    // Tolerance of 1 px for sub-pixel rounding
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test("AC-4 (tablet 768px): No horizontal scrollbar at tablet viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test("AC-4 (ultrawide 2560px): Container max-width prevents over-stretching", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 2560, height: 1440 });
    // Hero main column must not exceed max-w-6xl (~72rem = 1152px) container width
    const heroContainer = page
      .locator("section#top > div")
      .first();
    const box = await heroContainer.boundingBox();
    expect(box).not.toBeNull();
    // Container max-w-6xl is 72rem ≈ 1152px; allow Tailwind exact 1152
    expect(box!.width).toBeLessThanOrEqual(1200);
  });

  test("AC-5: Exactly one H1 on the page", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("AC-6: Page title and meta description are set with relevant content", async ({
    page,
  }) => {
    await expect(page).toHaveTitle(/Transportbeton.*Mölders/i);

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description, "meta description should be set").not.toBeNull();
    expect(description!.length).toBeGreaterThan(50);
    expect(description!.length).toBeLessThan(200);
    expect(description).toMatch(/Transportbeton/i);
  });

  test("AC-8: Visible content is in German and contains no Lorem Ipsum", async ({
    page,
  }) => {
    const bodyText = (await page.locator("body").innerText()).toLowerCase();
    expect(bodyText).not.toContain("lorem ipsum");
    // German marker words present
    expect(bodyText).toContain("transportbeton");
    expect(bodyText).toMatch(/region|regional/);
  });

  test("EC-Outbound: All moelders.de links open in a new tab with secure rel", async ({
    page,
  }) => {
    const externals = page.locator('a[href^="https://www.moelders.de"]');
    const total = await externals.count();
    expect(total).toBeGreaterThan(0);
    for (let i = 0; i < total; i++) {
      const link = externals.nth(i);
      await expect(link).toHaveAttribute("target", "_blank");
      const rel = (await link.getAttribute("rel")) ?? "";
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    }
  });

  test("EC-MobileMenu: Hamburger opens sheet and exposes primary nav (mobile only)", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "mobile-only behavior");

    const hamburger = page.getByRole("button", { name: /menü öffnen/i });
    await expect(hamburger).toBeVisible();
    await hamburger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("link", { name: /^sorten/i }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("link", { name: /^service/i }),
    ).toBeVisible();
  });

  test("EC-DesktopNav: Visible on desktop, hidden on mobile", async ({
    page,
    isMobile,
  }) => {
    const nav = page.getByRole("navigation", { name: /hauptnavigation/i });
    if (isMobile) {
      // Desktop nav uses .hidden md:flex; assert it is not visible
      await expect(nav).toBeHidden();
    } else {
      await expect(nav).toBeVisible();
    }
  });

  test("EC-ReducedMotion: smooth-scroll is disabled when prefers-reduced-motion is set", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    const scrollBehavior = await page.evaluate(() =>
      getComputedStyle(document.documentElement).scrollBehavior,
    );
    expect(scrollBehavior).toBe("auto");
    await context.close();
  });

  test("EC-NoJS: Server-rendered HTML still contains hero, trust anchors, and footer", async ({
    request,
  }) => {
    const response = await request.get("/");
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain('<html lang="de"');
    expect(html).toContain("Transportbeton");
    expect(html).toContain("Regional verwurzelt");
    expect(html).toContain("Frisch geliefert");
    expect(html).toContain("Profi &amp; Privat");
    expect(html).toContain("Familienunternehmen");
    expect(html).toContain("Mölders Holding");
  });

  test("EC-LogoAccessibleName: Wordmark exposes 'Mölders' via aria-label", async ({
    page,
  }) => {
    const logo = page.locator('span[aria-label="Mölders"]').first();
    await expect(logo).toHaveCount(1);
    await expect(logo).toBeVisible();
  });

  test("Security: No NEXT_PUBLIC_ env values are leaked in HTML payload", async ({
    request,
  }) => {
    const html = await (await request.get("/")).text();
    // The page never reads any NEXT_PUBLIC_ vars; assert none accidentally inlined.
    expect(html).not.toMatch(/NEXT_PUBLIC_[A-Z0-9_]+/);
    // No anthropic / supabase keys leaked
    expect(html.toLowerCase()).not.toContain("supabase_key");
    expect(html).not.toMatch(/sk-[A-Za-z0-9]{20,}/);
  });
});
