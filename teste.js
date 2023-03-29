// formatar numero e dinheiro
const numberFormatter = new Intl.NumberFormat('pt-BR');
const moneyFormatter = new Intl.NumberFormat('pt-BR' , {
    style: 'currency',
    currency: 'BRL'
});
//funções auxiliares
function helperFormatNumber(number) {
    return numberFormatter.format(number);
}
function helperFormatCurrency(number) {
    return moneyFormatter.format(number);
}

// Variáveis - atribuir todo o html em variáveis;
let city; //... adicionar

// função iniciar - chamar ela no final
async function start(){
    await fetchCountries()
}

// Pegar os dados do JSON
async function fetchCountries(){
    const res = await fetch('') // passar tudo aqui do fetch

    render()
}

//Renderizar as funções
function render(){
    renderCountryOption();
    renderCityOption(); //.... adicionar tudo 
}

//Funções

function renderCountryOption(){

}

functionCityOption(){

}

// adicionar todas...




start();