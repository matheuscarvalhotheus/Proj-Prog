import { resolve } from 'node:path';
import { Database } from 'sqlite-async';

const banco_arquivo = resolve('src','database','minedle.sqlite');

async function chamar() {
  return await Database.open(banco_arquivo);
}

export default { chamar };
