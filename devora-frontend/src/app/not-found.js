//src/app/not-found.js

import NotFoundContent from "@/components/NotFoundContent";

// shown for any unknown URL and whenever a page calls notFound() (e.g. an unknown /services/<slug>)
export const metadata = { title: "Page not found | Devora" };

export default function NotFound() {
  return <NotFoundContent />;
}
