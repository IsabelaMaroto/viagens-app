async function App() {
  const get = await fetch("http://localhost:3000/countries");
  const response = await get.json();
  console.log(response);

  const POrigem = document.getElementById("p__origem");
  const COrigem = document.getElementById("c__origem");
  const PDestino = document.getElementById("p__destino");
  const CDestino = document.getElementById("c_destino");

  let cidadeorigem = {};
  let cidadedestino = "";
  let paisorigem = {};
  let paisdestino = {};

  response.map(function (item, index) {
    const countries = item;
    const optionsPO = document.createElement("option");
    optionsPO.innerText = countries.country;
    POrigem.appendChild(optionsPO);

    POrigem.onchange = function () {
      console.log("país de origem:", POrigem.value);

      response.map((pais) => {
        if (pais.country == POrigem.value) {
          paisorigem = pais;

          const cidadesO = pais.cities;
          COrigem.innerHTML = "";
          cidadesO.map((city) => {
            console.log(city);

            const optionsCO = document.createElement("option");
            optionsCO.innerText = city.city;
            COrigem.appendChild(optionsCO);
          });
          PDestino.innerHTML = "";
          response.map(function (item, index) {
            if (paisorigem !== item) {
              const optionsPD = document.createElement("option");
              optionsPD.innerText = item.country;
              PDestino.appendChild(optionsPD);

              PDestino.onchange = function () {
                console.log("país de destino:", PDestino.value);
                response.map((paisD) => {
                  if (paisD.country == PDestino.value) {
                    paisdestino = paisD;
                    const cidadesD = paisD.cities;
                    CDestino.innerHTML = "";

                    cidadesD.map((city) => {
                      const optionsCD = document.createElement("option");
                      optionsCD.innerText = city.city;
                      CDestino.appendChild(optionsCD);
                    });

                  }
                });
              };
            }
          });
        }
      });
      console.log(paisorigem);
    };
  });
}
App();
