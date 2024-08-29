const fsPromises=require('fs').promises
const userData={
    files: require('../model/galerie.json'),
    setUser: function(data){
        this.files=data
    }
}
const path=require('path')

const saveDb= async (req,res,next)=>{
    const profils=req.files.profil
    const fileId = userData.files[userData.files.length - 1] ? userData.files[userData.files.length - 1].id + 1 : 1
    const fileName=profils.name
    const fileType=profils.mimetype
    const newFile={
        "id":fileId,
        "name":fileName,
        "type":fileType
    }
    const allUser=[...userData.files,newFile]
    userData.setUser(allUser)
    fsPromises.writeFile(path.join(__dirname,'..','model','galerie.json'),JSON.stringify(userData.files))
    next()
}

module.exports=saveDb

