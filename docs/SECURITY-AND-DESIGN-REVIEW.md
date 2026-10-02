# Shadow Biome: security and interface review

Reviewed 2026-10-02 against main commit `3b3acd6b385c67936afb52b658d527c0830af67c`.

## Findings and remediation

| Finding | Exposure and severity | Change |
| --- | --- | --- |
| Vulnerable `brace-expansion` dependency versions | npm classified one dependency as high severity for CPU/stack exhaustion. It is in development tooling; no remotely reachable production exploit was demonstrated. | Patched to 1.1.21 and 5.0.12. Full and production-only audits now report zero known advisories. |
| No content security, MIME, referrer, or capability policy | Browser hardening gap, not proof of a compromise. | Added CSP, `nosniff`, referrer policy, and permissions policy in both Vercel config and SSR middleware. Preserved Grok branding and preview integration. |
| Saved reports trusted arbitrary JSON | Malformed browser-local records could crash rendering or supply invalid map coordinates. This requires control of local storage; it is not an unauthenticated server endpoint. | Validate records with Zod, strip unknown fields, constrain coordinates and lengths, ignore malformed records, cap total data. |
| Photo URLs were unrestricted | Tampered local records could load external tracking images or unintended URL schemes. This was not demonstrated as executable XSS in an image element. | Allow only bounded JPEG, PNG, and WebP base64 data; reject SVG and remote URLs. Validate uploads and handle reader errors. |
| Storage failures escaped the form handler | Full/disabled storage could make saving fail without a useful message. | Catch quota errors, preserve the form, and show an accessible error message. |
| Field-note reload hydration mismatch | Server rendered an empty archive while the first client render read saved notes. | Read the archive after hydration, with consistent initial markup. |
| Lockfile not installable with `npm ci` | Missing AJV and JSON schema entries prevented reproducible clean installation. | Repaired the npm lockfile while preserving the dependency architecture. |
| `/sands` absent from generated route typings | Initial type check failed despite the route source existing. | Regenerated the route tree through the normal framework build. |

No obvious hardcoded credential patterns were found in active application source.
The atlas exposes no application-authored server mutation or upload endpoints;
field notes remain browser-local. This is a source/dependency/browser review,
not a penetration test, and zero advisories is not a guarantee of zero vulnerabilities.

## Remaining trust boundaries

The platform's required Grok branding script still executes with page privileges.
Any trusted third-party script can access browser-local notes. Keep sensitive
personal information out of those notes. CSP restricts script origins but permits
inline scripts for TanStack hydration; nonce/hash-based enforcement is a future
framework-level improvement. Preview framing remains allowed for Grok origins.

The existing strobe is opt-in and carries a photosensitivity warning. Its flashing
behavior was preserved and was not triggered in visual QA.

## Visual and mobile changes

- Three.js Earth with local geographic texture, lit land/oceans, atmospheric rim,
  coordinate grid, orbital reference ring, and adjustable 20–100% opacity.
- Great-circle connection arcs, raised node markers, radial leader lines, and
  restrained labels. Proposed networks remain explicitly labeled as hypotheses.
- Orbit/pinch interaction plus keyboard-accessible focus, zoom, reset, rotation,
  map-mode, and layer controls. Selected records link to existing dossiers.
- Mobile globe framing, 44 px main control targets, expandable controls outside
  the globe, accessible navigation state, and a preserved 2D atlas fallback.
- Local licensed fonts and optimized WebP imagery; no runtime texture/font CDN.
- Lazy-loaded renderer; batched geographic lines; capped pixel ratio and 30 fps;
  offscreen/background pause, reduced-motion support, and GPU resource disposal.
  Unchanged frames are skipped; opacity/rotation changes reuse overlay geometry.

## Validation

`npm run build`, `npm run typecheck`, `npm run test:security`, and dependency
audits pass. The security suite covers malformed records, coordinate boundaries,
photo URL schemes, storage-size limits, and invalid dates.

The automated atlas suite checks development and production at 320, 390, 768,
1024, and 1440 px: no horizontal overflow, layer controls, opacity, focus,
zoom, rotation, 2D/3D switching, mobile navigation, and saved-note reload/removal.
The final browser matrix is recorded in `docs/atlas-validation.json`. Desktop and
mobile screenshots were visually reviewed.

Local browser QA isolates only the required external branding script because the
sandbox proxy certificate is not trusted by Chromium. Application assets, Three.js,
SSR, hydration, and application behavior are real. Live deployment inspection is
separate. Browser emulation does not establish frame rate or battery usage on a
physical iPhone.

The repository-wide `npm test` includes Grok platform fixture tests referencing
ignored `.grok/skills` and `.grok/app-env.json` files that were not exported to
GitHub. Those checks fail in this checkout; the application build/type checks and
the focused security/atlas suites are the validation gates for this change.

## Reproduce

```sh
npm ci
npm run build
npm run typecheck
npm run test:security
npm audit
npm run preview
# In another terminal, after installing Playwright Chromium:
ATLAS_QA_ISOLATE_BRANDING=1 npm run test:atlas
```

Omit `ATLAS_QA_ISOLATE_BRANDING` for a network-enabled integration run that includes
the platform script. `ATLAS_QA_URLS` accepts comma-separated development/production
URLs. `PLAYWRIGHT_CHROMIUM_EXECUTABLE` is optional for an existing browser binary.
