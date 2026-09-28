#!/usr/bin/env bash
# Captures matched screenshots of the reference (static server) and the Next.js app
# at the same viewports so they can be compared side by side.
#   scripts/capture-parity.sh <reference-origin> <next-origin>
#   e.g. scripts/capture-parity.sh http://localhost:4332 http://localhost:4333
#
# Headless Chrome refuses window widths under ~500px, so the 390px REFERENCE captures load
# the page inside a 390×844 iframe on a wrapper document and crop to the frame (a true
# 390px viewport; a bare --window-size=390 is not). The Next.js app sends
# X-Frame-Options: SAMEORIGIN, so it cannot be framed from a file:// wrapper: its mobile
# captures are taken in the desktop app's browser pane (mobile preset) instead and saved
# alongside these by hand. Desktop captures are fully automated for both sides.
set -euo pipefail
REF="${1:-http://localhost:4332}"
NEXT="${2:-http://localhost:4333}"
CH="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/design-reference/parity/$(date +%Y-%m-%d)"
TMP="$(mktemp -d)"
mkdir -p "$OUT"
ROUTES=("index:/" "services:/services" "pricing:/pricing" "find-your-coverage:/find-your-coverage" "contact:/contact" "who-we-serve:/who-we-serve" "about:/about" "privacy-policy:/privacy-policy")

shot_desktop() { "$CH" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900 --screenshot="$2" "$1" >/dev/null 2>&1; }
shot_mobile() {
  local wrapper="$TMP/$(basename "$2" .png).html"
  printf '<!doctype html><body style="margin:0"><iframe src="%s" style="border:0;width:390px;height:844px;display:block"></iframe></body>' "$1" > "$wrapper"
  "$CH" --headless=new --disable-gpu --hide-scrollbars --window-size=600,844 --screenshot="$TMP/raw.png" "file://$wrapper" >/dev/null 2>&1
  python3 -c "from PIL import Image; Image.open('$TMP/raw.png').crop((0,0,390,844)).save('$2')"
}

for pair in "${ROUTES[@]}"; do
  name="${pair%%:*}"; route="${pair#*:}"
  shot_desktop "$REF/$name.html" "$OUT/$name-1440-reference.png"
  shot_desktop "$NEXT$route"     "$OUT/$name-1440-next.png"
  shot_mobile  "$REF/$name.html" "$OUT/$name-390-reference.png"
done
rm -rf "$TMP"
echo "captures in $OUT"
ls "$OUT" | wc -l
