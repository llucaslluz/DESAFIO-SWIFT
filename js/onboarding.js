document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("onboarding-overlay");
  const form = document.getElementById("onboarding-form");

  const currentUser = localStorage.getItem("swift.currentUser");
  if (!currentUser) return; // ninguém logado

  // Verifica se o usuário já tem onboarding salvo
  const onboarding = localStorage.getItem(`onboarding_${currentUser}`);
  if (!onboarding) {
    overlay.classList.remove("hidden");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const prefs = {
      cep: document.getElementById("ob-cep").value,
      modalidade: document.getElementById("ob-modalidade").value,
      beneficios: {
        cupom: document.getElementById("ob-cupom").checked,
        cashback: document.getElementById("ob-cashback").checked,
        whatsapp: document.getElementById("ob-whatsapp").checked
      },
      completed: true
    };

    // Salva só para o usuário logado
    localStorage.setItem(`onboarding_${currentUser}`, JSON.stringify(prefs));

    overlay.classList.add("hidden");
    alert("✅ Preferências salvas!");
  });
});

// Quando o usuário clicar em "Escolher Loja"
document.getElementById("btn-escolher-loja").addEventListener("click", () => {
  // Guarda que está escolhendo a loja no onboarding
  localStorage.setItem("swift.tempEscolhendoLoja", "true");
  window.location.href = "lojas.html"; // vai para a tela de lojas
});

// Quando voltar da página de lojas
const lojaSelecionada = localStorage.getItem("swift.lojaSelecionada");
if (lojaSelecionada) {
  document.getElementById("loja-selecionada").textContent =
    `Loja escolhida: ${lojaSelecionada}`;
  state.loja = lojaSelecionada; // já guarda no estado do onboarding
}

