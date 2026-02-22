-- Enum for post status (draft vs published)
CREATE TYPE post_status AS ENUM ('draft', 'published');

-- Feed photos table: media not yet in an album
CREATE TABLE feed_photos (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL,
  src        text NOT NULL,
  alt        text,
  type       text NOT NULL DEFAULT 'image' CHECK (type IN ('image', 'video')),
  stream_id  text,
  thumbnail  text,
  status     post_status NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Index for listing published feed photos by date
CREATE INDEX feed_photos_status_created_at_idx ON feed_photos (status, created_at DESC);

-- Optional: trigger to keep updated_at in sync (Supabase can do this via dashboard too)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER feed_photos_updated_at
  BEFORE UPDATE ON feed_photos
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();
