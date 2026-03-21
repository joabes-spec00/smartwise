export default async function handler(req,res){

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
"Content-Type":"application/json"
},

body: JSON.stringify({
model:"gpt-4o-mini",
stream:true,

messages:[
{
role:"system",
content:`
Você é a IA do Smart Wise.

Regras:
- Sempre chame o usuário de "meu rei 👑"
- Seja inteligente e rápida
- Responda de forma clara e profissional
`
},
...req.body.history
]

})

})

res.setHeader("Content-Type","text/plain")

response.body.pipe(res)

}
