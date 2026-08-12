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

const supabase = createClient(supabaseUrl, supabaseKey);

async function probeTables() {
  const fakeUuid = '00000000-0000-0000-0000-000000000000';
  
  console.log("Probing requirement_files...");
  const res1 = await supabase.from('requirement_files').insert({
    id: fakeUuid,
    requirement_id: fakeUuid,
    name: "test",
    file_type: "pdf",
    size_bytes: 1024,
    uploaded_by: fakeUuid,
    storage_path: "test"
  });
  console.log("FILES ERR:", res1.error);

  console.log("\nProbing requirement_comments...");
  const res2 = await supabase.from('requirement_comments').insert({
    id: fakeUuid,
    requirement_id: fakeUuid,
    author_id: fakeUuid,
    message: "test"
  });
  console.log("COMMENTS ERR:", res2.error);

  console.log("\nProbing requirement_history...");
  const res3 = await supabase.from('requirement_history').insert({
    id: fakeUuid,
    requirement_id: fakeUuid,
    title: "test",
    description: "test",
    event_type: "test",
    triggered_by: fakeUuid
  });
  console.log("HISTORY ERR:", res3.error);
}

probeTables();
