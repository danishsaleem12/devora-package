"use client";

import { motion } from "framer-motion";

function GroupCard({ group, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-7"
        >
            <div className="flex items-center justify-between">
                <p className="font-mono text-xs tracking-widest text-teal">
                    {group.label.toUpperCase()}
                </p>
                <span className="font-mono text-xs text-slate/40">
                    {String(index + 1).padStart(2, "0")}
                </span>
            </div>

            <ul className="mt-5 divide-y divide-black/5">
                {group.items.map((item) => (
                    <li key={item.name} className="group/item flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal/40 transition-all duration-300 group-hover/item:scale-150 group-hover/item:bg-teal" />
                        <div>
                            <p className="text-sm font-semibold text-ink">{item.name}</p>
                            <p className="mt-1 text-xs leading-relaxed text-slate">{item.note}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

export default function ServiceTechStack({ service }) {
    const data = service.techStack;
    if (!data?.groups?.length) return null;

    return (
        <section className="bg-[#fafafa] p-2 sm:p-3 lg:p-4">
            <div className="relative mx-auto max-w-none overflow-hidden rounded-[2rem] border border-black/5 bg-[#f4f5f7] p-5 shadow-sm sm:p-6 lg:p-8 xl:p-10">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="pointer-events-none absolute -top-32 left-0 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

                <div className="relative text-ink">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl"
                    >
                        <p className="font-mono text-xs tracking-widest text-teal">{data.eyebrow}</p>
                        <h2 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                            {data.heading}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-slate">{data.subheading}</p>
                    </motion.div>

                    <div
                        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:[grid-template-columns:repeat(var(--groups),minmax(0,1fr))]"
                        style={{ "--groups": Math.min(data.groups.length, 4) }}
                    >
                        {data.groups.map((group, i) => (
                            <GroupCard key={group.label} group={group} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}