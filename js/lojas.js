function mudarMapa(loja) {
  const mapa = document.getElementById("mapa-frame");

  const urls = {
    moema: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.591165382855!2d-46.66232512393407!3d-23.58267376206264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59d0b9d8932f%3A0x2b1c5c5c1!2sSwift%20Moema!5e0!3m2!1spt-BR!2sbr!4v1705000000000",
    pinheiros: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.591165382855!2d-46.68832512393407!3d-23.56067376206264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59d0b9d8932f%3A0x2b1c5c5c1!2sSwift%20Pinheiros!5e0!3m2!1spt-BR!2sbr!4v1705001111111",
    campinas: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.591165382855!2d-47.06232512393407!3d-22.90067376206264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59d0b9d8932f%3A0x2b1c5c5c1!2sSwift%20Campinas!5e0!3m2!1spt-BR!2sbr!4v1705002222222"
  };

  mapa.src = urls[loja];
}
