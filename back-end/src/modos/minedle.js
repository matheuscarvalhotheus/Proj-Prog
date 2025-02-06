import prisma from "../database/database.js";
import interprete from "../../middleware/transcribe_gamemodes.js";

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

async function create_newhighscore(email,miniid,modeid,score){
    if(email&&miniid){
        const playerid= await prisma.player.findFirst({
            where:{
                userEmail: email,
                miniId: miniid
            },
            select:{
            id:true
            }
        })
        if(playerid&&modeid){
            const oldscore = await prisma.playerData.findFirst({
                where:{
                    playerId: playerid.id,
                    modeId: modeid
                },
                select:{
                points:true
                }
            })
            if(oldscore){
                if(oldscore.points<score){
                    const result = await prisma.playerData.update({
                        where:{
                            playerId_modeId: {
                            playerId: playerid.id,
                            modeId: modeid,
                            }
                        },
                        data: {
                            points:score,
                        }
                    })
                    return [200,result];
                }
                return [403,{fail : "não é um novo highscore"}]
            }
            const result = await prisma.playerData.create({
                data:{
                playerId:playerid.id,
                modeId:modeid,
                points: score
                }
            })
            return [200,result];
        } else if(modeid){
            const newplayerid = await prisma.player.create({
            data:{
            userEmail:email,
            miniId:miniid,
            },
            select:{
                id: true
            }
        })
            const result = await prisma.playerData.create({
                data:{
                playerId:newplayerid.id,
                modeId:modeid,
                points: score
                }
            })
            return [200,result];
        }

    }
}

async function minimodevalidation(mininame,modename){
    const miniid = await prisma.minigame.findFirst({
        where:{
            name:mininame
        },
        select:{
            id:true
        }
    })
    const modeid = await prisma.gamemode.findFirst({
        where:{
            name:modename
        },
        select:{
            id:true
        }
    })
    return [miniid,modeid]
}

async function validateuser(id){
    const resultado = await prisma.user.update({
        where:{
            Id:id
        },
        data: {
            auth:true,
        }
    })
    return resultado;
}

async function pass_change_init(id,passcode){
    const resultado = await prisma.user.update({
        where:{
            Id:id
        },
        data: {
            passcode:passcode,
        }
    })
    return resultado;
}

async function pass_change(id,newpass){
    const resultado = await prisma.user.update({
        where:{
            Id:id
        },
        data: {
            password:newpass,
            passcode:"",
        }
    })
    return resultado;
}

async function upload_img(id,path,type){
    if(type=="icon"){
        const resultado = await prisma.user.update({
            where:{
                Id:id
            },
            data: {
                icon:path,
            }
        })
        return [200,resultado];;
    } else if(type=="background"){
        const resultado = await prisma.user.update({
            where:{
                Id:id
            },
            data: {
                background_img:path,
            }
        })
        return [200,resultado];
    }
    return 404;
}

export default { upload_img,pass_change, pass_change_init, search_user, read_table, join_minigame, insert_into_table, read_gamemodes, create_newhighscore,minimodevalidation, validateuser};