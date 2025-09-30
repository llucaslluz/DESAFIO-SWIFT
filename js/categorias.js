document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".filtros-inteligentes button");
  const cards = document.querySelectorAll(".card-categoria");

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      // Marca botão ativo
      botoes.forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");

      const filtro = btn.getAttribute("data-filtro");

      cards.forEach(card => {
        const tags = card.getAttribute("data-tags").split(" ");
        if (filtro === "all" || tags.includes(filtro)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
