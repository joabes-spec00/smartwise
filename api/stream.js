export default async function handler(req,res){

try{

const response = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
"Content-Type":"application/json"
},
body: JSON.stringify({
model:"gpt-4o-mini",
messages:[
{
role:"system",
content:"Você chama o usuário de meu rei 👑"
},
{
role:"user",
content:req.body.msg
}
]
})
})

const data = await response.json()

res.status(200).json({
reply:data.choices[0].message.content
})

}catch(e){
res.status(500).json({reply:"Erro na IA"})
}

}
