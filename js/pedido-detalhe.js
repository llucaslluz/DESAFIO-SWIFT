document.addEventListener("DOMContentLoaded", () => {
  // === 1. Pega o ID da URL ===
  const params = new URLSearchParams(window.location.search);
  const pedidoId = params.get("id") || "00000";

  // === 2. Preenche na página ===
  document.getElementById("pedido-id").textContent = pedidoId;

  // Aqui você pode puxar dados reais futuramente
  const dataPedido = "15/09/2025"; 
  document.getElementById("pedido-data").textContent = dataPedido;

  // === 3. QR Code dinâmico ===
  const qr = new QRious({
    element: document.getElementById("pedido-qr"),
    value: `SWIFT_PEDIDO_${pedidoId}`,
    size: 200,
    background: 'white',
    foreground: '#d62828'
  });

  // === 4. Status Dinâmico ===
  const steps = ["step1", "step2", "step3"];
  let current = 0;

  function updateStatus() {
    steps.forEach((id, idx) => {
      document.getElementById(id).classList.toggle("active", idx === current);
    });

    const notif = document.createElement("li");
    notif.textContent =
      current === 0
        ? "🍳 Seu pedido está em preparo."
        : current === 1
        ? "✅ Pedido pronto para retirada!"
        : "🎉 Pedido retirado com sucesso.";
    document.getElementById("notificacoes-list").appendChild(notif);

    // Atualiza o span de status principal
    const pedidoStatus = document.getElementById("pedido-status");
    if (current === 0) {
      pedidoStatus.textContent = "Em andamento";
      pedidoStatus.className = "status em-andamento";
    } else if (current === 1) {
      pedidoStatus.textContent = "Pronto para retirada";
      pedidoStatus.className = "status pronto";
    } else {
      pedidoStatus.textContent = "Entregue";
      pedidoStatus.className = "status entregue";
    }
  }

  updateStatus();

  // Simula mudança de status
  setInterval(() => {
    if (current < steps.length - 1) {
      current++;
      updateStatus();
    }
  }, 5000);
});
