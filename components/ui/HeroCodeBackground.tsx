"use client";

import { useEffect, useRef } from "react";

type HeroCodeBackgroundProps = {
  code: string;
};

/**
 * The low-contrast code wallpaper behind the hero. A second copy of the same
 * code is masked to a soft circle that follows the pointer, revealing the
 * lines directly under the cursor without disturbing the surrounding page.
 */
export function HeroCodeBackground({ code }: HeroCodeBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const hero = node?.closest<HTMLElement>("section");
    if (!node || !hero) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const paint = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      node.style.setProperty("--code-x", `${pointerX - rect.left}px`);
      node.style.setProperty("--code-y", `${pointerY - rect.top}px`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      node.dataset.active = "true";
      schedule();
    };

    const onPointerLeave = () => {
      node.dataset.active = "false";
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const onScroll = () => {
      if (node.dataset.active === "true") schedule();
    };

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="hero-code" ref={ref} aria-hidden="true">
      <pre className="hero-code-layer hero-code-base p-6 md:p-10">
        {code}
      </pre>
      <pre className="hero-code-layer hero-code-glow p-6 md:p-10">
        {code}
      </pre>
    </div>
  );
}
