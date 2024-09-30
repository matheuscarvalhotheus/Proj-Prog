import { readFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
 
async function main() {
  const file = "./prisma/seeders.json";
  const seed = JSON.parse(readFileSync(file));
  
  for( const model of seed.objects){
    if(seed[model]){
    for( const entries of seed[model]){
    await prisma[model].create({
      data : entries,
  });
}
}
}

}
main()
  .then(async () => {
    await prisma.$disconnect();
  });
 