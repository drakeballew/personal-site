-- photo_date and location are required by getFeedPhotos(); add if missing
ALTER TABLE feed_photos
  ADD COLUMN IF NOT EXISTS photo_date timestamptz,
  ADD COLUMN IF NOT EXISTS location text;

-- Backfill photo_date from created_at so ordering works
UPDATE feed_photos SET photo_date = created_at WHERE photo_date IS NULL;
