import minedle from "../src/modos/minedle.js"
export default function interprete(relations,flag){
var modo = []
var dificuldade = []
if(flag){
for( let each of relations){
  const obj1 = each.mode
  const obj2 = each.difficulty
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
} else{
  const obj1 = relations.mode
  const obj2 = relations.difficulty
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
var json = '{ "valores" : ['
for(let each of modo){
    json+=`{"nome": "${each}",
    "dif_opcoes": [${dificuldade[index]}]},`
    ++index
}
json = json.substring(0,json.length-1)
json+="]}";
const obj=JSON.parse(json)

return obj
}
