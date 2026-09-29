# ──────────────────────────────────────────────────────────────────────────────
# SECURITY NOTES — HN Studio
# ──────────────────────────────────────────────────────────────────────────────
# Run: npm audit --audit-level=high
# Last audited: 2026-09-28
#
# Known issues (transitive dev dependencies — NOT runtime):
#
# 1. adm-zip ≤0.6.0 (HIGH)
#    Path: sanity → @sanity/cli → @sanity/runtime-cli → adm-zip
#    Impact: Sanity CLI only (used for `sanity dev/deploy`, not Next.js runtime)
#    Fix: Would require sanity@6.x (breaking). Monitor Sanity releases.
#    Exploit requires: local file system access / attacker-controlled ZIP upload
#    Production risk: NONE (Sanity CLI is not deployed to production)
#
# 2. uuid < 11.1.1 (MODERATE)
#    Path: sanity → @sanity/preview-url-secret → @sanity/uuid → uuid
#    Impact: Preview URL secret generation only (draft/preview mode)
#    Fix: Would require next-sanity@13.x (breaking). Monitor next-sanity releases.
#    Production risk: LOW (preview mode is not enabled in current production config)
#
# Both issues are limited to the Sanity toolchain and do not affect the
# Next.js application runtime, browser bundle, or server actions.
#
# Actions taken:
# - Production build excludes Sanity CLI (@sanity/cli is devDependency)
# - useCdn: true in sanity client (no direct API contact in runtime)
# - Middleware CSP blocks unexpected external connections
# - Will revisit when Sanity releases a non-breaking fix
# ──────────────────────────────────────────────────────────────────────────────
