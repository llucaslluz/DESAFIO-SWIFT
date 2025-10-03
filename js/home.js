document.addEventListener("DOMContentLoaded", () => {
  // Garante que o carrinho existe no localStorage
  if (!localStorage.getItem("swift.carrinho")) {
    localStorage.setItem("swift.carrinho", JSON.stringify([]));
  }

  // Seleciona todos os botões de "Adicionar"
  const botoes = document.querySelectorAll(".card button");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const card = botao.closest(".card");
      const nome = card.querySelector("h3").innerText;
      const preco = card.querySelector(".preco").innerText;
      const imagem = card.querySelector("img").src;

      // Lê carrinho atual
      let carrinho = JSON.parse(localStorage.getItem("swift.carrinho"));

      // Procura se já existe esse produto
      let existente = carrinho.find(p => p.nome === nome);

      if (existente) {
        existente.quantidade += 1;
      } else {
        carrinho.push({
          nome,
          preco,
          imagem,
          quantidade: 1
        });
      }

      // Salva de volta no localStorage
      localStorage.setItem("swift.carrinho", JSON.stringify(carrinho));

      // Feedback simples (pode virar toast futuramente)
      alert(`✅ ${nome} adicionado ao carrinho!`);
    });
  });
});
