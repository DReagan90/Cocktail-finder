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