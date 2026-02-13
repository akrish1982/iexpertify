# Site Architecture Map

## Current Information Architecture

- Home: `/`
- Topics:
  - `/learn/`
  - `/databricks/`
  - `/aws-athena/`
  - `/data-warehousing/`
  - `/linux/`
- Courses:
  - `/courses/`
  - `/learn/full-course/`
- Utilities / Labs:
  - `/free-utilities/`
- Discovery / Taxonomy:
  - `/category/`
  - `/tag/`
- Supporting Pages:
  - `/author/`
  - `/free-courses/`

## Proposed Course-First Layer

- Course index: `/courses/`
- Course manifests: `/data/course-manifests/*.json`
- Pilot course page:
  - `/courses/databricks-troubleshooting/`
- Lesson sources (existing SEO URLs retained):
  - `/databricks/*`
  - `/learn/*`
  - `/aws-athena/*`

## Rollout Notes

- Keep existing article URLs as canonical lesson URLs.
- Add course navigation and progress in course landing pages first.
- Expand lesson-level navigation banners in a second pass using the manifest as source of truth.
