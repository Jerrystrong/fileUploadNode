const express=require('express')
const fileUpload = require("express-fileupload");
const PORT=process.env.PORT||3700
const path=require('path')
const app=express()
console.log(path.join(__dirname,'/public'))
app.use('/',express.static(path.join(__dirname,'/public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'Site','index.html'))
})

app.post('/upload',
    fileUpload({ createParentPath: true }),
    (req,res)=>{
    const profils=req.files
    console.log(profils)
    // const pathTo=path.join(__dirname,'files',profil.name)
    const profil=profils.profil
    console.log(profils.profil)
    const patht=path.join(__dirname,'files',profil.name)
    profil.mv(patht,(err)=>{
        if(err) return res.status(500).json({status:'error',message:err})
    })
    res.json({status:'success','message':`the file ${profil.name} have been saved succefully`})
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})