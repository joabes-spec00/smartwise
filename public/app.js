let history = []

function novaConversa(){
history = []
document.getElementById("messages").innerHTML = ""
}

function addMessage(text,type){

let div = document.createElement("div")
div.className = "msg "+type
div.innerText = text

let messages = document.getElementById("messages")
messages.appendChild(div)
messages.scrollTop = messages.scrollHeight

return div
}

async function send(){

let input = document.getElementById("input")
let text = input.value

if(!text) return

addMessage(text,"user")

history.push({role:"user",content:text})

input.value=""

let botMsg = addMessage("Pensando, meu rei 👑...","bot")

try{

let res = await fetch("/api/stream",{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({history})
})

if(!res.ok){
botMsg.innerText = "Erro: backend não conectado"
return
}

let reader = res.body.getReader()
let decoder = new TextDecoder()

let full = ""

while(true){

const {done,value} = await reader.read()
if(done) break

let chunk = decoder.decode(value)
full += chunk
botMsg.innerText = full

}

history.push({role:"assistant",content:full})

}catch(e){
botMsg.innerText = "Erro de conexão"
}

}

async function gerarImagem(){

let texto = prompt("Descreva a imagem:")

if(!texto) return

let res = await fetch("/api/image",{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({prompt:texto})
})

let data = await res.json()

addMessage("Imagem: "+data.img,"bot")

}

function falar(){

let rec = new webkitSpeechRecognition()
rec.lang = "pt-BR"

rec.onresult = e=>{
document.getElementById("input").value = e.results[0][0].transcript
send()
}

rec.start()

  }
