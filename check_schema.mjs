import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envFile = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  if (line.includes('=')) {
    const [key, ...val] = line.split('=');
    env[key.trim()] = val.join('=').trim();
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log("Checking tables...");
  
  const tables = ['requirement_files', 'requirement_comments', 'requirement_history', 'requirements'];
  
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.error(`Error selecting from ${table}:`, error.message, error.details, error.hint);
    } else {
      console.log(`Success selecting from ${table}. Sample keys:`, data.length > 0 ? Object.keys(data[0]) : 'No data (but table exists and is accessible)');
    }
  }

  // Check nested query
  const { error: nestedError } = await supabase
    .from('requirements')
    .select('*, requirement_files(*)')
    .limit(1);
    
  if (nestedError) {
    console.error("Nested requirement_files error:", nestedError.message, nestedError.details, nestedError.hint);
  } else {
    console.log("Nested requirement_files SUCCESS");
  }

  const { error: nestedError2 } = await supabase
    .from('requirements')
    .select('*, requirement_comments(*)')
    .limit(1);
    
  if (nestedError2) {
    console.error("Nested requirement_comments error:", nestedError2.message, nestedError2.details, nestedError2.hint);
  } else {
    console.log("Nested requirement_comments SUCCESS");
  }
}

checkSchema();
