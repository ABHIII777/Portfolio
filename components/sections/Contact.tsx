"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { ArrowUpRight, FileText } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

const EMAIL = site.links.email.replace("mailto:", "");

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio enquiry${name ? ` from ${name}` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus("Your email app should open with the message ready to send.");
  }

  return (
    <section id="contact" aria-label="Contact" className="section-pad border-t border-line">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">05 / Contact</p>
            <h2 className="mt-3 font-display text-display font-semibold leading-[0.88] tracking-[-0.055em] text-ink">
              Let&apos;s talk.
            </h2>

            <p className="measure mt-6 text-base leading-relaxed text-ink-soft">
              Whether it&apos;s a full-time role or a freelance project, my inbox
              is open. Tell me what you&apos;re building and I&apos;ll come back
              with a straight answer.
            </p>

            <a
              href={site.links.email}
              className="link-line mt-8 inline-flex text-lead text-ink hover:text-accent"
            >
              {EMAIL}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line text-sm text-ink-soft hover:text-ink"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
                LinkedIn
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line text-sm text-ink-soft hover:text-ink"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href={site.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line text-sm text-ink-soft hover:text-ink"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Resume
              </a>
            </div>

            <dl className="mt-10 grid max-w-sm grid-cols-2 gap-4 border-t border-line pt-5">
              <div>
                <dt className="eyebrow">Based in</dt>
                <dd className="mt-1 text-sm text-ink">{site.location}</dd>
              </div>
              <div>
                <dt className="eyebrow">Timezone</dt>
                <dd className="mt-1 text-sm text-ink">{site.timezone}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="field">
                <label
                  htmlFor="contact-name"
                  className="eyebrow"
                >
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ada Lovelace"
                />
              </div>

              <div className="field">
                <label htmlFor="contact-email" className="eyebrow">
                  Email address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                />
              </div>

              <div className="field">
                <label htmlFor="contact-message" className="eyebrow">
                  What do you have in mind?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="A role, a project, or a problem worth solving."
                />
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-between gap-4 bg-accent px-5 py-4 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-85 sm:w-auto sm:min-w-[16rem]"
              >
                Create email draft
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>

              <p
                className="font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.08em] text-ink-soft"
                role="status"
                aria-live="polite"
              >
                {status ||
                  "This opens your email app with the message ready to send. Nothing is stored."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
