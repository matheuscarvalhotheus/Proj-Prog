// @ts-check
import { test, expect } from '@playwright/test';
import bcrypt from "bcrypt"

let validuser

let validlogin = {
  email : "fariasmarquesgustavo@gmail.com",
  pass : "1234",
}
async function newvuser(){
    const response = {password: "a1b2c3d4"}
    let date = await bcrypt.hash(String(new Date()),5)
    const hash=date.slice(37)

    response.name = hash
    response.email = `${hash}@gmail.com`

    return response
}

test.describe("minedle",()=>{

test.beforeAll(async ()=>{
  validuser = await newvuser();
})

test('registrar', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/front-end/cadastro/cadastro.html');
  await page.getByRole('textbox', { name: 'Digite seu nome de usuário' }).fill(validuser.name);
  await page.getByRole('textbox', { name: 'Digite seu e-mail' }).fill(validuser.email);
  await page.getByRole('textbox', { name: 'Digite sua senha', exact: true }).fill(validuser.password);
  await page.getByRole('textbox', { name: 'Digite sua senha novamente' }).fill(validuser.password);
  await page.getByRole('button', { name: 'Cadastrar' }).click();
 });

test('logar', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/front-end/login/login.html');
  await page.getByRole('textbox', { name: 'Digite seu e-mail' }).fill(validlogin.email);
  await page.getByRole('textbox', { name: 'Digite sua senha' }).fill(validlogin.pass);
  await page.getByRole('button', { name: 'Login' }).click();
});

})