// Define acceso a contendio basado en roles de usuario. Responden a solicitudes HTTP y devuelven contenido específico
export function allAcces(req, res)  {
    res.status(200).json({msg: "Contenido Público"});
}
export function userContent(req, res)  {
    res.status(200).json({msg: "Contenido del Usuario"});
}
export function moderatorContent(req, res){
    res.status(200).json({msg:"Contenido del Moderador"})
}
export function adminContent(req, res){
    res.status(200).json({msg: "Contenido del Admin"})
}