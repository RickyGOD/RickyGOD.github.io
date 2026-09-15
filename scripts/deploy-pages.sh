#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
NEXT_PUBLIC_BASE_PATH= npm run build
touch out/.nojekyll
target=$(mktemp -d "${TMPDIR:-/tmp}/ricky-pages.XXXXXX")
trap 'rm -rf "$target"' EXIT
git -c credential.helper='!gh auth git-credential' clone --single-branch --branch gh-pages https://github.com/RickyGOD/RickyGOD.github.io.git "$target"
rsync -a --delete --exclude='.git' out/ "$target/"
git -C "$target" add -A
if ! git -C "$target" diff --cached --quiet; then
  git -C "$target" commit -m "Deploy portfolio $(git rev-parse --short HEAD)"
  git -C "$target" -c credential.helper='!gh auth git-credential' push origin gh-pages
fi
