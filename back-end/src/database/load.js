import Database from './database.js';
import { readFileSync } from 'node:fs'; 

async function montar() {
  const banco = await Database.chamar();
  
  const caminho_codigo = 'src/database/backup/bd_minedle.sql';
  const codigo = readFileSync(caminho_codigo);
 
  const sql = `${codigo}`;
 
  await banco.exec(sql);
}
 
montar();
 