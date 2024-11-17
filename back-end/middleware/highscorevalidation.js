export default function numval(num){
    var num=num.toString()
    if(num.length<10){
        const resultado=num.match(/^\d+(\.\d+)?$/g)
        if(resultado){
          return true
        }
        }
        return false
}