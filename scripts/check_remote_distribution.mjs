const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

async function checkRemoteDistribution() {
  let all = [];
  let from = 0;
  const step = 1000;
  while (true) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/questions?select=id,correct_answer`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Range: `${from}-${from + step - 1}`
      }
    });
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    if (data.length < step) break;
    from += step;
  }

  console.log('Fetched remote questions count:', all.length);
  const dist = { A: 0, B: 0, C: 0, D: 0, other: 0 };
  all.forEach(q => {
    if (dist[q.correct_answer] !== undefined) dist[q.correct_answer]++;
    else dist.other++;
  });
  console.log('Remote Supabase distribution:', dist);
  console.log(`Percentages:
A: ${((dist.A / all.length) * 100).toFixed(1)}% (${dist.A})
B: ${((dist.B / all.length) * 100).toFixed(1)}% (${dist.B})
C: ${((dist.C / all.length) * 100).toFixed(1)}% (${dist.C})
D: ${((dist.D / all.length) * 100).toFixed(1)}% (${dist.D})
`);
}

checkRemoteDistribution().catch(console.error);
