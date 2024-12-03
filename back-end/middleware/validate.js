export function datacheck(template){
    return function (req,res,next){
    try{
    template.parse({
        headers: req.headers,
        body: req.body,
        query: req.query,
        params: req.params
    })
    next();
    }catch(error){
        return res.status(400).send(error.errors)
    }
}
}