# Content Model

## Canonical Course Schema

Each manifest in `/data/course-manifests/` follows this model:

- `course_id`: stable unique identifier.
- `title`: course title.
- `description`: concise summary.
- `difficulty`: beginner/intermediate/advanced.
- `estimated_hours`: integer estimate.
- `topic`: domain area.
- `landing_url`: course entry URL.
- `prerequisites`: list of strings.
- `outcomes`: list of measurable outcomes.
- `associated_labs`: utility or lab URLs.
- `modules`: ordered list of modules.
  - `module_id`: stable module identifier.
  - `title`: module title.
  - `lessons`: ordered lessons.
    - `lesson_id`: stable unique lesson identifier.
    - `title`: lesson title.
    - `url`: existing lesson URL.
    - `objective`: lesson learning objective.
    - `prerequisites`: lesson dependency list.

## Inventory Schema

`/data/content-index.{csv,json}` includes:

- `file_path`
- `url_slug`
- `topic`
- `content_type` (`article`, `course-lesson`, `utility`, `landing`, `tag`, `category`, `other`)
- `last_modified`
- `word_count`
- `has_code_blocks`
- `has_next_lesson_links`
