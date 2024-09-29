import prisma from "../database/database.js";


// Função para ler todos os valores de uma tabela dada
async function read_table(tabela) {
    if(tabela){
    const resultado = await prisma[tabela].findMany();
    return resultado;
}
}



// Função para ler todos os valores de uma tabela genérica associados ao valor dado do atributo "name" de "minigame"
async function join_minigame(nome, tabela) {
    if (nome && tabela) {
        const id= await prisma["minigame"].findFirst({
            where:{
                name: nome
            },
            select: {
                id: true
            }
        });
        const resultado = await prisma[tabela].findMany({
            where:{
                miniId: id.id
            }
        });
        return resultado;
    }
}



// Função para inserir valores em uma tabela genérica
async function insert_into_table(tabela, valores) {
    if (tabela && valores) {
        const resultado = await prisma[tabela].create({
            data: valores,
        });
        return resultado;
    }
}


// Função para ler todos os modos de jogo e suas dificuldades, por meio da tabela "game"
async function read_gamemodes() {
    const relations = await prisma.game.findMany({
        select: {
            modeId: true,
            difficultyId: true,
        }
    })

    var modo = []
    var dificuldade = []

    for( let each of relations){
      const obj1 =  await prisma.gamemode.findFirst({
            where:{
                id: each.modeId
            },
            select:{
                name: true
            }
        })
      const obj2 =  await prisma.difficulty.findFirst({
        where:{
            id: each.difficultyId
        },
        select:{
            name: true
        }
    }) 
      if(!(modo.includes(obj1.name))){
        modo.push(obj1.name)
        let index=modo.length-1
        dificuldade[index]=[]
        dificuldade[index].push(`"${obj2.name}"`)
    }else{
        let index = modo.indexOf(obj1.name)
        dificuldade[index].push(`"${obj2.name}"`)
    }
    }
    let index = 0
    var json = "{"
    for(let each of modo){
        json+=` "${each}":[${dificuldade[index]}],`
        ++index
    }
    json = json.substring(0,json.length-1)
    json+="}";
    const obj=JSON.parse(json)

    return obj;
}

export default { read_table, join_minigame, insert_into_table, read_gamemodes };