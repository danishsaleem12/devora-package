//src/lib/site.js

/**
 * Company contact details shown around the site. Set the real ones in your hosting environment
 * (and .env.local) and redeploy. A social link that isn't set is simply not shown, so the site
 * never links to an account that isn't yours.
 *
 *   NEXT_PUBLIC_CONTACT_EMAIL=you@yourdomain.com
 *   NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/your-page
 *   NEXT_PUBLIC_GITHUB_URL=https://github.com/your-org
 */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@devora.com";
export const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || "";
export const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL || "";
