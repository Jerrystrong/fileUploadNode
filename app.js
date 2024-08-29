const express=require('express')
const fileUpload = require("express-fileupload");
const fileMissing=require('./middleware/noFile')
const allowedExt=require('./middleware/allowedExt')
const fileSizeLimit=require('./middleware/fileSizeLimit')
const galerieControler=require('./controler/galerieControler')
const saveDb=require('./middleware/savingDb')
const PORT=process.env.PORT||3700
const path=require('path')
const app=express()
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.static(path.join(__dirname,'/files')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'Site','index.html'))
})
app.get('/galerie',(req,res)=>{
    res.sendFile(path.join(__dirname,'site','galerie.html'))
})

app.post('/upload',
    fileUpload({ createParentPath: true }),
    fileMissing,
    allowedExt(['.jpg','.jpeg','.png','.gif']),
    fileSizeLimit,
    saveDb,
    (req,res)=>{
    const profils=req.files
    const profil=profils.profil
    const patht=path.join(__dirname,'files',profil.name)
    profil.mv(patht,(err)=>{
        if(err) return res.status(500).json({status:'error',message:err})
    })
    res.json({status:'success','message':`the profil ${profil.name} have been saved succefully`})
})
app.get('/galeriepersonnel',galerieControler)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})