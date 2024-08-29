const fileSizeLimit=(req,res,next)=>{
    const profils=req.files.profil
    const FILE_LIMIT= 5*1024*1024

    if(profils.size>FILE_LIMIT){
        return res.status(413).json({'status':'error','message':`file size is over than the recommande size of ${FILE_LIMIT}`})
    }
    next()
}
module.exports=fileSizeLimit