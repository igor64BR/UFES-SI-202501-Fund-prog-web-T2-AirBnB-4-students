// const json = require("/__data-mocks/anuncios.json");

/**
 * 
 * @param {*} ad 
 */
const formatAdvertisement = (ad) => {
    return `
        <div class="anuncio">
            <div class="anuncio-imagem" style="background-image: url('${ad.imagem}')">
                <span class="favorite" style="opacity: ${ad.avaliacao >= 4.8 ? '1' : '0'}">Preferido</span>
                <div class="heart-container">
                    ${HeartFillSVG()}
                    ${HeartSVG()}
                </div>
            </div>
            <p>${ad.tipo} em ${ad.bairro}</p>
            <span>R$${ad.aluguel} por mês - ⭐${ad.avaliacao}</span>
        </div>
    `;
}

const HeartSVG = () => `
    <svg class="heart heart-outline" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
    </svg>
`;

const HeartFillSVG = () => `
    <svg class="heart heart-fill" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
    </svg>
`;

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