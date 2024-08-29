const fsPromises=require('fs').promises
const userData={
    user: require('../model/galerie.json'),
    setUser: function(data){
        this.user=data
    }
}

const galerieControler=(req,res)=>{
    res.status(200).json({status:'succes',data:userData.user})
}

module.exports=galerieControler