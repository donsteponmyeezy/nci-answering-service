#!/usr/bin/env bash
# Captures matched screenshots of the reference (static server) and the Next.js app
# at the same viewports so they can be compared side by side.
#   scripts/capture-parity.sh <reference-origin> <next-origin>
#   e.g. scripts/capture-parity.sh http://localhost:4332 http://localhost:4333
set -euo pipefail
REF="${1:-http://localhost:4332}"
NEXT="${2:-http://localhost:4333}"
CH="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/design-reference/parity/$(date +%Y-%m-%d)"
mkdir -p "$OUT"
ROUTES=("index:/" "services:/services" "pricing:/pricing" "find-your-coverage:/find-your-coverage" "contact:/contact" "who-we-serve:/who-we-serve" "about:/about" "privacy-policy:/privacy-policy")
for pair in "${ROUTES[@]}"; do
  name="${pair%%:*}"; route="${pair#*:}"
  for size in 1440,900 390,844; do
    w="${size%,*}"
    "$CH" --headless=new --disable-gpu --hide-scrollbars --window-size="$size" --screenshot="$OUT/$name-$w-reference.png" "$REF/$name.html" >/dev/null 2>&1
    "$CH" --headless=new --disable-gpu --hide-scrollbars --window-size="$size" --screenshot="$OUT/$name-$w-next.png" "$NEXT$route" >/dev/null 2>&1
  done
done
echo "captures in $OUT"
ls "$OUT" | wc -l
