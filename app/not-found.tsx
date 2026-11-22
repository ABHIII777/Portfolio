import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[80vh] flex-col justify-center pt-16">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 max-w-3xl font-display text-hero font-semibold leading-[0.86] tracking-[-0.06em] text-ink">
        You took a wrong turn.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
        This page doesn&apos;t exist — or it moved. The portfolio is still one
        click away.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex w-fit items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-85"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to the portfolio
      </Link>
    </div>
  );
}
