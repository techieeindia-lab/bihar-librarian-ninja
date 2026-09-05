import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testTables() {
  console.log('Testing Supabase connection...');
  
  const tables = ['study_units', 'study_topics', 'flashcards', 'questions', 'mock_tests'];
  
  for (const table of tables) {
    const res = await supabase.from(table).select('*').limit(3);
    console.log(`Table "${table}":`, {
      status: res.status,
      statusText: res.statusText,
      error: res.error,
      rowCount: res.data ? res.data.length : 0,
      sample: res.data ? res.data[0] : null,
    });
  }
}

testTables().catch(console.error);
