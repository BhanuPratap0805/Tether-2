/**
 * SkyBackground — the app's signature atmosphere.
 * Three cloud layers drift at different speeds/directions using pure CSS
 * transforms (GPU-accelerated, no JS per-frame work) so it never feels laggy,
 * even on low-power devices. Each layer is a seamlessly tiled SVG cloud strip.
 */
function CloudStrip({ opacity = 1 }: { opacity?: number }) {
  return (
    <svg
      viewBox="0 0 1200 220"
      preserveAspectRatio="none"
      className="w-full h-auto"
      style={{ opacity }}
      aria-hidden="true"
    >
      <g fill="currentColor">
        <ellipse cx="120" cy="120" rx="140" ry="46" />
        <ellipse cx="230" cy="95" rx="110" ry="40" />
        <ellipse cx="360" cy="130" rx="160" ry="50" />
        <ellipse cx="560" cy="100" rx="120" ry="42" />
        <ellipse cx="700" cy="135" rx="150" ry="48" />
        <ellipse cx="880" cy="105" rx="130" ry="44" />
        <ellipse cx="1040" cy="125" rx="150" ry="48" />
      </g>
    </svg>
  );
}

export default function SkyBackground() {
  return (
    <div className="sky-scene" aria-hidden="true">
      <div className="cloud-layer layer-1 text-sky-100">
        <CloudStrip />
      </div>
      <div className="cloud-layer layer-2 text-teal-400">
        <CloudStrip />
      </div>
      <div className="cloud-layer layer-3 text-sky-300">
        <CloudStrip />
      </div>
    </div>
  );
}
