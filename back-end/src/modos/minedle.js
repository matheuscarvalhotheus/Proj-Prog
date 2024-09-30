import prisma from "../database/database.js";
import interprete from "../../middleware/interpretadores.js";

// Função para ler todos os valores de uma tabela dada
async function read_table(tabela) {
    if(tabela){
    const resultado = await prisma[tabela].findMany();
    return resultado;
}
}

// procura se existe um usuário com o email dado
async function search_user(email) {
    const resultado = await prisma.user.findFirst({
        where:{
            email: email
        }
    });
    return resultado;
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
            },
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
async function read_gamemodes(game) {
    let flag=true
    //le o id de game e devolve os valores de dificuldade e modo de jogo
    if(game){
    const relations = await prisma.game.findFirst({
        where:{
            id: game 
        },
        select:{
        mode:{
            select:{
                name:true
        }},
        difficulty:{
        select:{
            name: true,
        }}
    }
    })
    flag=false
    const obj = interprete(relations,flag)
    return obj
    }
    //se nao houver valor de id, lê a tabela toda e devolde todos os valores
    const relations = await prisma.game.findMany({
        select:{
        mode:{
        select:{
            name: true,
    }},
        difficulty:{
        select:{
            name: true,
    }}

    }
    });
    const obj = interprete(relations,flag)
    return obj;
}

export default { search_user, read_table, join_minigame, insert_into_table, read_gamemodes };