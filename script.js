var cartasFixed = [
  {
    nome: "Bulbassauro",
    atributos: { ataque: 7, defesa: 8, magia: 6 },
    img: "https://gartic.com.br/imgs/mural/jh/jhonfs/bulbassauro.png"
  },
  {
    nome: "Darth Vader",
    atributos: { ataque: 9, defesa: 8, magia: 2 },
    img: "https://sm.ign.com/ign_br/screenshot/default/darth-vader_5yvm.jpg"
  },
  {
    nome: "Shiryu",
    atributos: { ataque: 5, defesa: 9, magia: 10 },
    img:
      "https://pbs.twimg.com/profile_images/835464493119438849/i242Npy-_400x400.jpg"
  },
  {
    nome: "Neo",
    atributos: { ataque: 4, defesa: 10, magia: 8 },
    img:
      "https://img.estadao.com.br/thumbs/640/resources/jpg/7/6/1566336669167.jpg"
  },
  {
    nome: "Simba",
    atributos: { ataque: 8, defesa: 6, magia: 2 },
    img: "http://oreileao.com.br/wp-content/uploads/2012/09/images1.jpg"
  },
  {
    nome: "Harry Potter",
    atributos: { ataque: 3, defesa: 7, magia: 9 },
    img: "http://imagem.band.com.br/f_480959.jpg"
  },
  {
    nome: "Rambo",
    atributos: { ataque: 10, defesa: 1, magia: 1 },
    img:
      "https://observatoriodocinema.uol.com.br/wp-content/uploads/2021/07/rambo-1200-900.jpg"
  },
  {
    nome: "Rumpelstiltskin",
    atributos: { ataque: 2, defesa: 6, magia: 10 },
    img:
      "http://blog.cancaonova.com/livresdetodomal/files/2012/06/Rumpelstiltskin-Livres-de-todo-Mal.jpg"
  }
  // template de nova carta
  // {
  // nome: "",
  // atributos: { ataque: , defesa: , magia: },
  //   img: "",
  // }
];

var cartas = [...cartasFixed];

var cartaMaquina = 0;
var cartaJogador = 0;

var deckJogador = [];
var deckMaquina = [];
var pilhaEmpate = [];

var turnoJogador = true;

function sortearDecks() {
  cartas = [...cartasFixed];
  shuffle(cartas);
  deckJogador = [];
  deckMaquina = [];
  while (cartas.length) {
    deckJogador.push(cartas.shift());
    deckMaquina.push(cartas.shift());
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}

function sortearCarta() {
  cartaMaquina = deckMaquina.shift();
  cartaJogador = deckJogador.shift();

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  exibirCarta(cartaJogador, true);
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = ``;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  divCartaMaquina.innerHTML = moldura;
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
  if (jogador && turnoJogador) {
    for (var atributo in carta.atributos) {
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
    for (var atributo in carta.atributos) {
      opcoesTexto +=
        "<p> " + atributo + ": " + carta.atributos[atributo] + "</p>";
    }
  }

  var nome = `<p class="carta-subtitle">${carta.nome}</p>`;

  divCarta.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function obtemAtributoSelecionado() {
  var radioAtributos = document.getElementsByName("atributo");

  if (turnoJogador) {
    for (var i = 0; i < radioAtributos.length; i++) {
      if (radioAtributos[i].checked) {
        return radioAtributos[i].value;
      }
    }
  } else {
    if (
      cartaMaquina.atributos.ataque >= cartaMaquina.atributos.defesa &&
      cartaMaquina.atributos.ataque >= cartaMaquina.atributos.magia
    ) {
      return "ataque";
    } else if (
      cartaMaquina.atributos.defesa >= cartaMaquina.atributos.ataque &&
      cartaMaquina.atributos.defesa >= cartaMaquina.atributos.magia
    ) {
      return "defesa";
    } else {
      return "magia";
    }
  }
}

function jogar() {
  var atributoSelecionado = obtemAtributoSelecionado();
  var divResultado = document.getElementById("resultado");
  var valorCartaJogador = cartaJogador.atributos[atributoSelecionado];
  var valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];

  if (turnoJogador) {
    divResultado.innerHTML =
      "<p class='resultado-final'>Você escolheu " +
      atributoSelecionado +
      ".</p>";
  } else {
    divResultado.innerHTML =
      "<p class='resultado-final'>A máquina escolheu " +
      atributoSelecionado +
      ".</p>";
  }

  if (valorCartaMaquina > valorCartaJogador) {
    divResultado.innerHTML += "<p class='resultado-final'>Você Perdeu!</p>";
    deckMaquina.push(cartaJogador);
    deckMaquina.push(cartaMaquina);
    while (pilhaEmpate.length) {
      deckMaquina.push(pilhaEmpate.shift());
    }
    turnoJogador = false;
  } else if (valorCartaMaquina == valorCartaJogador) {
    divResultado.innerHTML += "<p class='resultado-final'>Empate!</p>";
    pilhaEmpate.push(cartaMaquina);
    pilhaEmpate.push(cartaJogador);
  } else {
    divResultado.innerHTML += "<p class='resultado-final'>Você Venceu!</p>";
    deckJogador.push(cartaMaquina);
    deckJogador.push(cartaJogador);
    while (pilhaEmpate.length) {
      deckJogador.push(pilhaEmpate.shift());
    }
    turnoJogador = true;
  }

  document.getElementById("btnJogar").disabled = true;
  exibirCarta(cartaMaquina, false);
  balance();
  if (deckJogador.length && deckMaquina.length) {
    document.getElementById("btnSortear").disabled = false;
  } else {
    document.getElementById("btnReset").disabled = false;
  }
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

  turnoJogador = true;

  sortearDecks();
  balance();
}

sortearDecks();

function balance() {
  var elementoQtd = document.getElementById("qtd");
  elementoQtd.innerHTML =
    deckJogador.length + " carta(s) VS " + deckMaquina.length + " carta(s)";
}

balance();
