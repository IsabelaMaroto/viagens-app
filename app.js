async function OrigemEDestino() {
  const get = await fetch("http://localhost:3000/countries");
  const response = await get.json();
  console.log(response);

  const POrigem = document.getElementById("p__origem");
  const COrigem = document.getElementById("c__origem");
  const PDestino = document.getElementById("p__destino");
  const CDestino = document.getElementById("c_destino");

  let todosPaises = response;
  let paisorigem = {};
  let paisdestino = {};

  let todasCidadesOrigem = {};
  let cidadeorigem = {};
  let todasCidadesDestino = {};
  let cidadedestino = {};

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
      const origem= document.getElementById('origem')
      origem.innerText = ("Origem: " + cidadeorigem.city + "(" + paisorigem.country +")" );
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
      const destino= document.getElementById('destino')
      destino.innerText = ("Destino: " + cidadedestino.city + "(" + paisdestino.country +")" );
    };
  }

  listPaisOrigem();
  escolhaPaisOrigem();
  escolhaCidadeOrigem();

  listaPaisDestino();
  escolhaPaisDestino();
  escolhaCidadeDestino();

}
OrigemEDestino();

function Age() {
  const inputAdultos = document.getElementById("adultos");
  const inputCriancas = document.getElementById("criancas");
  const somarAdultos = document.getElementById("btn__increment");
  const subtrairAdultos = document.getElementById("btn__decrement");
  const somarCriancas = document.getElementById("btn__incrementCrianca");
  const subtrairCriancas = document.getElementById("btn__decrementCrianca");
  const pessoas = document.getElementById("pessoas");

  let qtdAdultos = inputAdultos.value;
  let qtdCriancas = inputCriancas.value;

  pessoas.innerText = ("Adultos:" + qtdAdultos +  "Crianças:" + qtdCriancas)


  somarAdultos.onclick = () => {
    qtdAdultos++;
    inputAdultos.value = qtdAdultos;
    pessoas.innerText = ("Adultos:" + qtdAdultos +  "Crianças:" + qtdCriancas)
  };

  subtrairAdultos.onclick = () => {
    if (inputAdultos.value >= 2) {
      qtdAdultos--;
      inputAdultos.value = qtdAdultos;
      pessoas.innerText = ("Adultos:" + qtdAdultos + "Crianças:" + qtdCriancas)
    }
  };

  somarCriancas.onclick = () => {
    qtdCriancas++;
    inputCriancas.value = qtdCriancas;
    pessoas.innerText = ("Adultos:" + qtdAdultos + "Crianças:" + qtdCriancas)
    
  };

  subtrairCriancas.onclick = () => {
    if (inputCriancas.value >= 1) {
      qtdCriancas--;
      inputCriancas.value = qtdCriancas;
      pessoas.innerText = ("Adultos:" + qtdAdultos + "Crianças:" + qtdCriancas)
    }
  };

}
Age();

function Classe(){
  const economica = document.getElementById("economica");
  const executiva = document. getElementById("executiva");
  const tipo = document.getElementById("tipo");

  economica.checked = true;
  let classe = economica.value;
  tipo.innerText= ("Tipo de vôo:" + classe);

  economica.onclick=()=>{
    if(economica.checked = true){
      classe = economica.value
    }
    tipo.innerText= ("Tipo de vôo:" + classe);
  }
  executiva.onclick=()=>{
    if(executiva.checked = true){
      classe = executiva.value
    }
    tipo.innerText= ("Tipo de vôo:" + classe);
  }
}
Classe()

function Milhas(){
  const range = document.getElementById("milhas");
  const value = document.getElementById("value");
  const milhas = document.getElementById("milhasTotais");

  let qtdMilhas= 0;

  range.addEventListener('input', function() {
    value.innerText = range.value;
    qtdMilhas = range.value;
    milhas.innerText = ("Minha quantidade de milhas:" + qtdMilhas)
  });


}
Milhas()
