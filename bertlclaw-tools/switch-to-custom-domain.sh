#!/usr/bin/env bash
# =============================================================================
# switch-to-custom-domain.sh
# BertlClaw — Domain Migration Script
# =============================================================================
#
# PURPOSE:
#   Replaces all occurrences of the GitHub Pages URL with the custom domain
#   across all website files. Run this once when bertlclaw.at is live and
#   DNS is fully propagated.
#
# WHAT IT DOES:
#   1. Replaces https://bertlclaw.github.io/bertlclaw-site/ → https://bertlclaw.at/
#   2. Replaces https://bertlclaw.github.io/bertlclaw-site  → https://bertlclaw.at
#      (without trailing slash, for canonical/og:url tags etc.)
#   3. Updates robots.txt Sitemap line to https://bertlclaw.at/sitemap.xml
#   4. Targets: all *.html files, sitemap.xml, robots.txt in SITE_DIR
#
# USAGE:
#   Dry run (preview only, no changes):
#     ./switch-to-custom-domain.sh --dry-run
#
#   Apply changes:
#     ./switch-to-custom-domain.sh --apply
#
# SAFETY:
#   - Always run --dry-run first to verify what will change
#   - A timestamped backup is created in /tmp/bertlclaw-backup-YYYYMMDD_HHMMSS/
#     before any changes are applied
#   - Idempotent: running again after apply has no effect (already replaced)
#
# =============================================================================

set -euo pipefail

SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OLD_URL_SLASH="https://bertlclaw.github.io/bertlclaw-site/"
OLD_URL_NOSLASH="https://bertlclaw.github.io/bertlclaw-site"
NEW_URL_SLASH="https://bertlclaw.at/"
NEW_URL_NOSLASH="https://bertlclaw.at"

DRY_RUN=true

# Parse arguments
for arg in "$@"; do
  case $arg in
    --dry-run) DRY_RUN=true ;;
    --apply)   DRY_RUN=false ;;
    *)
      echo "Usage: $0 [--dry-run|--apply]"
      exit 1
      ;;
  esac
done

if $DRY_RUN; then
  echo "=== DRY RUN MODE — no files will be modified ==="
  echo ""
else
  echo "=== APPLY MODE — files will be modified ==="
  BACKUP_DIR="/tmp/bertlclaw-backup-$(date +%Y%m%d_%H%M%S)"
  echo "Creating backup at: $BACKUP_DIR"
  mkdir -p "$BACKUP_DIR"
fi

# Collect target files
mapfile -t FILES < <(find "$SITE_DIR" -maxdepth 1 -type f \( -name "*.html" -o -name "sitemap.xml" -o -name "robots.txt" \) | sort)

TOTAL_FILES=0
TOTAL_REPLACEMENTS=0

for FILE in "${FILES[@]}"; do
  BASENAME="$(basename "$FILE")"

  # Count occurrences
  COUNT_SLASH=$(grep -c "$OLD_URL_SLASH" "$FILE" 2>/dev/null || true)
  COUNT_NOSLASH=$(grep -c "$OLD_URL_NOSLASH" "$FILE" 2>/dev/null || true)
  # Subtract slash matches from noslash count to avoid double-counting
  COUNT_NOSLASH_ONLY=$((COUNT_NOSLASH - COUNT_SLASH))
  TOTAL=$((COUNT_SLASH + COUNT_NOSLASH_ONLY))

  if [ "$TOTAL" -gt 0 ]; then
    TOTAL_FILES=$((TOTAL_FILES + 1))
    TOTAL_REPLACEMENTS=$((TOTAL_REPLACEMENTS + TOTAL))

    echo "📄 $BASENAME  ($TOTAL replacement(s))"
    if [ "$COUNT_SLASH" -gt 0 ]; then
      echo "   [$COUNT_SLASH] $OLD_URL_SLASH → $NEW_URL_SLASH"
    fi
    if [ "$COUNT_NOSLASH_ONLY" -gt 0 ]; then
      echo "   [$COUNT_NOSLASH_ONLY] $OLD_URL_NOSLASH → $NEW_URL_NOSLASH"
    fi

    # Show specific lines in dry-run
    if $DRY_RUN; then
      grep -n "$OLD_URL_NOSLASH" "$FILE" | sed 's/^/      line /' || true
    fi

    # Apply changes
    if ! $DRY_RUN; then
      cp "$FILE" "$BACKUP_DIR/$BASENAME"
      # Order matters: replace with-slash first, then without-slash
      sed -i "s|${OLD_URL_SLASH}|${NEW_URL_SLASH}|g" "$FILE"
      sed -i "s|${OLD_URL_NOSLASH}|${NEW_URL_NOSLASH}|g" "$FILE"
      echo "   ✅ Updated"
    fi
  fi
done

echo ""
echo "────────────────────────────────────────"
if $DRY_RUN; then
  echo "DRY RUN SUMMARY:"
  echo "  Files with changes : $TOTAL_FILES"
  echo "  Total replacements : $TOTAL_REPLACEMENTS"
  echo ""
  echo "Run with --apply to execute these changes."
else
  echo "DONE:"
  echo "  Files updated      : $TOTAL_FILES"
  echo "  Total replacements : $TOTAL_REPLACEMENTS"
  echo "  Backup saved at    : $BACKUP_DIR"
fi
