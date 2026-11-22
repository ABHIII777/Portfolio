"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { FileText, Menu, X, ArrowUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./Icons";

const NAV_ITEMS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const EMAIL = site.links.email.replace("mailto:", "");

export function Nav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-50">
        <div className="wrap flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-ink"
            aria-label={`${site.name}, home`}
          >
            {site.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={site.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 border border-line bg-surface px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink hover:text-accent sm:inline-flex"
            >
              <FileText className="h-3 w-3" aria-hidden="true" />
              Resume
              <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden="true" />
            </a>

            <ThemeToggle />

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink hover:text-accent"
              aria-label="Open navigation menu"
              aria-haspopup="dialog"
              aria-controls="site-menu"
              aria-expanded={open}
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="site-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[70] overflow-y-auto bg-canvas"
        >
          <div className="wrap flex min-h-full flex-col py-6">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Menu</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-ink"
                aria-label="Close navigation menu"
              >
                Close
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink">
                  <X className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </div>

            <nav className="mt-10 md:mt-16" aria-label="Site navigation">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline justify-between gap-6 border-b border-line py-3 md:py-4"
                >
                  <span className="font-display text-[clamp(2.2rem,7vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink transition-colors group-hover:text-accent">
                    {item.label}
                  </span>
                  <span className="font-mono text-[0.65rem] text-ink-soft">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto grid gap-8 pt-12 sm:grid-cols-2 sm:items-end">
              <div>
                <p className="eyebrow mb-2">Email</p>
                <a
                  href={site.links.email}
                  className="link-line text-base text-ink sm:text-lg"
                >
                  {EMAIL}
                </a>
              </div>

              <div className="sm:text-right">
                <p className="eyebrow mb-3">Elsewhere</p>
                <div className="flex gap-3 sm:justify-end">
                  <a
                    href={site.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-accent"
                    aria-label="GitHub"
                  >
                    <GitHubIcon className="h-[18px] w-[18px]" />
                  </a>
                  <a
                    href={site.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-accent"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="h-[18px] w-[18px]" />
                  </a>
                  <a
                    href={site.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-ink hover:text-accent"
                  >
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
