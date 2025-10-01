document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".cupom-resgate input");
  const btnResgatar = document.querySelector(".cupom-resgate button");
  const lista = document.querySelector(".cupom-lista");

  // Cupons salvos no navegador
  function carregarCupons() {
    const cupons = JSON.parse(localStorage.getItem("swift_cupons")) || [];
    lista.innerHTML = "";

    if (cupons.length === 0) {
      lista.innerHTML = "<p>Nenhum cupom salvo ainda.</p>";
      return;
    }

    cupons.forEach(cupom => {
      const card = document.createElement("div");
      card.className = "cupom-card";
      card.innerHTML = `
        <h3>${cupom.titulo}</h3>
        <p>Válido até: ${cupom.validade}</p>
        <button>Aplicar</button>
      `;
      card.querySelector("button").addEventListener("click", () => {
        localStorage.setItem("swift_cupomSelecionado", cupom.codigo);
        alert(`✅ Cupom ${cupom.codigo} selecionado! Vá ao carrinho para aplicar.`);
        window.location.href = "carrinho.html";
      });
      lista.appendChild(card);
    });
  }

  // Resgatar novo cupom
  btnResgatar.addEventListener("click", () => {
    const codigo = input.value.trim().toUpperCase();
    if (!codigo) return;

    const cupons = JSON.parse(localStorage.getItem("swift_cupons")) || [];

    // regra simples de exemplo
    let desconto = 0.10;
    if (codigo === "BLACKFRIDAY") desconto = 0.50;
    if (codigo === "CUPOM20") desconto = 0.20;

    const novoCupom = {
      codigo,
      titulo: `${desconto * 100}% OFF`,
      validade: "31/12/2025",
      desconto
    };

    cupons.push(novoCupom);
    localStorage.setItem("swift_cupons", JSON.stringify(cupons));
    input.value = "";

    carregarCupons();
  });

  carregarCupons();
});
