const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const randomBtn = document.getElementById('random-btn');
const modeToggle = document.getElementById('mode-toggle');
const categoryFilter = document.getElementById('category-filter');
const cocktailContainer = document.getElementById('cocktail-container');
const body = document.body;

searchBtn.addEventListener('click', handleSearch);
randomBtn.addEventListener('click', fetchRandomCocktail);
modeToggle.addEventListener('click', toggleDarkMode);
categoryFilter.addEventListener('change', filterByCategory);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') handleSearch();
});
fetchCategories();
fetchPopularCocktails();

function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetchCocktailsByName(searchTerm);
    }
}

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}
function filterByCategory() {
    const category = categoryFilter.value;
    if (category) {
        fetchCocktailsByCategory(category);
    } else {
        fetchPopularCocktails();
    }
}
  
async function fetchRandomCocktail() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        displayCocktails(data.drinks);
    } catch (error) {
        console.error('Error fetching random cocktail:', error);
    }
}
 
async function fetchCocktailsByCategory(category) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        const cocktailDetails = await Promise.all(
            data.drinks.map(async drink => {
                const detailResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`);
                return detailResponse.json();
            })
        );
        const allDrinks = cocktailDetails.map(detail => detail.drinks[0]);
        displayCocktails(allDrinks);
    } catch (error) {
        console.error('Error fetching cocktails by category:', error);
    }
}
async function fetchCategories() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        
        // Use array iteration (forEach) to populate categories
        data.drinks.forEach(category => {
            const option = document.createElement('option');
            option.value = category.strCategory;
            option.textContent = category.strCategory;
            categoryFilter.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}