-- Add geographic columns to feed_photos (city, state/province, country, GPS from EXIF)
ALTER TABLE feed_photos
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS latitude double precision,
  ADD COLUMN IF NOT EXISTS longitude double precision;

COMMENT ON COLUMN feed_photos.state IS 'State or province, nullable';
COMMENT ON COLUMN feed_photos.latitude IS 'GPS lat from EXIF, nullable';
COMMENT ON COLUMN feed_photos.longitude IS 'GPS lon from EXIF, nullable';
