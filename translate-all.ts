import { createClient } from 'npm:@supabase/supabase-js@2';
import * as dotenv from 'npm:dotenv@16';

dotenv.config();

const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL')!;
const supabaseKey = Deno.env.get('VITE_SUPABASE_ANON_KEY')!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface TranslationKey {
  id: string;
  key: string;
}

interface Translation {
  key_id: string;
  value: string;
}

async function translateBatch(texts: string[]): Promise<string[]> {
  const response = await fetch(`${supabaseUrl}/functions/v1/auto-translate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sourceLang: 'fr',
      targetLang: 'en',
      texts,
    }),
  });

  if (!response.ok) {
    throw new Error(`Translation failed: ${await response.text()}`);
  }

  const data = await response.json();
  return data.translations.map((t: { translated: string }) => t.translated);
}

async function main() {
  console.log('Fetching French translations...');

  const { data: frTranslations, error: fetchError } = await supabase
    .from('translations')
    .select(`
      key_id,
      value,
      translation_keys (
        id,
        key
      )
    `)
    .eq('language_code', 'fr');

  if (fetchError) {
    console.error('Error fetching translations:', fetchError);
    return;
  }

  console.log(`Found ${frTranslations?.length} French translations`);

  const batchSize = 20;
  const batches: Translation[][] = [];

  for (let i = 0; i < (frTranslations?.length || 0); i += batchSize) {
    batches.push(frTranslations!.slice(i, i + batchSize) as any);
  }

  console.log(`Processing ${batches.length} batches...`);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`\nBatch ${i + 1}/${batches.length}`);

    const texts = batch.map((t: any) => t.value);
    const translated = await translateBatch(texts);

    const insertData = batch.map((t: any, idx: number) => ({
      key_id: t.key_id,
      language_code: 'en',
      value: translated[idx],
    }));

    const { error: insertError } = await supabase
      .from('translations')
      .insert(insertData);

    if (insertError) {
      console.error('Error inserting translations:', insertError);
    } else {
      console.log(`✓ Inserted ${insertData.length} translations`);
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n✓ All translations completed!');
}

main();
