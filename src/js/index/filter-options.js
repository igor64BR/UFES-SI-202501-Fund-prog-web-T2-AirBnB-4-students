// Filtros de opções de moradia
const filters = [
    {
        value: "todos",
        label: "Todos",
        image: "assets/img/cidade.png",
        default: true
    },
    {
        value: "apartamento",
        label: "Apartamentos",
        image: "assets/img/apartamento.jpg",
    },
    {
        value: "casa",
        label: "Casas",
        image: "assets/img/casa.png",
    },
    {
        value: "republica",
        label: "Repúblicas",
        image: "assets/img/sitio.jpg",
    }
];

/**
 * Render a filter option for housing type.
 * @param {Object} filterOpts - The filter options.
 * @returns {string} The HTML string for the filter option.
 */
const Filter = (filterOpts) => `
    <div class="opcao-moradia">
        <input 
            id="${filterOpts.value}" 
            name="opcao-moradia"
            value="${filterOpts.value}" 
            type="radio"
            ${filterOpts.default ? "checked" : ""}
        >
        <label for="${filterOpts.value}">
            <img src="${filterOpts.image}"
                alt="${filterOpts.label}">
            <span>${filterOpts.label}</span>
        </label>
    </div>
`;

// Render the filter options in the HTML element with ID "filtro-opcao-moradia"
document.getElementById("filtro-opcao-moradia")
    .innerHTML = filters.map(Filter).join("");
