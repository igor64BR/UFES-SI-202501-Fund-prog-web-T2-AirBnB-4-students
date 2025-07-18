// const json = require("/__data-mocks/anuncios.json");

/**
 * 
 * @param {*} ad 
 */
const formatAdvertisement = (ad) => {
    return `
        <div class="anuncio">
            <img src="${ad.imagem}" alt="Imagem do Anúncio">
            <p>${ad.tipo} em ${ad.bairro}</p>
            <span>R$${ad.aluguel} por mês - ⭐${ad.avaliacao}</span>
        </div>
    `;
}

/**
 * @param {object[]} data 
 */
const handleData = (data, elementId) => {
    const anuncios = data.melhoresAvaliados
        .map(formatAdvertisement);

    console.log(anuncios);

    document.getElementById(elementId).innerHTML = anuncios.join("\n");
}

const fetchJson = async (jsonPath, elementId) => {
    const response = await fetch(jsonPath);
    const json = await response.json();

    handleData(json, elementId);
}

fetchJson("__data-mocks/top-avaliados.json", "melhores-avaliacoes");
fetchJson("__data-mocks/mais-proximos-ufes.json", "mais-proximos-ufes");
fetchJson("__data-mocks/mais-baratos.json", "mais-baratos");