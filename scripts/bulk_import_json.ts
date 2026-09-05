import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Usage:
 * npx tsx scripts/bulk_import_json.ts questions path/to/questions.json
 * npx tsx scripts/bulk_import_json.ts flashcards path/to/flashcards.json
 * npx tsx scripts/bulk_import_json.ts study_topics path/to/topics.json
 */
async function bulkImport() {
  const args = process.argv.slice(2);
  const table = args[0];
  const filePath = args[1];

  if (!table || !filePath) {
    console.log('Usage: npx tsx scripts/bulk_import_json.ts <table_name> <file_path.json>');
    console.log('Example: npx tsx scripts/bulk_import_json.ts flashcards data/new_flashcards.json');
    process.exit(1);
  }

  const fullPath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const rows = JSON.parse(fileContent);

  if (!Array.isArray(rows)) {
    console.error('JSON content must be an array of objects.');
    process.exit(1);
  }

  console.log(`Starting bulk import of ${rows.length} rows into "${table}"...`);

  // Batch insert in chunks of 50
  const CHUNK_SIZE = 50;
  for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
    const chunk = rows.slice(i, i + CHUNK_SIZE);
    const { data, error } = await supabase.from(table).upsert(chunk);
    if (error) {
      console.error(`Error in chunk ${i} - ${i + chunk.length}:`, error);
    } else {
      console.log(`✓ Inserted rows ${i + 1} to ${Math.min(i + chunk.length, rows.length)}`);
    }
  }

  console.log(`🎉 Finished bulk import into "${table}"!`);
}

bulkImport().catch(console.error);
