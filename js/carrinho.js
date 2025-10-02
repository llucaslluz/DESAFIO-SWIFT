document.addEventListener("DOMContentLoaded", () => {
  const itensCarrinho = document.querySelector(".carrinho-itens");
  const sugestoesGrid = document.querySelector(".sugestoes-grid");

  let desconto = 0; // percentual aplicado (0 a 1)

  // === Simulação de cupons válidos ===
  const cuponsValidos = {
    "CUPOM10": 0.10,
    "CUPOM20": 0.20,
    "BLACKFRIDAY": 0.50
  };

  // === Simulação da tabela Sugestao_Produto ===
  const sugestoesMap = {
    "Bife de Chorizo": [
      { nome: "Pão de Alho Swift", preco: "R$ 12,90", img: "images/pao_alho.jpg" },
      { nome: "Guaraná 2L", preco: "R$ 8,50", img: "images/Guarana.jpg" }
    ],
    "Picanha": [
      { nome: "Farofa Swift", preco: "R$ 9,90", img: "images/Farofa.jpg" },
      { nome: "Cerveja Premium", preco: "R$ 6,50", img: "images/cerveja_premium.jpg" }
    ],
    "Frango": [
      { nome: "Arroz Temperado", preco: "R$ 15,90", img: "images/Arroz.jpg" },
      { nome: "Maionese de Batata", preco: "R$ 12,50", img: "images/Maionese.jpg" }
    ],
    "Costela Suína": [
      { nome: "Molho Barbecue", preco: "R$ 8,90", img: "images/Barbecue.jpg" }
    ],
    "Salmão": [
      { nome: "Vinho Branco", preco: "R$ 49,90", img: "images/VinhoBranco.jpg" }
    ],
    "Vegetais": [
      { nome: "Molho Vinagrete", preco: "R$ 7,90", img: "images/Vinagrete.jpg" }
    ],
    "Pudim": [
      { nome: "Café Swift", preco: "R$ 16,90", img: "images/Cafe.jpg" }
    ],
    "Nuggets": [
      { nome: "Suco de Laranja 1L", preco: "R$ 6,90", img: "images/SucoLaranja.jpg" }
    ],
    "Marmita": [
      { nome: "Mix de Salada", preco: "R$ 8,90", img: "images/Salada.jpg" }
    ]
  };

  // === Atualiza resumo do pedido ===
  function atualizarResumo() {
    let subtotal = 0;

    document.querySelectorAll(".carrinho-itens .item").forEach(item => {
      const precoTexto = item.querySelector(".preco").textContent.replace("R$", "").replace(",", ".").trim();
      const preco = parseFloat(precoTexto) || 0;
      const qtd = parseInt(item.querySelector("input[type='number']").value) || 1;
      subtotal += preco * qtd;
    });

    const frete = subtotal > 0 ? 15 : 0;
    let total = subtotal + frete;

    if (desconto > 0) {
      total = total - total * desconto;
    }

    // Atualiza na tela
    document.querySelector(".resumo p:nth-child(2) span").textContent = `R$ ${subtotal.toFixed(2)}`;
    document.querySelector(".resumo p:nth-child(3) span").textContent = `R$ ${frete.toFixed(2)}`;
    document.querySelector(".resumo .total span").textContent = `R$ ${total.toFixed(2)}`;
  }

  // === Cria novo item no carrinho ===
  function criarItem(nome, preco, img) {
    const novoItem = document.createElement("div");
    novoItem.className = "item";
    novoItem.innerHTML = `
      <img src="${img}" alt="${nome}">
      <div class="info">
        <h3>${nome}</h3>
        <p class="preco">${preco}</p>
        <div class="acoes">
          <input type="number" min="1" value="1">
          <button class="btn-remover">Remover</button>
        </div>
      </div>
    `;

    // Evento remover
    novoItem.querySelector(".btn-remover").addEventListener("click", () => {
      novoItem.remove();
      atualizarResumo();
    });

    // Evento alteração de quantidade
    novoItem.querySelector("input[type='number']").addEventListener("input", atualizarResumo);

    itensCarrinho.appendChild(novoItem);
    atualizarResumo();
  }

  // === Monta sugestões com base nos itens do carrinho ===
  sugestoesGrid.innerHTML = "";
  const itensAtuais = document.querySelectorAll(".carrinho-itens .item h3");

  itensAtuais.forEach(item => {
    const nomeProduto = item.textContent;

    for (let chave in sugestoesMap) {
      if (nomeProduto.includes(chave)) {
        sugestoesMap[chave].forEach(sug => {
          const card = document.createElement("div");
          card.className = "sugestao-card";
          card.innerHTML = `
            <img src="${sug.img}" alt="${sug.nome}">
            <h4>${sug.nome}</h4>
            <p class="preco">${sug.preco}</p>
            <button class="btn-add-sugestao">Adicionar</button>
          `;

          // Clique em "Adicionar"
          card.querySelector("button").addEventListener("click", () => {
            criarItem(sug.nome, sug.preco, sug.img);
          });

          sugestoesGrid.appendChild(card);
        });
      }
    }
  });

  // Caso não haja sugestões
  if (sugestoesGrid.innerHTML === "") {
    sugestoesGrid.innerHTML = "<p>Nenhuma sugestão disponível para os itens atuais.</p>";
  }

  // === Cupom de desconto ===
  const btnCupom = document.getElementById("btn-aplicar-cupom");
  if (btnCupom) {
    btnCupom.addEventListener("click", () => {
      const input = document.getElementById("input-cupom");
      const msg = document.getElementById("msg-cupom");
      const codigo = input.value.trim().toUpperCase();

      if (cuponsValidos[codigo]) {
        desconto = cuponsValidos[codigo];
        msg.textContent = `✅ Cupom aplicado! Desconto de ${(desconto * 100)}%.`;
        msg.className = "cupom-msg ok";
      } else {
        desconto = 0;
        msg.textContent = "❌ Cupom inválido.";
        msg.className = "cupom-msg erro";
      }

      atualizarResumo();
    });
  }

  // === Eventos iniciais em itens existentes ===
  document.querySelectorAll(".carrinho-itens input[type='number']").forEach(input => {
    input.addEventListener("input", atualizarResumo);
  });

  document.querySelectorAll(".carrinho-itens .btn-remover").forEach(btn => {
    btn.addEventListener("click", e => {
      e.target.closest(".item").remove();
      atualizarResumo();
    });
  });

  atualizarResumo();
});
document.addEventListener("DOMContentLoaded", () => {
  const itensCarrinho = document.querySelector(".carrinho-itens");
  let desconto = 0;

  const cuponsValidos = {
    "CUPOM10": 0.10,
    "CUPOM20": 0.20,
    "BLACKFRIDAY": 0.50
  };

  function atualizarResumo() {
    let subtotal = 0;
    document.querySelectorAll(".carrinho-itens .item").forEach(item => {
      const precoTexto = item.querySelector(".preco").textContent.replace("R$", "").replace(",", ".").trim();
      const preco = parseFloat(precoTexto) || 0;
      const qtd = parseInt(item.querySelector("input[type='number']").value) || 1;
      subtotal += preco * qtd;
    });

    const frete = subtotal > 0 ? 15 : 0;
    let total = subtotal + frete;

    if (desconto > 0) {
      total = total - total * desconto;
    }

    document.querySelector(".resumo p:nth-child(2) span").textContent = `R$ ${subtotal.toFixed(2)}`;
    document.querySelector(".resumo p:nth-child(3) span").textContent = `R$ ${frete.toFixed(2)}`;
    document.querySelector(".resumo .total span").textContent = `R$ ${total.toFixed(2)}`;
  }

  // Aplicar cupom manual
  const btnCupom = document.getElementById("btn-aplicar-cupom");
  if (btnCupom) {
    btnCupom.addEventListener("click", () => {
      const input = document.getElementById("input-cupom");
      const msg = document.getElementById("msg-cupom");
      const codigo = input.value.trim().toUpperCase();

      if (cuponsValidos[codigo]) {
        desconto = cuponsValidos[codigo];
        msg.textContent = `✅ Cupom aplicado! Desconto de ${(desconto * 100)}%.`;
        msg.className = "cupom-msg ok";
      } else {
        desconto = 0;
        msg.textContent = "❌ Cupom inválido.";
        msg.className = "cupom-msg erro";
      }

      atualizarResumo();
    });
  }

  // Cupom vindo da tela de Cupons
  const cupomSalvo = JSON.parse(localStorage.getItem("swift_cupomSelecionado"));
  if (cupomSalvo) {
    desconto = cupomSalvo.desconto;
    const msg = document.getElementById("msg-cupom");
    if (msg) {
      msg.textContent = `✅ Cupom ${cupomSalvo.codigo} aplicado automaticamente! Desconto de ${(desconto * 100)}%.`;
      msg.className = "cupom-msg ok";
    }
    localStorage.removeItem("swift_cupomSelecionado");
  }

  // Eventos dos itens
  document.querySelectorAll(".carrinho-itens input[type='number']").forEach(input => {
    input.addEventListener("input", atualizarResumo);
  });

  document.querySelectorAll(".carrinho-itens .btn-remover").forEach(btn => {
    btn.addEventListener("click", e => {
      e.target.closest(".item").remove();
      atualizarResumo();
    });
  });

  atualizarResumo();
});
