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


const hide = document.getElementById("resumo");
hide.style.display = "none";

const numberFormatter = new Intl.NumberFormat("pt-BR");
const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});


function helperFormatValue(value) {
  return numberFormatter.format(value);
}

function helperFormatMoney(value) {
  return moneyFormatter.format(value);
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

async function OrigemEDestino() {
  const get = await fetch("http://localhost:3000/countries");
  const response = await get.json();

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
      origem.innerText = cidadeorigem.city + "(" + paisorigem.country + ")";
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
      const destino = document.getElementById("destino");
      destino.innerText = cidadedestino.city + "(" + paisdestino.country + ")";
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
  const resultadoAdultos = document.getElementById("resultadoAdultos");
  const resultadoCriancas = document.getElementById("resultadoCriancas");

  qtdAdultos = inputAdultos.value;
  qtdCriancas = inputCriancas.value;

  resultadoAdultos.innerText = qtdAdultos;
  resultadoCriancas.innerText = qtdCriancas;

  somarAdultos.onclick = () => {
    qtdAdultos++;
    inputAdultos.value = qtdAdultos;
    resultadoAdultos.innerText = qtdAdultos;
    Precos();
  };

  subtrairAdultos.onclick = () => {
    if (inputAdultos.value >= 2) {
      qtdAdultos--;
      inputAdultos.value = qtdAdultos;
      resultadoAdultos.innerText = qtdAdultos;
      Precos();
    }
  };

  somarCriancas.onclick = () => {
    qtdCriancas++;
    inputCriancas.value = qtdCriancas;
    resultadoCriancas.innerText = qtdCriancas;
    Precos();
  };

  subtrairCriancas.onclick = () => {
    if (inputCriancas.value >= 1) {
      qtdCriancas--;
      inputCriancas.value = qtdCriancas;
      resultadoCriancas.innerText = qtdCriancas;
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
  tipo.innerText = classe;

  economica.onclick = () => {
    if ((economica.checked = true)) {
      classe = economica.value;
      tipo.innerText = classe;
      Precos();
    }
  };
  executiva.onclick = () => {
    if ((executiva.checked = true)) {
      classe = executiva.value;
      tipo.innerText = classe;
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
  milhas.innerText = qtdMilhas;
  valorMilhas.innerText = `${helperFormatMoney(precoMilhas)}`

  if (distancia && precoTotal) {
    range.disabled = false;

    range.addEventListener("input", function () {
      value.innerText = range.value;
      qtdMilhas = range.value;
      precoMilhas = qtdMilhas * 0.02;
      range.max = precoTotal / 0.02 - 1;
      milhas.innerText = `${helperFormatValue(qtdMilhas)}`;
      valorMilhas.innerText = `${helperFormatMoney(precoMilhas)}`
      Precos();
    });
  }
}

function Distancia() {
  const inputDistancia = document.getElementById("distancia");

  const EARTH_RADIUS = 6_371.071; // Earth
  const diffLatitudeRadians = degreesToRadians(
    cidadedestino.latitude - cidadeorigem.latitude
  );
  const diffLongitudeRadians = degreesToRadians(
    cidadedestino.longitude - cidadeorigem.longitude
  );
  const originLatitudeRadians = degreesToRadians(cidadeorigem.latitude);
  const destinationLatitudeRadians = degreesToRadians(cidadedestino.latitude);
  let kmDistance =
    2 *
    EARTH_RADIUS *
    Math.asin(
      Math.sqrt(
        Math.sin(diffLatitudeRadians / 2) * Math.sin(diffLatitudeRadians / 2) +
          Math.cos(originLatitudeRadians) *
            Math.cos(destinationLatitudeRadians) *
            Math.sin(diffLongitudeRadians / 2) *
            Math.sin(diffLongitudeRadians / 2)
      )
    );
  distancia = kmDistance
  inputDistancia.innerText = `${distancia} km`;
  Precos();
  Milhas();
  const total = document.getElementById("total");
  total.innerText = `${helperFormatMoney(precoTotal)}`;
}

function Precos() {
  const precoAdultos = document.getElementById("precoAdultos");
  const precoCriancas = document.getElementById("precoCriancas");
  const total = document.getElementById("total");

  precoAdultos.innerText = `${helperFormatMoney(precoPorAdulto)}`
  precoCriancas.innerText = `${helperFormatMoney(precoPorCrianca)}`

  if (distancia) {
    if (classe == "Classe Econômica") {
      if (paisorigem.country == paisdestino.country) {
        precoPorAdulto = qtdAdultos * distancia * 0.3;
        precoPorCrianca = qtdCriancas * distancia * 0.15;
      } else if (paisorigem.country != paisdestino.country) {
        precoPorAdulto = qtdAdultos * distancia * 0.5;
        precoPorCrianca = qtdCriancas * distancia * 0.25;
      }
    } else if (classe == "Classe Executiva") {
      if (paisorigem.country == paisdestino.country) {
        precoPorAdulto = qtdAdultos * distancia * 0.3 * 1.8;
        precoPorCrianca = qtdCriancas * distancia * 0.15 * 1.4;
      } else if (paisorigem.country != paisdestino.country) {
        precoPorAdulto =  qtdAdultos * distancia * 0.5 * 1.8;
        precoPorCrianca = qtdCriancas * distancia * 0.25 * 1.4;
      }
    }

    precoAdultos.innerText = `${helperFormatMoney(precoPorAdulto)}`
    precoCriancas.innerText = `${helperFormatMoney(precoPorCrianca)}`

    

    if (qtdMilhas > 0) {
      precoTotal = (precoPorAdulto + precoPorCrianca ) - precoMilhas;
      total.innerText = `${helperFormatMoney(precoTotal)}`
    } else{
      precoTotal = precoPorAdulto + precoPorCrianca;
      total.innerText = `${helperFormatMoney(precoTotal)}`
    }
  }
}

function Submit() {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  if(distancia){
      hide.style.display = "block";
  
      const resultadoAdultos = document.getElementById("resultadoAdultos");
      resultadoAdultos.innerText = qtdAdultos;
  
      const resultadoCriancas = document.getElementById("resultadoCriancas");
      resultadoCriancas.innerText = qtdCriancas;
  
      const tipo = document.getElementById("tipo");
      tipo.innerText = `${classe}`;
  
      const milhas = document.getElementById("milhasTotais");
      milhas.innerText = `${helperFormatValue(qtdMilhas)}`;
  
      const inputDistancia = document.getElementById("distancia");
      inputDistancia.innerText = `${helperFormatValue(distancia)} km`;
  
      const precoAdultos = document.getElementById("precoAdultos");
      precoAdultos.innerText = `${helperFormatMoney(precoPorAdulto)}`;
  
      const precoCriancas = document.getElementById("precoCriancas");
      precoCriancas.innerText = `${helperFormatMoney(precoPorCrianca)}`;
  
      const valorMilhas = document.getElementById("valorMilhas");
      valorMilhas.innerText = `${helperFormatMoney(precoMilhas)}`;
  
      const total = document.getElementById("total");
      total.innerText = `${helperFormatMoney(precoTotal)}`;
  
      const range = document.getElementById("milhas");
      range.max = (precoTotal / 0.02) - 1;
    
  }
  
}

OrigemEDestino();
QtdPessoas();
Classe();
Milhas();
Precos();

