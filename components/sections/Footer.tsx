import Link from "next/link";
import { site } from "@/content/site";
import { FooterScene } from "@/components/ui/FooterScene";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { ArrowUp, FileText } from "lucide-react";

const FOOTER_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

const EMAIL = site.links.email.replace("mailto:", "");
const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/30">
      <div className="wrap py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Explore</p>
            <nav
              className="mt-4 flex flex-col items-start gap-1.5"
              aria-label="Footer navigation"
            >
              {FOOTER_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="link-line text-sm text-ink-soft hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow">Get in touch</p>
            <a
              href={site.links.email}
              className="link-line mt-4 inline-flex text-sm text-ink hover:text-accent"
            >
              {EMAIL}
            </a>

            <div className="mt-5 flex items-center gap-3">
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-accent"
                aria-label="GitHub"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-accent"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={site.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-3.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-ink hover:text-accent"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Resume
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:text-right">
            <p className="eyebrow">Availability</p>
            <p className="mt-4 text-sm leading-relaxed text-ink">
              {site.availability}
            </p>
            <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-soft">
              {site.location} / {site.timezone}
            </p>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <p className="footer-wordmark text-ink">
            {site.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </p>

          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-4">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-soft">
              {site.role}
            </p>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-soft">
              © {year} / All rights reserved
            </p>
          </div>
        </div>

        <FooterScene />

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink-soft">
            Built with Next.js &amp; Tailwind
          </p>

          <a
            href="#hero"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-accent"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
