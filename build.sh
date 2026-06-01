#!/usr/bin/env bash
# ══════════════════════════════════════════════════
# build.sh — Injects credentials into index.html
# ══════════════════════════════════════════════════
#
# USAGE:
#   chmod +x build.sh
#   ./build.sh
#
# WHAT IT DOES:
#   1. Reads .env.local for credentials
#   2. Copies index.template.html → index.html
#   3. Replaces __SUPA_URL__ and __SUPA_KEY__ placeholders
#
# WORKFLOW:
#   - Edit/commit:  index.template.html  (has placeholders)
#   - Never commit: index.html           (has real values)
#   - Never commit: .env.local           (has real credentials)
# ══════════════════════════════════════════════════

set -e  # Exit immediately on any error

# ── Load environment variables ─────────────────────
ENV_FILE=".env.local"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌  $ENV_FILE not found."
  echo "    Run: cp .env.example .env.local"
  echo "    Then fill in your real Supabase credentials."
  exit 1
fi

# Source the env file (supports KEY=value format)
export $(grep -v '^#' "$ENV_FILE" | grep -v '^$' | xargs)

# ── Validate required variables ───────────────────
if [ -z "$SUPA_URL" ] || [ "$SUPA_URL" = "https://your-project-id.supabase.co" ]; then
  echo "❌  SUPA_URL is not set or still has the placeholder value."
  echo "    Edit .env.local and set your real Supabase project URL."
  exit 1
fi

if [ -z "$SUPA_KEY" ] || [ "$SUPA_KEY" = "your-anon-public-key-here" ]; then
  echo "❌  SUPA_KEY is not set or still has the placeholder value."
  echo "    Edit .env.local and set your real Supabase anon key."
  exit 1
fi

# ── Check template file exists ─────────────────────
TEMPLATE="index.template.html"
OUTPUT="index.html"

if [ ! -f "$TEMPLATE" ]; then
  echo ""
  echo "⚠️   $TEMPLATE not found."
  echo "    If you haven't renamed your file yet:"
  echo "      cp index.html index.template.html"
  echo "    Then replace the hardcoded credential values in"
  echo "    index.template.html with __SUPA_URL__ and __SUPA_KEY__"
  echo ""
  echo "    Alternatively, if you just want to patch index.html in-place:"
  echo "      sed -i \"s|__SUPA_URL__|$SUPA_URL|g\" index.html"
  echo "      sed -i \"s|__SUPA_KEY__|$SUPA_KEY|g\" index.html"
  exit 1
fi

# ── Inject credentials ────────────────────────────
cp "$TEMPLATE" "$OUTPUT"

# macOS sed requires an empty string after -i; Linux does not
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s|__SUPA_URL__|$SUPA_URL|g" "$OUTPUT"
  sed -i '' "s|__SUPA_KEY__|$SUPA_KEY|g" "$OUTPUT"
else
  sed -i "s|__SUPA_URL__|$SUPA_URL|g" "$OUTPUT"
  sed -i "s|__SUPA_KEY__|$SUPA_KEY|g" "$OUTPUT"
fi

# ── Verify injection worked ───────────────────────
if grep -q "__SUPA_URL__\|__SUPA_KEY__" "$OUTPUT"; then
  echo "❌  Injection failed — placeholders still present in $OUTPUT."
  echo "    Check that index.template.html contains the exact strings:"
  echo "      content=\"__SUPA_URL__\""
  echo "      content=\"__SUPA_KEY__\""
  rm "$OUTPUT"
  exit 1
fi

echo "✅  Built successfully: $OUTPUT"
echo "    Supabase URL: ${SUPA_URL:0:40}…"
echo "    Anon key:     ${SUPA_KEY:0:20}…"
echo ""
echo "⚠️   $OUTPUT is in .gitignore — do NOT commit it."
echo "    Push index.template.html instead."
