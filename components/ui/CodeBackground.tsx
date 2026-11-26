"use client";

import { useEffect, useRef } from "react";
import { site, experiences, projects } from "@/content/site";

const code = `const abhi = {
  name: "${site.name}",
  role: "${site.role}",
  location: "${site.location}",
  timezone: "${site.timezone}",
  status: "${site.availability}",
  focus: ["distributed systems", "interfaces", "performance"],
  experience: [
${experiences
  .map(
    (job) =>
      `    { role: "${job.role}", company: "${job.company}", since: "${job.start}" }`
  )
  .join(",\n")}
  ],
  projects: {
${projects.map((project) => `    ${project.name}: "${project.tagline}"`).join(",\n")}
  },
  links: {
    email: "${site.links.email.replace("mailto:", "")}",
    github: "${site.links.github}",
    linkedin: "${site.links.linkedin}"
  }
};`;

const wallpaper = Array.from({ length: 4 }, () => code).join("\n\n");
const columns = [0, 1, 2];

/**
 * Site-wide code wallpaper. The base copy is barely visible; a second copy is
 * revealed through a soft circle that follows the pointer, so reading the code
 * under the cursor feels like a small discovery rather than page decoration.
 */
export function CodeBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const paint = () => {
      frame = 0;
      node.style.setProperty("--code-x", `${pointerX}px`);
      node.style.setProperty("--code-y", `${pointerY}px`);
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

    const onLeave = () => {
      node.dataset.active = "false";
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div className="site-code" ref={ref} aria-hidden="true">
      <div className="site-code-layer site-code-base">
        {columns.map((column) => (
          <pre key={column} className="site-code-stream">
            {wallpaper}
          </pre>
        ))}
      </div>
      <div className="site-code-layer site-code-glow">
        {columns.map((column) => (
          <pre key={column} className="site-code-stream">
            {wallpaper}
          </pre>
        ))}
      </div>
    </div>
  );
}
