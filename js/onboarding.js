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
