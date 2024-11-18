import prisma from "../database/database.js";

// Função para obter a pontuação de um usuário
async function get_user_score(userEmail, miniId, modeId) {
    // Encontrar o playerId usando userEmail e miniId
    const player = await prisma.player.findFirst({
        where: {
            userEmail: userEmail,
            miniId: miniId
        },
        select: {
            id: true
        }
    });

    if (!player) {
        return [404,{fail: "esse usuário não possui nenhuma quantidade de pontos registrada neste minigame"}]
    }

    const playerId = player.id;

    // Encontrar a pontuação usando playerId e modeId
    const playerData = await prisma.playerData.findFirst({
        where: {
            playerId: playerId,
            modeId: modeId
        },
        select: {
            points: true
        }
    });

    if (!playerData) {
        return [404,{fail: "esse usuário não possui nenhuma quantidade de pontos registrada neste modo"}]

    }

    return [200,{"pontos":playerData.points}];
}

export default { get_user_score };