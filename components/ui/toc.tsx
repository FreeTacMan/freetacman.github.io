"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TocItem = {
  id: string;
  label: string;
};

export function TOC({
  items,
  offset = 96,
  className,
}: {
  items: TocItem[];
  offset?: number;
  className?: string;
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  const ids = useMemo(() => items.map((i) => i.id), [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      {
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value;
    if (!target) return;
    const el = document.getElementById(target);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.history.pushState(null, "", `#${target}`);
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className={className}>
      {/* Desktop vertical nav */}
      <nav className="hidden md:block">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={
                  "transition-colors " +
                  (active === item.id ? "text-[#174BE5] font-semibold" : "hover:text-[#174BE5]")
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile dropdown */}
      <div className="md:hidden w-full">
        <select
          className="w-full border rounded-md p-2 bg-background"
          value={active}
          onChange={handleSelectChange}
        >
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}


