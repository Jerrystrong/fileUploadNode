const fileMissing=function(req,res,next){
    const profils=req.files
    if(!profils) return res.status(400).json({'status':'error','message':'fileMissing'})
    next()
}

module.exports=fileMissing