let todosPaises;
let paisorigem;
let paisdestino;
let todasCidadesOrigem;
let cidadeorigem;
let todasCidadesDestino;
let cidadedestino;
let qtdAdultos;
let qtdCriancas;
let classe;
let qtdMilhas;
let distancia;
let precoPorAdulto;
let precoPorCrianca;
let precoMilhas;
let precoTotal;

async function OrigemEDestino() {
  const get = await fetch("http://localhost:3000/countries");
  const response = await get.json();
  console.log(response);

  const POrigem = document.getElementById("p__origem");
  const COrigem = document.getElementById("c__origem");
  const PDestino = document.getElementById("p__destino");
  const CDestino = document.getElementById("c_destino");

  todosPaises = response;

  function listPaisOrigem() {
    todosPaises.map((pais) => {
      const opcoesPO = document.createElement("option");
      POrigem.appendChild(opcoesPO);
      opcoesPO.innerHTML = pais.country;
    });
  }

  function escolhaPaisOrigem() {
    COrigem.disabled = true;
    POrigem.onchange = function () {
      COrigem.innerHTML = "";
      const opcoesCO = document.createElement("option");
      COrigem.appendChild(opcoesCO);
      todosPaises.map((pais) => {
        if (pais.country == POrigem.value) {
          paisorigem = pais;
        }
      });
      console.log("País de origem: ", paisorigem);
      listaCidadeOrigem();
    };
  }

  function listaCidadeOrigem() {
    COrigem.disabled = false;
    todasCidadesOrigem = paisorigem.cities;
    todasCidadesOrigem.map((cidades) => {
      const opcoesCO = document.createElement("option");
      opcoesCO.innerHTML = cidades.city;
      COrigem.appendChild(opcoesCO);
    });
  }

  function escolhaCidadeOrigem() {
    COrigem.onchange = function () {
      todasCidadesOrigem.map((cidade) => {
        if (cidade.city == COrigem.value) {
          cidadeorigem = cidade;
        }
      });
      const origem = document.getElementById("origem");
      origem.innerText =
        "Origem: " + cidadeorigem.city + "(" + paisorigem.country + ")";
      console.log("Cidade de origem:", cidadeorigem);
    };
  }

  function listaPaisDestino() {
    todosPaises.map((pais) => {
      const opcoesPD = document.createElement("option");
      PDestino.appendChild(opcoesPD);
      opcoesPD.innerHTML = pais.country;
    });
  }

  function escolhaPaisDestino() {
    CDestino.disabled = true;
    PDestino.onchange = () => {
      CDestino.innerHTML = "";
      const opcoesCD = document.createElement("option");
      CDestino.appendChild(opcoesCD);
      todosPaises.map((pais) => {
        if (pais.country == PDestino.value) {
          paisdestino = pais;
        }
      });
      console.log("País de Destino: ", paisdestino);
      listaCidadeDestino();
    };
  }

  function listaCidadeDestino() {
    CDestino.disabled = false;
    todasCidadesDestino = paisdestino.cities;
    todasCidadesDestino.map((cidades) => {
      if (cidades.city != cidadeorigem.city) {
        const opcoesCD = document.createElement("option");
        opcoesCD.innerHTML = cidades.city;
        CDestino.appendChild(opcoesCD);
      }
    });
  }

  function escolhaCidadeDestino() {
    CDestino.onchange = () => {
      todasCidadesDestino.map((cidade) => {
        if (cidade.city == CDestino.value) {
          cidadedestino = cidade;
        }
      });
      console.log("Cidade de Destino:", cidadedestino);
      const destino = document.getElementById("destino");
      destino.innerText =
        "Destino: " + cidadedestino.city + "(" + paisdestino.country + ")";
      if (cidadeorigem && cidadedestino) {
        Distancia();
      }
    };
  }

  listPaisOrigem();
  escolhaPaisOrigem();
  escolhaCidadeOrigem();

  listaPaisDestino();
  escolhaPaisDestino();
  escolhaCidadeDestino();
}

