function addProduto(){

let nome=document.getElementById("nome").value
let preco=document.getElementById("preco").value
let imagem=document.getElementById("imagem").value

fetch("http://localhost:3000/produtos",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
nome,
preco,
imagem
})

})

alert("Produto adicionado")

}