#!/usr/bin/env python3
"""Build a machine-readable inventory for static HTML content."""

from __future__ import annotations

import csv
import json
import re
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "data"
CSV_PATH = OUT_DIR / "content-index.csv"
JSON_PATH = OUT_DIR / "content-index.json"

IGNORE_PARTS = {
    ".git",
    "index_files",
    "wp-content",
    "wp-includes",
    "cdn-cgi",
}

TOPIC_MAP = {
    "learn": "Netezza",
    "databricks": "Databricks",
    "aws-athena": "AWS Athena",
    "linux": "Linux",
    "data-warehousing": "Data Warehousing",
    "free-utilities": "Utilities",
    "courses": "Courses",
}


@dataclass
class ContentRow:
    file_path: str
    url_slug: str
    topic: str
    content_type: str
    last_modified: str
    word_count: int
    has_code_blocks: bool
    has_next_lesson_links: bool


def should_ignore(path: Path) -> bool:
    return any(part in IGNORE_PARTS for part in path.parts)


def classify_topic(path: Path) -> str:
    first = path.parts[0] if path.parts else ""
    return TOPIC_MAP.get(first, "General")


def classify_content_type(path: Path) -> str:
    parts = path.parts
    if not parts:
        return "other"
    first = parts[0]
    if first == "category":
        return "category"
    if first == "tag":
        return "tag"
    if first == "free-utilities":
        return "utility"
    if first == "courses" or (first == "learn" and len(parts) > 1 and parts[1] == "full-course"):
        return "course-lesson"
    if first in {"learn", "databricks", "aws-athena", "linux", "data-warehousing", "aws"}:
        return "article"
    if first == "index.html" or path.name == "index.html" and len(parts) == 1:
        return "landing"
    return "other"


def extract_text(html: str) -> str:
    text = re.sub(r"<script[\s\S]*?</script>", " ", html, flags=re.IGNORECASE)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", unescape(text)).strip()


def word_count(html: str) -> int:
    text = extract_text(html)
    if not text:
        return 0
    return len(re.findall(r"[A-Za-z0-9_'-]+", text))


def has_code_blocks(html: str) -> bool:
    if re.search(r"<pre|<code", html, flags=re.IGNORECASE):
        return True
    return "```" in html


def has_next_link(html: str) -> bool:
    return bool(re.search(r">\s*next\b|next\s*:", html, flags=re.IGNORECASE))


def file_to_slug(path: Path) -> str:
    rel = path.relative_to(ROOT)
    if rel.name == "index.html":
        parts = rel.parts[:-1]
        if not parts:
            return "/"
        return "/" + "/".join(parts) + "/"
    return "/" + "/".join(rel.parts)


def build_rows() -> list[ContentRow]:
    rows: list[ContentRow] = []
    for path in ROOT.rglob("*.html"):
        rel = path.relative_to(ROOT)
        if should_ignore(rel):
            continue
        html = path.read_text(encoding="utf-8", errors="ignore")
        modified = datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc).isoformat()
        rows.append(
            ContentRow(
                file_path=str(rel),
                url_slug=file_to_slug(path),
                topic=classify_topic(rel),
                content_type=classify_content_type(rel),
                last_modified=modified,
                word_count=word_count(html),
                has_code_blocks=has_code_blocks(html),
                has_next_lesson_links=has_next_link(html),
            )
        )
    rows.sort(key=lambda row: row.file_path)
    return rows


def write_csv(rows: list[ContentRow]) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with CSV_PATH.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(asdict(rows[0]).keys()) if rows else [])
        if rows:
            writer.writeheader()
            for row in rows:
                writer.writerow(asdict(row))


def write_json(rows: list[ContentRow]) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with JSON_PATH.open("w", encoding="utf-8") as handle:
        json.dump([asdict(row) for row in rows], handle, indent=2)


def main() -> None:
    rows = build_rows()
    write_csv(rows)
    write_json(rows)
    print(f"Generated {len(rows)} rows")
    print(f"- {CSV_PATH.relative_to(ROOT)}")
    print(f"- {JSON_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
