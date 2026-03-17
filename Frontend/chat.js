function toggleChat(){

document.getElementById("chatBoxContainer")
.classList.toggle("ativo")

}

function enviarPergunta(){

let pergunta=document.getElementById("pergunta").value
let chat=document.getElementById("chatBox")

chat.innerHTML+=`<p>Você: ${pergunta}</p>`

let resposta="Posso ajudar com produtos!"

chat.innerHTML+=`<p>IA: ${resposta}</p>`

}