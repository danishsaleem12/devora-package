"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function Card({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-2xl border border-slate/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="h-1 w-full bg-teal" />
      <div className="p-5">
        <p className="font-mono text-xs tracking-widest text-teal">{item.label}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate">{item.text}</p>
      </div>
    </motion.div>
  );
}

export default function MissionVision() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/mission-vision`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section className="bg-white px-6 py-12">
        <p className="mx-auto max-w-6xl text-sm text-slate">
          Could not load this section: {error}. Is the backend running on {API_URL}?
        </p>
      </section>
    );
  }
  if (!data) return <section className="h-[360px] bg-white" />;

  return (
    <section className="bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-paper p-5 sm:p-6"
        >
          <p className="font-mono text-xs tracking-widest text-teal">{data.eyebrow}</p>
          <h2 className="mt-1.5 font-heading text-2xl font-bold leading-tight text-navy sm:text-3xl">
            {data.heading}
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data.items.map((item, i) => (
              <Card key={item.label} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}