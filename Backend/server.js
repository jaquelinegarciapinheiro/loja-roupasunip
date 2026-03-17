const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let produtos = [

{
id:1,
nome:"Camiseta Oversized",
categoria:"camiseta",
preco:79.90,
imagem:"https://images.unsplash.com/photo-1520975922284-8b456906c813"
},

{
id:2,
nome:"Moletom Street",
categoria:"moletom",
preco:189.90,
imagem:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
},

{
id:3,
nome:"Jaqueta Jeans",
categoria:"jaqueta",
preco:249.90,
imagem:"https://images.unsplash.com/photo-1520975661595-6453be3f7070"
},

{
id:4,
nome:"Calça Cargo",
categoria:"calça",
preco:159.90,
imagem:"https://images.unsplash.com/photo-1516826957135-700dedea698c"
}

]

app.get("/produtos",(req,res)=>{
res.json(produtos)
})

app.post("/produtos",(req,res)=>{

const novo = {
id:produtos.length+1,
nome:req.body.nome,
categoria:req.body.categoria,
preco:req.body.preco,
imagem:req.body.imagem
}

produtos.push(novo)

res.json(novo)

})

app.listen(3000,()=>{
console.log("Servidor rodando na porta 3000")
})