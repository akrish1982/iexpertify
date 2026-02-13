# Website Structure & Course-First Improvement Plan

## Goal
Turn iExpertify from a mostly article-driven static site into a structured, interactive learning platform while preserving existing SEO value from current HTML pages.

## Current Observations (quick scan)
- The site appears to be a static HTML export with many topic folders (`learn/`, `databricks/`, `aws-athena/`, `free-utilities/`, `tag/`, `category/`).
- Many pages repeat shared blocks (header/footer/tracking snippets), indicating a template opportunity.
- Existing learning content is article-centric and not consistently organized into explicit learning paths.
- Utility pages already provide interactive value and can be reused as "course labs".

## Phase 1 — Content & File-Structure Audit (Week 1)

### 1) Build an inventory map
Create a canonical content index (`content-index.csv` or JSON) with:
- file path
- URL slug
- topic (Netezza, Databricks, Athena, Linux, etc.)
- content type (`article`, `course-lesson`, `utility`, `landing`, `tag`, `category`)
- last modified time
- word count
- has code blocks (yes/no)
- has "next lesson" links (yes/no)

### 2) Detect templates and duplicates
- Identify repeated HTML fragments for header, footer, analytics, and CTA sections.
- Flag duplicated or near-duplicated article bodies.
- Normalize malformed document structure (e.g., multiple `<html>` wrappers, missing metadata consistency).

### 3) Output architecture diagram
Define a simple information architecture tree:
- Home
- Topics
- Courses
- Utilities/Labs
- Tags/Categories

Deliverable: `docs/site-architecture-map.md` plus machine-readable inventory.

## Phase 2 — Define Course Model (Week 2)

### 1) Introduce course metadata schema
Create a per-course manifest (JSON/YAML), for example:
- `course_id`, `title`, `description`, `difficulty`, `estimated_hours`
- ordered modules
- each module's lessons
- prerequisites
- outcomes
- associated labs/utilities
- quiz references

### 2) Map existing articles to course lessons
Prioritize 3 tracks first:
- Netezza Foundations
- Databricks Troubleshooting
- AWS Athena Query Performance

For each article, assign:
- module number
- lesson number
- prerequisite lessons
- learning objective

### 3) Create course landing pages
Each course page should include:
- curriculum outline
- progress checkpoints
- "start here" button
- estimated completion time
- links to practice labs and quizzes

## Phase 3 — Interactivity Enhancements (Weeks 3–4)

### 1) Lightweight progress tracking (no backend first)
Implement client-side progress using `localStorage`:
- lesson complete toggles
- module completion percentages
- resume from last lesson

### 2) Add in-lesson interactive components
Start with reusable widgets via JS:
- collapsible "Try it" SQL snippets
- reveal/hide answer blocks
- inline self-check questions (MCQ)
- flashcards for key terms
- copy-to-clipboard for commands and SQL

### 3) Add course-level assessments
- Short quizzes every 3–5 lessons.
- End-of-module mini assessment with immediate scoring.
- Optional badge state persisted locally.

### 4) Convert utilities into labs
Integrate current tools into lesson flows:
- Link relevant utility at lesson end as "Hands-on Lab".
- Add a lab objective + expected output checklist.

## Phase 4 — Navigation & UX Upgrades (Week 5)

### 1) Introduce global course navigation
- Breadcrumbs
- Previous/Next lesson controls
- Sticky lesson table of contents
- Topic-to-course crosslinks (article -> module context)

### 2) Improve discovery
- "Related lessons" section based on topic + level
- Course recommendation cards on article pages
- Dedicated `/courses/` index with filtering by level/topic

### 3) Standardize page template
- Shared header/footer partial approach
- Consistent metadata and social preview tags
- Uniform CTA placement (newsletter, course, utility)

## Phase 5 — SEO, Analytics, and Quality Control (Week 6)

### 1) Preserve and improve SEO
- Keep existing slugs where possible.
- Add canonical tags when consolidating duplicates.
- Add structured data:
  - `Course`
  - `BreadcrumbList`
  - `FAQPage` (where applicable)

### 2) Engagement analytics for learning behavior
Track events (via existing analytics stack):
- `course_started`
- `lesson_completed`
- `quiz_submitted`
- `lab_opened`
- `course_completed`

### 3) Add validation checks
Automate checks for:
- broken links
- missing title/meta description
- missing "next lesson" pointers in course lessons
- invalid HTML patterns

## Recommended Technical Implementation Order
1. Generate inventory + architecture map.
2. Define course manifest schema.
3. Build one pilot course end-to-end (Databricks suggested).
4. Add reusable JS interactive widgets.
5. Roll out navigation template site-wide.
6. Add analytics events + QA checks.

## Quick Wins (can start immediately)
- Add "You are in Module X of Y" blocks to top pages in `learn/` and `databricks/`.
- Add previous/next links to all lesson-like pages.
- Add copy-to-clipboard buttons for SQL/code blocks.
- Add course index page grouping existing articles into curated learning paths.

## Success Metrics
- Increase pages/session and session duration on course pages.
- Increase % returning visitors for learning sections.
- Improve course completion rate (tracked client-side first).
- Raise internal click-through rate from article -> course pages.
- Reduce bounce rate on standalone article pages.

## Suggested Repo Artifacts to Add Next
- `data/course-manifests/*.json`
- `assets/js/course-progress.js`
- `assets/js/interactive-widgets.js`
- `templates/course-layout.html`
- `docs/content-model.md`
- `scripts/build-content-index.py`