function QtdPessoas() {
  const inputAdultos = document.getElementById("adultos");
  const inputCriancas = document.getElementById("criancas");
  const somarAdultos = document.getElementById("btn__increment");
  const subtrairAdultos = document.getElementById("btn__decrement");
  const somarCriancas = document.getElementById("btn__incrementCrianca");
  const subtrairCriancas = document.getElementById("btn__decrementCrianca");
  const pessoas = document.getElementById("pessoas");

  qtdAdultos = inputAdultos.value;
  qtdCriancas = inputCriancas.value;

  pessoas.innerText = "Adultos:" + qtdAdultos + "Crianças:" + qtdCriancas;

  somarAdultos.onclick = () => {
    qtdAdultos++;
    inputAdultos.value = qtdAdultos;
    pessoas.innerText = "Adultos:" + qtdAdultos + "Crianças:" + qtdCriancas;
    Precos();
  };

  subtrairAdultos.onclick = () => {
    if (inputAdultos.value >= 2) {
      qtdAdultos--;
      inputAdultos.value = qtdAdultos;
      pessoas.innerText = "Adultos:" + qtdAdultos + "Crianças:" + qtdCriancas;
      Precos();
    }
  };

  somarCriancas.onclick = () => {
    qtdCriancas++;
    inputCriancas.value = qtdCriancas;
    pessoas.innerText = "Adultos:" + qtdAdultos + "Crianças:" + qtdCriancas;
    Precos();
  };

  subtrairCriancas.onclick = () => {
    if (inputCriancas.value >= 1) {
      qtdCriancas--;
      inputCriancas.value = qtdCriancas;
      pessoas.innerText = "Adultos:" + qtdAdultos + "Crianças:" + qtdCriancas;
      Precos();
    }
  };
}

function Classe() {
  const economica = document.getElementById("economica");
  const executiva = document.getElementById("executiva");
  const tipo = document.getElementById("tipo");

  economica.checked = true;
  classe = economica.value;
  tipo.innerText = "Tipo de vôo:" + classe;

  economica.onclick = () => {
    if ((economica.checked = true)) {
      classe = economica.value;
      tipo.innerText = "Tipo de vôo:" + classe;
      Precos();
    }
  };
  executiva.onclick = () => {
    if ((executiva.checked = true)) {
      classe = executiva.value;
      tipo.innerText = "Tipo de vôo:" + classe;
      Precos();
    }
  };
}

function Milhas() {
  const range = document.getElementById("milhas");
  const value = document.getElementById("value");
  const milhas = document.getElementById("milhasTotais");
  const valorMilhas = document.getElementById("valorMilhas");

  qtdMilhas = 0;
  value.innerText = 0;
  precoMilhas = 0;
  milhas.innerText = "Minha quantidade de milhas:" + qtdMilhas;
  valorMilhas.innerText = "Desconto das milhas:" + "R$" + precoMilhas;

  if (distancia && precoTotal) {
    range.disabled = false;

    range.addEventListener("input", function () {
      value.innerText = range.value;
      qtdMilhas = range.value;
      precoMilhas = qtdMilhas * 0.02;
      range.max = precoTotal / 0.02 - 1;
      milhas.innerText = "Minha quantidade de milhas:" + qtdMilhas;
      valorMilhas.innerText = "Desconto das milhas:" + "R$" + precoMilhas;
      Precos();
    });
  }
}

