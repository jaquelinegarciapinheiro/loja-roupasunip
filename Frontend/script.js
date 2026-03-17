const produtosDiv = document.getElementById("produtos")

let produtos = []
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

fetch("https://loja-backend-ias9.onrender.com/produtos")
.then(res=>res.json())
.then(data=>{
produtos=data
renderProdutos(data)
renderCarrinho()
})

function renderProdutos(lista){
produtosDiv.innerHTML=""

lista.forEach(p=>{
produtosDiv.innerHTML+=`
<div class="card">
<img src="${p.imagem}">
<h3>${p.nome}</h3>
<p>R$ ${p.preco}</p>
<button onclick="addCarrinho('${p.nome}',${p.preco})">
Adicionar
</button>
</div>
`
})
}

function abrirCarrinho(){
document.getElementById("carrinho").classList.toggle("ativo")
}

function addCarrinho(nome,preco){

let item = carrinho.find(p=>p.nome==nome)

if(item){
item.qtd++
}else{
carrinho.push({nome,preco,qtd:1})
}

localStorage.setItem("carrinho",JSON.stringify(carrinho))

mostrarAlerta()
renderCarrinho()
}

function mostrarAlerta(){
let alerta=document.getElementById("alerta")
alerta.style.display="block"

setTimeout(()=>{
alerta.style.display="none"
},1500)
}

function removerItem(index){
carrinho.splice(index,1)
localStorage.setItem("carrinho",JSON.stringify(carrinho))
renderCarrinho()
}

function renderCarrinho(){

let lista=document.getElementById("listaCarrinho")
lista.innerHTML=""

let total=0
let totalItens=0

carrinho.forEach((p,i)=>{
lista.innerHTML+=`
<p>
${p.nome} x${p.qtd} - R$ ${p.preco}
<button onclick="removerItem(${i})">❌</button>
</p>
`
total+=p.preco*p.qtd
totalItens+=p.qtd
})

document.getElementById("total").innerText="Total: R$ "+total
document.getElementById("contador").innerText=totalItens
}

function irCheckout(){
window.location.href="checkout.html"
}