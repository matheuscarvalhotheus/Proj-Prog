const json = {
    "mobs": [
        {
            "nome": "creeper",
            "img": "https://drive.google.com/thumbnail?id=1tC512AT_43kpYoHqOvQZP4r8_cjxVYd5"
        },
        {
            "nome": "zumbi",
            "img": "https://drive.google.com/thumbnail?id=18s-4L_f5zJrPCsfRsjeWTNVSiAdjhQ6x"
        },
        {
            "nome": "esqueleto",
            "img": "https://drive.google.com/thumbnail?id=1ViEjruXu2sp14aXQ1a9UGrakjhONkPDv"
        },
        {
            "nome": "aranha",
            "img": "https://drive.google.com/thumbnail?id=1UYSFY099DZRgwr2C_KGjUcFY8BdM4ftM"
        },
        {
            "nome": "enderman",
            "img": "https://drive.google.com/thumbnail?id=1MK1YL-PlcpXSjnBpetUYpghbWS9M_dC0"
        },
        {
            "nome": "golem de ferro",
            "img": "https://drive.google.com/thumbnail?id=14iGLSOAwb6e7CHw8zrxZ3emV3CFE5RM4"
        },
        {
            "nome": "lobo",
            "img": "https://drive.google.com/thumbnail?id=1xzcDvw6a2Kz30WkfA6h_CoMP79GoUWDN"
        },
        {
            "nome": "porco",
            "img": "https://drive.google.com/thumbnail?id=1rhQfkTI9CeTRqrZIi_RYSMTnGh71druw"
        },
        {
            "nome": "vaca",
            "img": "https://drive.google.com/thumbnail?id=1SHMdGy7MrBL2TgCLyoIzL1iGW7tVm7YB"
        },
        {
            "nome": "ovelha",
            "img": "https://drive.google.com/thumbnail?id=1hXBXkvz8PbY69GzEduRo9mXs3FJoEEol"
        }
    ]
};
var lista_mobs=[]
for(let i =0; i<json.mobs.length; i++){
lista_mobs[i]=JSON.stringify(json.mobs[i]);
}

export const mobs = lista_mobs;