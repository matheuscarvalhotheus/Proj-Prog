import {describe, it, before} from "node:test"
import assert from "node:assert"
import request from "supertest"
import a from "./index.js"
import bcrypt from "bcrypt"

/*
lista de rotas:

/minigames -> GET -> Retorna informações básicas de todos os minigames
/modos -> GET -> Retorna os modos de jogo e dificuldades de cada minigame
/mobs/solutions -> GET -> Retorna as soluções do minigame mobs
/mobs/gameSettigns -> GET -> Retorna a quantidade de tentativas referentes a cada modo de jogo e dificuldade de mobs
/newhighscore -> POST -> Atualiza/Cria o registro da maior pontuação do usuário em um dado minigame
/score/:mini/:mode -> GET -> Pega a atual maior pontuação do usuário em um dado minigame
/me -> GET -> Pega informações básicas do usuário
/newuser -> POST -> Cria um novo usuário com base nas informações enviadas
/login -> POST -> tenta dar login
/validate-email -> GET -> Valida o email, permitindo o login, com base no token gerado durante o registro
/pass-change-init -> GET -> Gera o token necessário para a troca de senha e envia um email com ele
/pass-change -> POST -> Valida o token da troca de senha para trocar a senha do usuário
/newicon -> POST -> Armazena a imagem enviada pro usuário e associa ela ao usuário para ser usada como icone
/newbackground -> POST -> Armazena a imagem enviada pro usuário e associa ela ao usuário para ser usada como fundo

*/
let validuser
let validlogin = {
    email : "fariasmarquesgustavo@gmail.com",
    pass : "1234",
}
let token

async function newvuser(){
    const response = {password: "a1b2c3d4"}
    let date = await bcrypt.hash(String(new Date()),5)
    const hash=date.slice(37)

    response.name = hash
    response.email = `${hash}@gmail.com`

    return response
}

describe("minedle rotas",() => {
    before(async ()=>{
        validuser = await newvuser()
    })

    describe("registro do usuário",()=>{
    
    describe("POST -> /newuser", ()=>{
    it("usuário criado",async ()=>{
        const response = await request(a.server).post("/newuser").send(validuser)
        assert.strictEqual(response.status, 200)
    })

    it("usuário já existe",async ()=>{
        const response = await request(a.server).post("/newuser").send(validuser)
        assert.strictEqual(response.status, 409)
    })

    it("dados inválidos",async ()=>{
        const response = await request(a.server).post("/newuser").send({name: " hahahah  ",password: "111111", email: ""})
        assert.strictEqual(response.status, 400)
    })

    it("nenhum dado enviado",async ()=>{
        const response = await request(a.server).post("/newuser").send({})
        assert.strictEqual(response.status, 400)
    })
    })

    })

    describe("acessar usuário", ()=>{

    describe("POST -> /login",()=>{
    it("login de usuário valido",async ()=>{
        const response = await request(a.server).post("/login").send(validlogin)
        token = response.body.token
        assert.strictEqual(response.status, 200)
    })

    it("login de usuário inválido",async ()=>{
        const {email,password} = validuser
        const response = await request(a.server).post("/login").send({email:email,pass:password})
        assert.strictEqual(response.status, 403)
    })

    it("login de usuário inexistente",async ()=>{
        const response = await request(a.server).post("/login").send({pass: "111111", email: ""})
        assert.strictEqual(response.status, 401)
    })
    })

    describe("GET -> /me", ()=>{
    it('acessar info de usuário logado', async () => {
        const response = await request(a.server).get('/me').set('Authorization', 'bearer ' + token);
        assert.strictEqual(response.statusCode, 200);
    });

    it('acessar info de usuário deslogado', async () => {
        const response = await request(a.server).get('/me');
        assert.strictEqual(response.statusCode, 404);
    });
    })

    })
    
    })