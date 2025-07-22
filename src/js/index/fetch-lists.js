/**
 * @returns {string} SVG string for heart outline icon
 */
const HeartSVG = () => `
    <svg class="heart heart-outline" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
    </svg>
`;

/**
 * @returns {string} SVG string for heart filled icon
 */
const HeartFillSVG = () => `
    <svg class="heart heart-fill" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
    </svg>
`;

/**
 * Fetch JSON data from a given path and update the specified HTML element.
 * @param {string} jsonPath - The path to the JSON file.
 * @param {string} elementId - The ID of the HTML element to update.
 * @param {string} filter - The filter to apply to the data.
 */
const fetchJson = async (jsonPath, elementId, filter) => {
    const response = await fetch(jsonPath);
    const json = await response.json();

    handleData(json, elementId, filter);
}

/**
 * Handle the fetched data and update the specified HTML element.
 * @param {Object} data - The fetched JSON data.
 * @param {string} elementId - The ID of the HTML element to update.
 * @param {string} filter - The filter to apply to the data.
 */
const handleData = (data, elementId, filter) => {
    const filteredData = filter === "todos" 
        ? data.melhoresAvaliados 
        : data.melhoresAvaliados.filter(x => x.tipo === filter || filter === "todos")

    const anuncios = filteredData
        .map(formatAdvertisement);

    document.getElementById(elementId).innerHTML = anuncios.join("\n");
}

/**
 * Format an advertisement object into HTML.
 * @param {Object} ad - The advertisement object.
 * @returns {string} The formatted HTML string.
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

/**
 * Run filters on the advertisement data.
 * @param {string} filter - The filter to apply.
 */
const runFilters = (filter) => {
    fetchJson("./__data-mocks/top-avaliados.json", "melhores-avaliacoes", filter);
    fetchJson("./__data-mocks/mais-proximos-ufes.json", "mais-proximos-ufes", filter);
    fetchJson("./__data-mocks/mais-baratos.json", "mais-baratos", filter);
}

// Initial fetch and filter setup
runFilters("todos");

// Event listener for filter changes
document.getElementById("filtro-opcao-moradia")
    .addEventListener("change", (event) => runFilters(event.target.value));