import Database from "../database/database.js";

async function read_table(tabela){
    const banco = await Database.chamar();
    if (tabela){
        const sql=`
        SELECT * FROM ${tabela}
        `;
    
        const valores = await banco.all(sql);

    
        return valores;
    }
}

async function read_assets(name,tabela){
    const banco = await Database.chamar();
    if (name,tabela){
        const sql=`
        SELECT 
            dados 
        FROM 
            assets INNER JOIN ${tabela} ON assets.id = ${tabela}.id
        WHERE 
            nome = ?
        `;
    
        const valor = await banco.get(sql, [name]);
        
        return valor;
    }
}




export default { read_table, read_assets }