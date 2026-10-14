//src/components/AppLoader.js

"use client";

import { API_URL } from "@/lib/api";
import { useEffect, useState, useSyncExternalStore } from "react";
import { DEFAULT_LANG, getLang, subscribeLang } from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion";


const MIN_VISIBLE_MS = 700; // never flash: show at least this long
const MAX_WAIT_MS = 8000; // never trap the user if the backend is down/asleep

/**
 * Full-screen splash shown on the first load of the site.
 *
 * It is rendered on the server too, so it covers the page from the very first
 * paint (instead of the user staring at a blank navbar while the backend wakes
 * up). It disappears once:
 *   1. the browser finished loading the page (fonts, scripts), AND
 *   2. the backend answered (this also "warms up" a sleeping host), AND
 *   3. the minimum display time passed
 * ...or after MAX_WAIT_MS, whichever comes first.
 *
 * It lives in layout.js, which stays mounted during client-side navigation,
 * so it only appears on a full page load — not on every link click.
 */
// The loader sits outside <LanguageProvider> and shows before any catalog has downloaded,
// so it carries its own tiny word list instead of using t().
const LOADING_TEXT = { en: "Loading", fr: "Chargement", es: "Cargando" };

export default function AppLoader() {
    const lang = useSyncExternalStore(subscribeLang, getLang, () => DEFAULT_LANG);
    const loadingText = LOADING_TEXT[lang] || LOADING_TEXT.en;
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let done = false;
        const startedAt = Date.now();

        const finish = () => {
            if (done) return;
            done = true;
            const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt));
            setTimeout(() => setVisible(false), wait);
        };

        const pageReady = new Promise((resolve) => {
            if (document.readyState === "complete") resolve();
            else window.addEventListener("load", resolve, { once: true });
        });

        const backendReady = fetch(`${API_URL}/api/navbar`)
            .catch(() => {}) // a failed request must not block the site
            .then(() => {});

        Promise.all([pageReady, backendReady]).then(finish);
        const failSafe = setTimeout(finish, MAX_WAIT_MS);

        return () => clearTimeout(failSafe);
    }, []);

    // Lock scrolling while the splash is up
    useEffect(() => {
        document.body.style.overflow = visible ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [visible]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="app-loader"
                    role="status"
                    aria-live="polite"
                    aria-label={`${loadingText} Devora`}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="font-heading text-4xl font-bold text-white md:text-5xl"
                    >
                        <motion.span
                            className="text-teal"
                            animate={{ opacity: [1, 0.45, 1] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            D
                        </motion.span>
                        evora
                    </motion.div>

                    {/* Indeterminate progress bar */}
                    <div className="mt-8 h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                            className="h-full w-1/2 rounded-full bg-teal"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate">{loadingText}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
