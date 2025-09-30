// =======================
// Auth.js - Swift+ MVP
// =======================

// Ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (!form) return;

  // Detecta se estamos na tela de cadastro ou login
  if (document.body.classList.contains("cadastro")) {
    form.addEventListener("submit", handleCadastro);
  } else if (document.body.classList.contains("login")) {
    form.addEventListener("submit", handleLogin);
  }
});

// ============ Cadastro ============
function handleCadastro(e) {
  e.preventDefault();

  const nome = e.target.querySelector('input[type="text"]').value.trim();
  const email = e.target.querySelector('input[type="email"]').value.trim();
  const telefone = e.target.querySelector('input[type="tel"]').value.trim();
  const senha = e.target.querySelector('input[type="password"]').value.trim();

  if (!nome || !email || !telefone || !senha) {
    alert("⚠️ Preencha todos os campos!");
    return;
  }

  // Cria objeto usuário
  const user = { nome, email, telefone, senha };

  // Salva no localStorage usando o email como chave única
  localStorage.setItem(`swift_user_${email}`, JSON.stringify(user));

  alert("✅ Cadastro realizado com sucesso!");
  window.location.href = "login.html";
}

// ============ Login ============
function handleLogin(e) {
  e.preventDefault();

  const email = e.target.querySelector('input[type="email"]').value.trim();
  const senha = e.target.querySelector('input[type="password"]').value.trim();

  if (!email || !senha) {
    alert("⚠️ Preencha todos os campos!");
    return;
  }

  const savedUser = JSON.parse(localStorage.getItem(`swift_user_${email}`));

  if (!savedUser) {
    alert("❌ Nenhum usuário cadastrado com esse e-mail.");
    return;
  }

  if (savedUser.senha === senha) {
    alert(`🎉 Bem-vindo de volta, ${savedUser.nome}!`);

    // Marca o usuário atual
    localStorage.setItem("swift.currentUser", email);

    window.location.href = "/pages/entrada.html";
  } else {
    alert("❌ E-mail ou senha incorretos.");
  }
}


