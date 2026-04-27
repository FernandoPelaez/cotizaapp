ALTER TABLE "Settings"
ALTER COLUMN "themeMode" SET DEFAULT 'CLARO',
ALTER COLUMN "fontFamily" SET DEFAULT 'INTER',
ALTER COLUMN "brandColor" SET DEFAULT 'blue';

UPDATE "Settings"
SET
  "themeMode" = 'CLARO',
  "fontFamily" = 'INTER',
  "brandColor" = 'blue'
WHERE "themeMode" = 'SISTEMA'
   OR "fontFamily" = 'GEIST'
   OR "brandColor" = '#1b3d7a';
