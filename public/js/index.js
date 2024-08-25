const form=document.querySelector('form')
const profilField=document.querySelector('#profil')
const btnManuel=document.querySelector('.btnManuel')
let prevous=document.querySelector('.prevous')
let formCont=document.querySelector('.form')
let templateButton=document.querySelector('#button-template').content
// function to extrait data from template tag
/**
 * 
 * @param {HTMLElement} template 
 */
function extraictDataFromTemplate(template){
    let submitProfil=template.querySelector('.Submit-profil')
    let cancelProfil=template.querySelector('.cancelButton')
    console.log([submitProfil,cancelProfil])
    cancelProfil.addEventListener('click',(e)=>{
        location.replace('/')
    })
    return [submitProfil,cancelProfil]
}

// create elementFunction
/**
 * 
 * @param {HTMLElementTagNameMap} elTag 
 * @param {Attr} att 
 */
function createElement(elTag,att){
    const element= document.createElement(elTag)
    for (const [attr,val] of Object.entries(att)) {
        element.setAttribute(attr,val)
    }
    return element
}
profilField.addEventListener('change',(e)=>{
    console.log(e.currentTarget.files)
    let buttonCollection=extraictDataFromTemplate(templateButton)
    let divEl=createElement('div',{class:'btn-g'})
    let divCont=createElement('div',{class:'contB'})
    let para=createElement('div',{class:'textDesc'})
   
    buttonCollection.forEach(btn=>divEl.appendChild(btn))
    const file=e.currentTarget.files[0]
    const Freader=new FileReader()
    para.innerHTML=`
        <b><span class="under-line">Upload description</span></b><br>
        file name: ${file.name} <br>
        size:${file.size}

    `
    Freader.addEventListener('load',(evt)=>{
        let img=new Image()
        img.src=evt.currentTarget.result
        img.height=100
        img.width=100
        img.setAttribute('class','img-raduis')
        prevous.appendChild(img)
    })
    Freader.readAsDataURL(file)
    divCont.appendChild(divEl)
    divCont.appendChild(para)
    prevous.appendChild(divCont)
    prevous.classList.remove('none')
    formCont.classList.add('none')
    document.querySelector('.uploadPlace').classList.toggle('greenLight')
})

btnManuel.addEventListener('click',(e)=>{
    e.preventDefault()
    profilField.click()
})
document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    e.preventDefault()
    console.log('clicked')
    const fileSet=profilField.files[0]
    console.log(fileSet)
    const fData=new FormData()
    fData.append('profil',fileSet)
    // console.log(fData.profil)
    fData.forEach(dat=>{
        console.log(dat)
    })
    const sendFile= async () =>{
        try{
            const Fsend= await fetch('http://localhost:3700/upload',{
                method: 'POST',
                body: fData
            })
            const response= await Fsend.json()
            console.log(response)
            while(!response){
                form.classList.add('kabe')
            }

        }catch(e){
            console.log(e)  
        }
    }
    sendFile()
})