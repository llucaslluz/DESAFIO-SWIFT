document.addEventListener("DOMContentLoaded", () => {
  const pedidos = document.querySelectorAll(".pedido-card");

  pedidos.forEach(card => {
    const statusSpan = card.querySelector(".status");

    // Simulação: atualiza status a cada X segundos
    let currentStatus = statusSpan.classList.contains("em-andamento")
      ? "em-andamento"
      : statusSpan.classList.contains("pronto")
      ? "pronto"
      : "entregue";

    function updateStatus(newStatus, texto) {
      statusSpan.className = "status " + newStatus;
      statusSpan.textContent = texto;
    }

    if (currentStatus === "em-andamento") {
      setTimeout(() => {
        updateStatus("pronto", "Pronto para retirada");
      }, 5000);

      setTimeout(() => {
        updateStatus("entregue", "Entregue");
      }, 10000);
    }
  });
});
