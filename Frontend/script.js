const API_URL = "https://loja-backend-ias9.onrender.com";

// ELEMENTOS
const produtosContainer = document.getElementById("produtos");
const carrinhoBtn = document.getElementById("carrinho-btn");
const carrinhoSidebar = document.getElementById("carrinho");
const fecharCarrinho = document.getElementById("fechar-carrinho");
const carrinhoItens = document.getElementById("carrinho-itens");
const totalEl = document.getElementById("total");
const contadorCarrinho = document.getElementById("contador-carrinho");

// CARRINHO
let carrinho = [];

// ABRIR / FECHAR CARRINHO
carrinhoBtn.onclick = () => {
  carrinhoSidebar.classList.add("ativo");
};

fecharCarrinho.onclick = () => {
  carrinhoSidebar.classList.remove("ativo");
};

// BUSCAR PRODUTOS
async function carregarProdutos() {
  try {
    const res = await fetch(`${API_URL}/produtos`);
    const produtos = await res.json();

    produtosContainer.innerHTML = "";

    produtos.forEach(prod => {
      const div = document.createElement("div");
      div.classList.add("produto");

      div.innerHTML = `
        <img src="${prod.imagem}" />
        <h3>${prod.nome}</h3>
        <p>R$ ${prod.preco.toFixed(2)}</p>
        <button onclick='adicionarCarrinho(${JSON.stringify(prod)})'>
          Adicionar
        </button>
      `;

      produtosContainer.appendChild(div);
    });

  } catch (err) {
    produtosContainer.innerHTML = "<p>Erro ao carregar produtos 😢</p>";
    console.error(err);
  }
}

// ADICIONAR AO CARRINHO
function adicionarCarrinho(produto) {
  const item = carrinho.find(p => p.nome === produto.nome);

  if (item) {
    item.qtd++;
  } else {
    carrinho.push({ ...produto, qtd: 1 });
  }

  atualizarCarrinho();

  // animação botão (efeito pulo)
  event.target.style.transform = "scale(1.2)";
  setTimeout(() => {
    event.target.style.transform = "scale(1)";
  }, 200);
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {
  carrinhoItens.innerHTML = "";
  let total = 0;
  let totalItens = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.qtd;
    totalItens += item.qtd;

    const div = document.createElement("div");
    div.classList.add("item-carrinho");

    div.innerHTML = `
      <p>${item.nome}</p>
      <p>R$ ${item.preco.toFixed(2)}</p>
      <div>
        <button onclick="diminuirQtd(${index})">-</button>
        <span>${item.qtd}</span>
        <button onclick="aumentarQtd(${index})">+</button>
      </div>
    `;

    carrinhoItens.appendChild(div);
  });

  totalEl.innerText = total.toFixed(2);
  contadorCarrinho.innerText = totalItens;
}

// AUMENTAR
function aumentarQtd(index) {
  carrinho[index].qtd++;
  atualizarCarrinho();
}

// DIMINUIR
function diminuirQtd(index) {
  carrinho[index].qtd--;

  if (carrinho[index].qtd <= 0) {
    carrinho.splice(index, 1);
  }

  atualizarCarrinho();
}

// FINALIZAR PEDIDO (WHATSAPP)
function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  let mensagem = "🛍️ Pedido:\n\n";

  carrinho.forEach(item => {
    mensagem += `${item.nome} x${item.qtd} - R$ ${item.preco}\n`;
  });

  mensagem += "\nTotal: R$ " + totalEl.innerText;

  const numero = "5511957110772"; // coloque seu número
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}

// INICIAR
carregarProdutos();