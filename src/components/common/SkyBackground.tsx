import Cloudscape from './Cloudscape';

/**
 * SkyBackground — the app's signature atmosphere.
 * A single WebGL Cloudscape layer renders a soft, slowly-morphing cloud
 * field in a bright sky-blue palette with light, complementary clouds.
 * Mounted once in AppShell as a fixed, full-viewport layer (see
 * `.sky-scene` in styles/index.css) so it sits behind every route —
 * landing, auth, and the whole dashboard.
 */
export default function SkyBackground() {
  return (
    <div className="sky-scene" aria-hidden="true">
      <Cloudscape
        colorBottom="#4A7A9E"
        colorMid="#A9C7DE"
        colorTop="#F3F8FC"
        speed={0.12}
        height="100%"
        className="absolute inset-0"
      />
    </div>
  );
}
