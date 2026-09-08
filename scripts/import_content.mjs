// Universal Content Importer for Bihar Librarian Ninja
// Automatically detects table type, validates fields, and imports directly to Supabase

import * as fs from 'fs';
import * as path from 'path';

const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

function detectTable(firstRow) {
  if (firstRow.statement_hi || firstRow.statement_en || firstRow.category_key) {
    return 'one_liners';
  }
  if (firstRow.question_hi || firstRow.question_en || firstRow.correct_answer) {
    return 'questions';
  }
  if (firstRow.front_hi || firstRow.front_en || firstRow.back_hi || firstRow.back_en) {
    return 'flashcards';
  }
  if (firstRow.question_ids || firstRow.reward_xp) {
    return 'quizzes';
  }
  if (firstRow.unit_id || firstRow.key_points) {
    return 'study_topics';
  }
  if (firstRow.unit_number) {
    return 'study_units';
  }
  return null;
}

async function upsertBatch(table, rows) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(rows)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[HTTP ${res.status}] ${err}`);
  }
  return true;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`
Usage:
  node scripts/import_content.mjs <file_path.json> [optional_table_name]

Examples:
  node scripts/import_content.mjs bulk_templates/new_questions.json
  node scripts/import_content.mjs bulk_templates/new_oneliners.json one_liners
    `);
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), args[0]);
  let tableName = args[1];

  if (!fs.existsSync(filePath)) {
    console.error(`✗ File not found: ${filePath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(fileContent);
  } catch (e) {
    console.error(`✗ Invalid JSON format in ${filePath}: ${e.message}`);
    process.exit(1);
  }

  // If the file is a Topic Quiz Set format containing { quizzes, questions }
  if (data && typeof data === 'object' && !Array.isArray(data) && (data.quizzes || data.questions)) {
    console.log(`📦 Detected Topic Quiz Set file with quizzes & questions. Forwarding to add_topic_set.mjs...`);
    const { execSync } = await import('child_process');
    execSync(`node scripts/add_topic_set.mjs "${filePath}"`, { stdio: 'inherit' });
    return;
  }

  const rows = Array.isArray(data) ? data : [data];
  if (rows.length === 0) {
    console.log('⚠ File contains an empty array.');
    process.exit(0);
  }

  if (!tableName) {
    tableName = detectTable(rows[0]);
    if (!tableName) {
      console.error('✗ Could not auto-detect table name. Please specify table name as second argument.');
      console.error('Supported tables: questions, one_liners, flashcards, quizzes, study_topics, study_units');
      process.exit(1);
    }
    console.log(`🔍 Auto-detected target table: "${tableName}"`);
  }

  // Ensure every row has an id
  const timestamp = Date.now();
  rows.forEach((row, i) => {
    if (!row.id) {
      const prefix = tableName === 'questions' ? 'q' : tableName === 'one_liners' ? 'ol' : tableName === 'flashcards' ? 'fc' : 'item';
      row.id = `${prefix}_nb_${timestamp}_${i + 1}`;
    }
    if (tableName === 'study_topics') {
      if (row.content_hi) row.content_hi = row.content_hi.replace(/\\n/g, '\n').replace(/朝उन/g, 'ब्राउन');
      if (row.content_en) row.content_en = row.content_en.replace(/\\n/g, '\n');
      if (Array.isArray(row.key_points)) {
        row.key_points = row.key_points.map(kp => {
          if (!kp) return kp;
          return { ...kp, hi: (kp.hi || '').replace(/\s*ध्वनि।$/, '।') };
        });
      }
    }
    if (tableName === 'one_liners') {
      delete row.unit_number;
      delete row.topic_id;
      if (row.statement_hi) row.statement_hi = (row.statement_hi || '').replace(/\s*ध्वनि।$/, '।');
    }
    if (tableName === 'flashcards') {
      delete row.unit_number;
      delete row.topic_id;
      if (row.back_hi) row.back_hi = (row.back_hi || '').replace(/\s*ध्वनि।$/, '।');
      if (row.subtext_hi) row.subtext_hi = (row.subtext_hi || '').replace(/\s*ध्वनि।$/, '।');
    }
  });

  console.log(`🚀 Starting import of ${rows.length} rows into "${tableName}" on Supabase...`);

  const BATCH_SIZE = 25;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const chunk = rows.slice(i, i + BATCH_SIZE);
    try {
      await upsertBatch(tableName, chunk);
      console.log(`✓ Inserted batch ${i + 1} - ${Math.min(i + chunk.length, rows.length)} of ${rows.length}`);
    } catch (e) {
      console.error(`✗ Error on batch ${i + 1}: ${e.message}`);
      process.exit(1);
    }
  }

  console.log(`\n🎉 Successfully imported all ${rows.length} rows into "${tableName}"!`);
  console.log(`👉 Open the app and tap "Sync From Cloud DB" in Settings to instantly see your new content.`);
}

main().catch(console.error);
