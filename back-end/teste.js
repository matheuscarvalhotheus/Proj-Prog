const a="2abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
const result =a.match(/^(?=.*[a-zA-Z])(?=.*[\d]).+$/g);
console.log( result)
