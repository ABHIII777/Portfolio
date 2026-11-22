import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import fs from "fs";
import path from "path";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = fs.readFileSync(
    path.join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#08090b",
          padding: "80px",
          color: "#f5f4f0",
          fontFamily: "Geist, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: "#d8ff3e",
            }}
          />
          <span
            style={{
              fontSize: "22px",
              color: "#bdbcb6",
              letterSpacing: "2px",
              fontFamily: "monospace",
            }}
          >
            FULL STACK ENGINEER
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "68px",
              fontWeight: 900,
              color: "#f5f4f0",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {site.name}
          </h1>
          <p
            style={{
              fontSize: "30px",
              fontWeight: 600,
              color: "#d8ff3e",
              margin: 0,
            }}
          >
            {site.role}
          </p>
          <p
            style={{
              fontSize: "22px",
              color: "#bdbcb6",
              margin: 0,
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            {site.pitch}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "28px",
            fontSize: "18px",
            color: "#bdbcb6",
            fontFamily: "monospace",
          }}
        >
          <span>Location: {site.location}</span>
          <span>·</span>
          <span>Status: {site.availability}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
