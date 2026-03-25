function addMessage(text,type){
let div = document.createElement("div")
div.className = "msg "+type
div.innerText = text
let messages = document.getElementById("messages")
messages.appendChild(div)
messages.scrollTop = messages.scrollHeight
return div
}

function novaConversa(){
document.getElementById("messages").innerHTML = ""
}

async function send(){

let input = document.getElementById("input")
let text = input.value

if(!text) return

addMessage(text,"user")
input.value=""

let botMsg = addMessage("Pensando, meu rei 👑...","bot")

try{

let res = await fetch("/api/stream",{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({msg:text})
})

let data = await res.json()

botMsg.innerText = data.reply

}catch(e){
botMsg.innerText = "Erro: backend não conectado"
}

}

async function gerarImagem(){

let prompt = prompt("Descreva a imagem")

if(!prompt) return

let res = await fetch("/api/image",{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({prompt})
})

let data = await res.json()

addMessage("Imagem: "+data.url,"bot")

}
