import type { Metadata } from "next";
import Link from "next/link";
import { site, journeyTimeline } from "@/content/site";
import { Portrait } from "@/components/ui/Portrait";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: `About · ${site.name}`,
  description:
    "Background, projects, and approach to full-stack engineering and applied machine learning.",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <div className="wrap section-pad">
        <Link
          href="/"
          className="link-line font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-soft hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to portfolio
        </Link>

        <div className="mt-12 grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">About / Philosophy</p>
            <h1 className="mt-4 font-display text-hero font-semibold leading-[0.86] tracking-[-0.06em] text-ink">
              Engineering,
              <br />
              with a bias
              <br />
              for craft.
            </h1>
            <p className="measure mt-7 text-lead leading-snug text-ink-soft">
              I&apos;m a computer science student and full-stack engineer who
              likes understanding how things work below the framework — from
              HTTP framing and database schemas to the models behind a
              prediction.
            </p>
          </div>

          <div className="w-full max-w-[16rem] justify-self-start lg:col-span-3 lg:col-start-10 lg:justify-self-end">
            <Portrait rotate="rotate-[2deg]" />
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-line pt-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">01 / Philosophy</p>
            <h2 className="mt-3 font-display text-title font-semibold leading-[0.95] tracking-[-0.04em] text-ink">
              Quality shows up at the edges.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-ink-soft lg:col-span-7 lg:col-start-6">
            <p>
              Software quality is revealed at the edges: how a server handles a
              malformed request, what happens when a relationship in the schema
              does not match the domain, or how a model behaves on the class it
              saw least often.
            </p>
            <p>
              My default approach is to keep data models explicit, write code I
              can reason about, and learn the protocol before reaching for the
              library. Whether that&apos;s a Go server, a PostgreSQL schema, or a
              PyTorch experiment, I aim for solutions that are understandable
              and easy to maintain.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2">
          <div className="bg-canvas p-6 sm:p-8">
            <p className="eyebrow">02 / What I value</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
              <li className="border-b border-line pb-3">
                Understanding the fundamentals before the framework
              </li>
              <li className="border-b border-line pb-3">
                Clear documentation and reproducible build steps
              </li>
              <li className="border-b border-line pb-3">
                Data models that match the domain
              </li>
              <li>Interfaces that stay responsive and accessible</li>
            </ul>
          </div>

          <div className="bg-canvas p-6 sm:p-8">
            <p className="eyebrow">03 / Continuous research</p>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              Currently going deeper into reinforcement learning, deep learning
              in Python, and protocol-level systems work in Go.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              I keep a running list of small experiments. Some become projects;
              most become better instincts.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-line pt-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">04 / The flourish</p>
            <h2 className="mt-3 font-display text-title font-semibold leading-[0.95] tracking-[-0.04em] text-ink">
              Curiosity, applied.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-base leading-relaxed text-ink-soft">
              I learn best by rebuilding things from scratch: an HTTP server
              without net/http, a genre classifier from raw audio, a typing tool
              built around real code. Most of these start as a question and end
              as a project.
            </p>
          </div>
        </div>

        {/* The Journey Section */}
        <div className="mt-16 border-t border-line pt-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">05 / Journey</p>
              <h2 className="mt-3 font-display text-title font-semibold leading-[0.95] tracking-[-0.04em] text-ink">
                How I got here.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Key milestones from computer science foundations to full-stack
                products and applied ML.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6 space-y-8">
              {journeyTimeline.map((step, idx) => (
                <div key={idx} className="border-l border-line pl-6 relative">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-accent" />
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-mono text-xs text-accent font-semibold">{step.year}</span>
                    <span className="text-xs text-ink-soft font-mono">· {step.location}</span>
                  </div>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{step.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-85"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <a
            href={site.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line text-sm text-ink-soft hover:text-ink"
          >
            Download resume PDF
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
