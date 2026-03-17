let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

let resumo = document.getElementById("resumo")

let total = 0

carrinho.forEach(p=>{
resumo.innerHTML+=`<p>${p.nome} x${p.qtd}</p>`
total+=p.preco*p.qtd
})

resumo.innerHTML+=`<h3>Total: R$ ${total}</h3>`

document.getElementById("pagamento").addEventListener("change", gerarPix)

function gerarPix(){

let tipo=document.getElementById("pagamento").value
let pixArea=document.getElementById("pixArea")

if(tipo=="pix"){

let codigo="00020126580014BR.GOV.BCB.PIX123456789"

let qr=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${codigo}`

pixArea.innerHTML=`
<h3>PIX Copia e Cola</h3>
<textarea>${codigo}</textarea>
<img src="${qr}" id="qrcode">
`

}else{
pixArea.innerHTML=""
}
}

function montarMensagem(){

let nome=document.getElementById("nome").value
let cpf=document.getElementById("cpf").value
let rua=document.getElementById("rua").value
let numero=document.getElementById("numero").value
let cidade=document.getElementById("cidade").value
let pagamento=document.getElementById("pagamento").value

let msg="Pedido:%0A"

carrinho.forEach(p=>{
msg+=`${p.nome} x${p.qtd}%0A`
})

msg+=`%0ANome: ${nome}`
msg+=`%0ACPF: ${cpf}`
msg+=`%0AEndereço: ${rua}, ${numero} - ${cidade}`
msg+=`%0APagamento: ${pagamento}`

return msg
}

function finalizar(){

let telefone="5511999999999"
let msg=montarMensagem()

window.open(`https://wa.me/${telefone}?text=${msg}`)

localStorage.removeItem("carrinho")
}

function finalizarWhats(){
finalizar()
}