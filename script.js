var cartas = [
  {
    nome: "Bulbassauro",
    atributos: { ataque: 7, defesa: 8, magia: 6 },
    img:
      "http://pm1.narvii.com/6223/11335ffde96efad386b23068bb8751d77e26c1ef_00.jpg"
  },
  {
    nome: "Darth Vader",
    atributos: { ataque: 9, defesa: 8, magia: 2 },
    img:
      "https://a-static.mlcdn.com.br/1500x1500/boneco-darth-vader-olympus-star-wars-hasbro/toymaniabrinquedos/77093/eee45ee57ee0aed7d8b70091dba0813f.jpg"
  },
  {
    nome: "Shiryu",
    atributos: { ataque: 5, defesa: 9, magia: 10 },
    img:
      "https://static3.tcdn.com.br/img/img_prod/460977/action_figure_shiryu_dragon_shiryu_os_cavaleiros_do_zodiaco_saint_seiya_saint_cloth_myth_revival_ver_49959_1_20201211173104.jpg"
  },
  {
    nome: "Neo",
    atributos: { ataque: 4, defesa: 10, magia: 8 },
    img:
      "https://img.estadao.com.br/thumbs/640/resources/jpg/7/6/1566336669167.jpg"
  }
  // template de nova carta
  // {
  // nome: "",
  // atributos: { ataque: , defesa: , magia: },
  //   img: "",
  // }
];

var cartaMaquina = 0;
var cartaJogador = 0;

function sortearCarta() {
  var indiceCartaMaquina = parseInt(Math.random() * cartas.length);
  cartaMaquina = cartas[indiceCartaMaquina];

  do {
    var indiceCartaJogador = parseInt(Math.random() * cartas.length);
  } while (indiceCartaJogador == indiceCartaMaquina);
  cartaJogador = cartas[indiceCartaJogador];

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  exibirCarta(cartaJogador, true);
}

function exibirCarta(carta, jogador) {
  if (jogador) {
    var divCarta = document.getElementById("carta-jogador");
  } else {
    var divCarta = document.getElementById("carta-maquina");
  }
  divCarta.style.backgroundImage = `url(${carta.img})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var opcoesTexto = "";
  if (jogador) {
    for (var atributo in cartaJogador.atributos) {
      opcoesTexto +=
        "<input type='radio' name='atributo' checked='true' value='" +
        atributo +
        "'>" +
        atributo +
        ": " +
        carta.atributos[atributo] +
        "<br>";
    }
  } else {
    for (var atributo in cartaMaquina.atributos) {
      opcoesTexto +=
        "<p> " + atributo + ": " + cartaMaquina.atributos[atributo] + "</p>";
    }
  }

  var nome = `<p class="carta-subtitle">${carta.nome}</p>`;

  divCarta.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function obtemAtributoSelecionado() {
  var radioAtributos = document.getElementsByName("atributo");

  for (var i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked) {
      return radioAtributos[i].value;
    }
  }
}

function jogar() {
  var atributoSelecionado = obtemAtributoSelecionado();
  var divResultado = document.getElementById("resultado");
  var valorCartaJogador = cartaJogador.atributos[atributoSelecionado];
  var valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];

  if (valorCartaMaquina > valorCartaJogador) {
    divResultado.innerHTML = "<p class='resultado-final'>Você Perdeu!</p>";
  } else if (valorCartaMaquina == valorCartaJogador) {
    divResultado.innerHTML = "<p class='resultado-final'>Empate!</p>";
  } else {
    divResultado.innerHTML = "<p class='resultado-final'>Você Venceu!</p>";
  }

  document.getElementById("btnJogar").disabled = true;
  exibirCarta(cartaMaquina, false);
  document.getElementById("btnReset").disabled = false;
}

function reset() {
  var elementoResultado = document.getElementById("resultado");
  elementoResultado.innerHTML = "";
  var divCartaMaquina = document.getElementById("carta-maquina");
  var divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.style.backgroundImage = ``;
  divCartaMaquina.style.backgroundImage = ``;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  divCartaJogador.innerHTML = moldura;
  divCartaMaquina.innerHTML = moldura;

  document.getElementById("btnSortear").disabled = false;
  document.getElementById("btnReset").disabled = true;
}
