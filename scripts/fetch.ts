import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getOffers } from '../src/lib/offers.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = join(__dirname, '..', 'resposta.json');

const page = Number(process.argv[2] ?? 1);
const pageSize = Number(process.argv[3] ?? 5);

const result = await getOffers({ page, pageSize });
await writeFile(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf8');
console.log(`Salvo em resposta.json (${result.data.length} itens)`);
