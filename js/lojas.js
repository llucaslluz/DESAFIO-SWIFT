function selecionarLoja(nome) {
  // Salva no localStorage
  localStorage.setItem("swift.lojaSelecionada", nome);

  // Se o usuário veio do onboarding → volta para index
  if (localStorage.getItem("swift.tempEscolhendoLoja") === "true") {
    localStorage.removeItem("swift.tempEscolhendoLoja");
    alert(`✅ Loja "${nome}" selecionada com sucesso!`);
    window.location.href = "index.html";
  }
}
