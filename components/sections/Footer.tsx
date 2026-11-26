import Link from "next/link";
import { site } from "@/content/site";
import { FooterScene } from "@/components/ui/FooterScene";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

const EMAIL = site.links.email.replace("mailto:", "");
const [roleA, roleB] = site.role.split(" & ");
const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top wrap">
        <div className="footer-identity">
          <h2>
            {site.name.split(" ")[0]}
            <span className="footer-dot">.</span>
          </h2>
          <p>
            {roleA} &amp;
            <br />
            {roleB}.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <p>Explore</p>
          <div>
            {FOOTER_LINKS.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="footer-contact">
          <p>Get in touch</p>
          <a className="footer-email" href={site.links.email}>
            {EMAIL}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <div className="footer-socials">
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href={site.links.resume} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </div>

          <span>
            © {year} {site.name} · {site.location}
          </span>
        </div>
      </div>

      <div className="footer-finale">
        <div className="footer-finale-heading wrap">
          <p>See you around.</p>
          <a href="#hero">
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <FooterScene />

        <div className="footer-scene-bottom wrap">
          <small>Finally, some traffic around here.</small>
          <small>Built with Next.js &amp; Tailwind</small>
        </div>
      </div>
    </footer>
  );
}
