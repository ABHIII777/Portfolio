"use client";

import { useEffect, useRef, useState } from "react";
import { projects, site, type Project } from "@/content/site";
import { ArrowUpRight, X } from "lucide-react";
import { GitHubIcon } from "@/components/ui/Icons";

const FOLDER_TINTS = [
  "folder-tint-lime",
  "folder-tint-clay",
  "folder-tint-slate",
];

export function Work() {
  const [selected, setSelected] = useState<Project | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const previouslySelected = useRef<Project | null>(null);

  const selectedIndex = selected
    ? projects.findIndex((project) => project.slug === selected.slug)
    : -1;

  useEffect(() => {
    if (!selected) {
      if (previouslySelected.current) {
        triggerRef.current?.focus();
      }
      previouslySelected.current = null;
      return;
    }

    previouslySelected.current = selected;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    panelRef.current?.focus({ preventScroll: true });
    panelRef.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, [selected]);

  function toggle(project: Project, element: HTMLButtonElement) {
    triggerRef.current = element;
    setSelected((current) => (current?.slug === project.slug ? null : project));
  }

  function close() {
    setSelected(null);
  }

  return (
    <section id="work" aria-label="Featured projects" className="section-pad">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">03 / Selected work</p>
            <h2 className="mt-3 font-display text-display font-semibold leading-[0.88] tracking-[-0.055em] text-ink">
              Featured
              <br />
              Projects
            </h2>
          </div>

          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-soft hover:text-ink"
          >
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <p className="measure mt-6 text-sm leading-relaxed text-ink-soft sm:text-base">
          Independent projects and professional work. Open a folder to explore a
          project or case study.
        </p>

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const isOpen = selected?.slug === project.slug;

            return (
              <button
                key={project.slug}
                type="button"
                onClick={(event) => toggle(project, event.currentTarget)}
                aria-expanded={isOpen}
                aria-controls="project-details"
                className="folder-card group"
              >
                <span className="folder-scene" aria-hidden="true">
                  <span className="folder-back" />

                  <span className="folder-paper folder-paper-back">
                    <span className="folder-paper-meta">
                      Case study / {project.period}
                    </span>
                    <span className="folder-paper-lines" />
                  </span>

                  <span className="folder-paper folder-paper-front">
                    <span className="folder-paper-title">{project.name}</span>
                    <span className="folder-paper-meta">{project.role}</span>
                    <span className="folder-paper-lines" />
                  </span>

                  <span
                    className={`folder-front ${FOLDER_TINTS[index % FOLDER_TINTS.length]}`}
                  >
                    <span className="folder-front-title">
                      <span>{project.name}</span>
                      <ArrowUpRight
                        className="mt-0.5 h-4 w-4 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="folder-front-foot">
                      <span>{project.role}</span>
                      <span>{isOpen ? "Close" : "Open"}</span>
                    </span>
                  </span>
                </span>

                <span className="folder-caption">
                  <span className="text-ink-soft">{project.tagline}</span>
                  <span className="folder-caption-action">
                    {isOpen ? "Close" : "Read"}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {selected && (
          <div
            id="project-details"
            ref={panelRef}
            tabIndex={-1}
            role="region"
            aria-labelledby="project-details-title"
            className="project-panel mt-14 scroll-mt-24 border border-line bg-surface/50 focus:outline-none"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
              <p className="eyebrow">
                Project details / {String(selectedIndex + 1).padStart(2, "0")}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-accent"
                aria-label="Close project details"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-10 p-5 md:p-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h3
                  id="project-details-title"
                  className="font-display text-title font-semibold leading-[0.95] tracking-[-0.04em] text-ink"
                >
                  {selected.name}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  {selected.tagline}
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line">
                  <div className="bg-canvas p-3">
                    <dt className="eyebrow">Role</dt>
                    <dd className="mt-1 text-sm leading-snug text-ink">
                      {selected.role}
                    </dd>
                  </div>
                  <div className="bg-canvas p-3">
                    <dt className="eyebrow">Period</dt>
                    <dd className="mt-1 text-sm leading-snug text-ink">
                      {selected.period}
                    </dd>
                  </div>
                  <div className="bg-canvas p-3">
                    <dt className="eyebrow">Ownership</dt>
                    <dd className="mt-1 text-sm leading-snug text-ink">
                      End to end
                    </dd>
                  </div>
                  <div className="bg-canvas p-3">
                    <dt className="eyebrow">Status</dt>
                    <dd className="mt-1 text-sm leading-snug text-ink">
                      Shipped
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {selected.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-line bg-canvas px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.06em] text-ink-soft"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {selected.live && (
                    <a
                      href={selected.live}
                      target={
                        selected.live.startsWith("#") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      onClick={close}
                      className="inline-flex items-center gap-2 bg-ink px-4 py-2 text-xs font-semibold text-canvas transition-opacity hover:opacity-80"
                    >
                      Open live project
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {selected.source && (
                    <a
                      href={selected.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-line px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-ink hover:text-accent"
                    >
                      <GitHubIcon className="h-3.5 w-3.5" />
                      Source
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-8 lg:col-span-7">
                <section>
                  <h4 className="eyebrow">The problem</h4>
                  <p className="mt-2 text-base leading-relaxed text-ink-soft">
                    {selected.problem}
                  </p>
                </section>

                <section>
                  <h4 className="eyebrow">My approach</h4>
                  <ol className="mt-3 space-y-4">
                    {selected.approach.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="mt-0.5 font-mono text-[0.65rem] text-ink-soft">
                          0{index + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-ink-soft">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="border-t border-line pt-6">
                  <h4 className="eyebrow">The outcome</h4>
                  <p className="mt-2 text-base leading-relaxed text-ink">
                    {selected.outcome}
                  </p>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
