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
async function fetchCocktailsByName(name) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();
        if (data.drinks) {
            displayCocktails(data.drinks);
        } else {
            cocktailContainer.innerHTML = '<p>No cocktails found. Please try another search.</p>';
        }
    } catch (error) {
        console.error('Error fetching cocktails by name:', error);
    }
}


async function fetchCategories() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
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


async function fetchPopularCocktails() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        if (data.drinks) {
            displayCocktails(data.drinks);
        }
    } catch (error) {
        console.error('Error fetching popular cocktails:', error);
    }
}


function displayCocktails(cocktails) {
    cocktailContainer.innerHTML = '';
    cocktails.forEach(cocktail => {
        const cocktailDiv = document.createElement('div');
        cocktailDiv.classList.add('cocktail');

        const cocktailName = document.createElement('h2');
        cocktailName.textContent = cocktail.strDrink;
        
        const cocktailImage = document.createElement('img');
        cocktailImage.src = cocktail.strDrinkThumb;
        cocktailImage.alt = cocktail.strDrink;
        
        const ingredientsList = document.createElement('ul');
        for (let i = 1; i <= 15; i++) {
            if (cocktail[`strIngredient${i}`]) {
                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = `${cocktail[`strIngredient${i}`]} - ${cocktail[`strMeasure${i}`] || 'to taste'}`;
                ingredientsList.appendChild(ingredientItem);
            }
        }
        
        const instructions = document.createElement('p');
        instructions.textContent = cocktail.strInstructions;

        cocktailDiv.appendChild(cocktailName);
        cocktailDiv.appendChild(cocktailImage);
        cocktailDiv.appendChild(ingredientsList);
        cocktailDiv.appendChild(instructions);

        cocktailContainer.appendChild(cocktailDiv);
    });
}