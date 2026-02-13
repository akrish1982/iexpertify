#!/usr/bin/env bash
set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MODE="${1:---check}"
TARGET_DIR="${2:-$ROOT_DIR}"

SCRIPTS=(
  "update_html_blogs.py"
  "simplify_html.py"
  "change_css_loc.py"
  "find_html_files.py"
  "html_content_updater.py"
)

pass_count=0
fail_count=0
skip_count=0

run_cmd() {
  local label="$1"
  shift

  echo ""
  echo "==> $label"
  if "$@"; then
    echo "[PASS] $label"
    pass_count=$((pass_count + 1))
  else
    echo "[FAIL] $label"
    fail_count=$((fail_count + 1))
  fi
}

skip_step() {
  local label="$1"
  echo ""
  echo "==> $label"
  echo "[SKIP] $label"
  skip_count=$((skip_count + 1))
}

echo "Running content-generation checks"
echo "Repository root: $ROOT_DIR"
echo "Mode: $MODE"
echo "Target content directory: $TARGET_DIR"

for script in "${SCRIPTS[@]}"; do
  if [[ -f "$ROOT_DIR/$script" ]]; then
    run_cmd "Syntax check: $script" python -m py_compile "$ROOT_DIR/$script"
  else
    echo "[FAIL] Missing script: $script"
    fail_count=$((fail_count + 1))
  fi
done

if [[ "$MODE" != "--run" ]]; then
  echo ""
  echo "Check mode only. Use '--run [target_dir]' to execute the scripts."
  echo "Summary: pass=$pass_count fail=$fail_count skip=$skip_count"
  [[ $fail_count -eq 0 ]] && exit 0 || exit 1
fi

if [[ -n "${OPENAI_API_KEY:-}" ]]; then
  run_cmd "Run update_html_blogs.py" python "$ROOT_DIR/update_html_blogs.py"
else
  skip_step "Run update_html_blogs.py (OPENAI_API_KEY not set)"
fi

if [[ -d "$TARGET_DIR" ]]; then
  run_cmd "Run simplify_html.py on target directory" bash -lc "printf '%s\n' '$TARGET_DIR' | python '$ROOT_DIR/simplify_html.py'"
else
  skip_step "Run simplify_html.py (target directory not found: $TARGET_DIR)"
fi

run_cmd "Run change_css_loc.py" python "$ROOT_DIR/change_css_loc.py"
run_cmd "Run find_html_files.py" python "$ROOT_DIR/find_html_files.py"

if [[ -n "${ANTHROPIC_API_KEY:-}" ]]; then
  run_cmd "Run html_content_updater.py" python "$ROOT_DIR/html_content_updater.py"
else
  skip_step "Run html_content_updater.py (ANTHROPIC_API_KEY not set)"
fi

echo ""
echo "Summary: pass=$pass_count fail=$fail_count skip=$skip_count"

if [[ $fail_count -gt 0 ]]; then
  exit 1
fi

exit 0
