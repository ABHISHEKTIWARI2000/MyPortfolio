/*
# Create K.R. Mangalam University teaching tables

1. New Tables
- `university_subjects`: subjects taught at K.R. Mangalam University.
  - `id` (uuid, primary key)
  - `name` (text, required) subject name
  - `code` (text, optional) course code
  - `description` (text, optional) short overview
  - `position` (integer) display order
  - `created_at` (timestamp)
- `subject_contents`: teaching content items belonging to a subject.
  - `id` (uuid, primary key)
  - `subject_id` (uuid, references university_subjects, deleted with its subject)
  - `title` (text, required)
  - `body` (text, required) the teaching content
  - `position` (integer) display order
  - `created_at` (timestamp)

2. Security
- Enable RLS on both tables.
- Public (anon + authenticated) can READ only. There are no public write policies.
- All writes go through a password-checked server function that uses the service role.

3. Notes
- Foreign key on subject_contents.subject_id with ON DELETE CASCADE.
- Index on subject_contents.subject_id for lookups.
*/

CREATE TABLE IF NOT EXISTS university_subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subject_contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES university_subjects(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS subject_contents_subject_id_idx ON subject_contents (subject_id);

ALTER TABLE university_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_contents ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON university_subjects TO anon, authenticated;
GRANT SELECT ON subject_contents TO anon, authenticated;
GRANT ALL ON university_subjects TO service_role;
GRANT ALL ON subject_contents TO service_role;

DROP POLICY IF EXISTS "public_select_university_subjects" ON university_subjects;
CREATE POLICY "public_select_university_subjects" ON university_subjects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_select_subject_contents" ON subject_contents;
CREATE POLICY "public_select_subject_contents" ON subject_contents FOR SELECT
  TO anon, authenticated USING (true);
