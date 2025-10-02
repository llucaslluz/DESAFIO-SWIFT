document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("codigo-cupom");
  const btnResgatar = document.getElementById("btn-resgatar");
  const lista = document.getElementById("lista-cupons");

  // Exemplos iniciais
  const cuponsIniciais = [
    { codigo: "CUPOM10", titulo: "10% OFF em Carnes", validade: "30/10/2025", desconto: 0.10 },
    { codigo: "CUPOM20", titulo: "20% OFF em Peixes", validade: "15/11/2025", desconto: 0.20 },
    { codigo: "BLACKFRIDAY", titulo: "50% OFF na Black Friday", validade: "30/11/2025", desconto: 0.50 }
  ];

  // Carregar do localStorage ou criar iniciais
  let cupons = JSON.parse(localStorage.getItem("swift_cupons")) || cuponsIniciais;
  localStorage.setItem("swift_cupons", JSON.stringify(cupons));

  function carregarCupons() {
    lista.innerHTML = "";
    cupons.forEach(cupom => {
      const card = document.createElement("div");
      card.className = "cupom-card";
      card.innerHTML = `
        <h3>${cupom.titulo}</h3>
        <p>Código: <strong>${cupom.codigo}</strong></p>
        <p>Válido até: ${cupom.validade}</p>
        <button>Aplicar</button>
      `;
      card.querySelector("button").addEventListener("click", () => {
        localStorage.setItem("swift_cupomSelecionado", JSON.stringify(cupom));
        alert(`✅ Cupom ${cupom.codigo} selecionado! Vá ao carrinho para aplicar.`);
        window.location.href = "carrinho.html";
      });
      lista.appendChild(card);
    });
  }

  btnResgatar.addEventListener("click", () => {
    const codigo = input.value.trim().toUpperCase();
    if (!codigo) return;

    let desconto = 0.05;
    if (codigo === "CUPOM10") desconto = 0.10;
    if (codigo === "CUPOM20") desconto = 0.20;
    if (codigo === "BLACKFRIDAY") desconto = 0.50;

    const novoCupom = {
      codigo,
      titulo: `${desconto * 100}% OFF Especial`,
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
