#!/usr/bin/env bash
# Media optimization for La Brace static site.
# - Images -> assets/img/web (1600px) + assets/img/thumb (800px), JPG q~70
# - Hero video -> 1920 + 1280 mobile, H.264, poster JPG
# - Reels -> 720x1280, H.264
set -euo pipefail
cd "$(dirname "$0")/.."

IMG_SRC="assets/img"
IMG_WEB="assets/img/web"
IMG_THUMB="assets/img/thumb"
VID_SRC="assets/video"
VID_WEB="assets/video/web"

mkdir -p "$IMG_WEB" "$IMG_THUMB" "$VID_WEB"

echo "==> Images"
for f in "$IMG_SRC"/*.jpg; do
  [ -e "$f" ] || continue
  base="$(basename "$f")"
  if [ ! -f "$IMG_WEB/$base" ]; then
    cp "$f" "$IMG_WEB/$base"
    sips -Z 1600 -s formatOptions 70 "$IMG_WEB/$base" >/dev/null 2>&1 || true
  fi
  if [ ! -f "$IMG_THUMB/$base" ]; then
    cp "$f" "$IMG_THUMB/$base"
    sips -Z 800 -s formatOptions 62 "$IMG_THUMB/$base" >/dev/null 2>&1 || true
  fi
done
echo "    done images"

echo "==> Hero video"
if [ ! -f "$VID_WEB/hero-1080.mp4" ]; then
  ffmpeg -y -i "$VID_SRC/hero.mp4" -an -vf "scale=1920:-2" \
    -c:v libx264 -profile:v high -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart \
    "$VID_WEB/hero-1080.mp4" >/dev/null 2>&1
fi
if [ ! -f "$VID_WEB/hero-720.mp4" ]; then
  ffmpeg -y -i "$VID_SRC/hero.mp4" -an -vf "scale=1280:-2" \
    -c:v libx264 -profile:v high -preset slow -crf 25 -pix_fmt yuv420p -movflags +faststart \
    "$VID_WEB/hero-720.mp4" >/dev/null 2>&1
fi
if [ ! -f "$VID_WEB/hero-poster.jpg" ]; then
  ffmpeg -y -ss 2 -i "$VID_SRC/hero.mp4" -vframes 1 -vf "scale=1920:-2" \
    "$VID_WEB/hero-poster.jpg" >/dev/null 2>&1
  sips -s formatOptions 72 "$VID_WEB/hero-poster.jpg" >/dev/null 2>&1 || true
fi
echo "    done hero"

echo "==> Reels"
for f in "$VID_SRC"/Reel_*.mp4; do
  [ -e "$f" ] || continue
  base="$(basename "$f" .mp4)"
  if [ ! -f "$VID_WEB/$base.mp4" ]; then
    ffmpeg -y -i "$f" -an -vf "scale=720:-2" \
      -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart \
      "$VID_WEB/$base.mp4" >/dev/null 2>&1
  fi
  if [ ! -f "$VID_WEB/$base-poster.jpg" ]; then
    ffmpeg -y -ss 1 -i "$f" -vframes 1 -vf "scale=720:-2" \
      "$VID_WEB/$base-poster.jpg" >/dev/null 2>&1
    sips -s formatOptions 68 "$VID_WEB/$base-poster.jpg" >/dev/null 2>&1 || true
  fi
done
echo "    done reels"
echo "==> ALL DONE"