function Distancia() {
  const inputDistancia = document.getElementById("distancia");
  inputDistancia.innerText = "Distância:" + distancia + "Km";

  if (cidadeorigem != null && cidadedestino != null) {
    let theta = cidadeorigem.longitude - cidadedestino.longitude;
    let distance =
      60 *
      1.1515 *
      (180 / Math.PI) *
      Math.acos(
        Math.sin(cidadeorigem.latitude * (Math.PI / 180)) *
          Math.sin(cidadedestino.latitude * (Math.PI / 180)) +
          Math.cos(cidadeorigem.latitude * (Math.PI / 180)) *
            Math.cos(cidadedestino.latitude * (Math.PI / 180)) *
            Math.cos(theta * (Math.PI / 180))
      );

    distancia = Math.round(distance * 1.609344, 2);

    inputDistancia.innerText = "Distância:" + distancia + "Km";

    if (distancia) {
      Precos();
      Milhas();
      const total = document.getElementById("total");
      total.innerText = "Total:" + precoTotal;
      inputDistancia.innerText = "Distância:" + distancia + "Km";
    }
  } else {
    console.log("erro: distância não definida");
  }
}

function Precos() {
  const precoAdultos = document.getElementById("precoAdultos");
  const precoCriancas = document.getElementById("precoCriancas");
  const total = document.getElementById("total");

  precoAdultos.innerText = 0;
  precoCriancas.innerText = 0;

  if (distancia) {
    if (classe == "Classe Econômica") {
      if (paisorigem.country == paisdestino.country) {
        precoPorAdulto = qtdAdultos * distancia * 0.3;
        precoPorCrianca = qtdCriancas * distancia * 0.15;
      } else if (paisorigem.country != paisdestino.country) {
        precoPorAdulto = distancia * 0.5;
        precoPorCrianca = distancia * 0.25;
      }
    } else if (classe == "Classe Executiva") {
      if (paisorigem.country == paisdestino.country) {
        precoPorAdulto = qtdAdultos * distancia * 0.3 * 1.8;
        precoPorCrianca = qtdCriancas * distancia * 0.15 * 1.4;
      } else if (paisorigem.country != paisdestino.country) {
        precoPorAdulto = distancia * 0.5 * 1.8;
        precoPorCrianca = distancia * 0.25 * 1.4;
      }
    }

    precoAdultos.innerText = "R$" + precoPorAdulto.toFixed(2);
    precoCriancas.innerText = "R$" + precoPorCrianca.toFixed(2);

    precoTotal = precoPorAdulto + precoPorCrianca;

    total.innerText = "Total:" + precoTotal.toFixed(2);
    if (qtdMilhas > 0) {
      precoTotal = precoTotal - qtdMilhas * 0.02;
      total.innerText = "Total:" + precoTotal.toFixed(2);
    }
  }
}

function Submit() {
  const submit = document.getElementById("submit");
  const hide = document.getElementById("resumo");
  hide.style.display = "none";

  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  
  submit.onclick = () => {
    if (distancia) {
      hide.style.display = "block";
    }

    const pessoas = document.getElementById("pessoas");
    pessoas.innerText = "Adultos:" + qtdAdultos + "Crianças:" + qtdCriancas;

    const tipo = document.getElementById("tipo");
    tipo.innerText = "Tipo de vôo:" + classe;

    const milhas = document.getElementById("milhasTotais");
    milhas.innerText = "Quantidade de milhas:" + qtdMilhas;

    const inputDistancia = document.getElementById("distancia");
    inputDistancia.innerText = "Distância:" + distancia + "Km";

    const precoAdultos = document.getElementById("precoAdultos");
    precoAdultos.innerText = "Preço por adulto:" + "R$" + precoPorAdulto;

    const precoCriancas = document.getElementById("precoCriancas");
    precoCriancas.innerText = "Preço por criança:" + "R$" + precoPorCrianca;

    const valorMilhas = document.getElementById("valorMilhas");
    valorMilhas.innerText = "Desconto das milhas:" + "R$" + precoMilhas;

    const total = document.getElementById("total");
    total.innerText = "Total:" + precoTotal;

    const range = document.getElementById("milhas");
    range.max = precoTotal / 0.02 - 1;
  };
}

OrigemEDestino();
QtdPessoas();
Classe();
Milhas();
Precos();
Submit();
