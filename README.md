# Cocktail-finderHere’s a README file for your Cocktail Finder project:

---

# Cocktail Finder

A web application that allows users to search for cocktails by name or ingredient, view detailed recipes, and discover new drinks with a "Surprise Me!" feature. The app supports both light and dark modes and fetches cocktail data using the [TheCocktailDB API](https://www.thecocktaildb.com/api.php).

## Features

- **Search by Name**: Find cocktails by their name.
- **Search by Ingredient**: Find cocktails by a specific ingredient.
- **Surprise Me!**: Get a random cocktail suggestion.
- **Filters**: Filter cocktails by category and ingredients.
- **Dark Mode**: Toggle between light and dark modes for a better user experience.
- **Responsive Design**: Works well on both desktop and mobile devices.

## Installation

To run this project locally, follow these steps:

### Prerequisites

- A modern browser (Chrome, Firefox, Safari, etc.).
- A local server (if you'd like to run it on your local machine, you can use VS Code with Live Server or any other local server solution).

### Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/cocktail-finder.git
   ```

2. Open the project folder:
   ```bash
   cd cocktail-finder
   ```

3. Open `index.html` in your browser, or serve it through a local development server (e.g., using VS Code with Live Server).

## Files

- `index.html`: Contains the structure of the Cocktail Finder app.
- `style.css`: Defines the app's styles, including layout, color schemes, and dark mode.
- `index.js`: The JavaScript logic for searching, filtering, displaying cocktails, and toggling dark mode.

## How It Works

1. **User Input**: 
   - Users can input a search term in the search bar to find cocktails by name or ingredient.
   - Users can select filters to narrow down the search results by category and ingredients.

2. **Displaying Results**: 
   - The app fetches cocktail data from [TheCocktailDB API](https://www.thecocktaildb.com/api.php) and displays the results on the page.
   - Each cocktail card includes the drink's name, image, ingredients, and preparation instructions.

3. **Dark Mode**: 
   - Users can toggle between dark and light mode, with the app remembering their preference using `localStorage`.

## Technologies Used

- **HTML**: The structure of the web page.
- **CSS**: Styling, including responsive design and dark mode support.
- **JavaScript**: Logic to handle search, fetch data from the API, and update the page dynamically.

## API

This app uses the [TheCocktailDB API](https://www.thecocktaildb.com/api.php) to retrieve cocktail data. It allows the app to:

- Fetch cocktails by name, ingredient, and category.
- Retrieve random cocktail suggestions.

## Credits

- **Cocktail Images**: Provided by TheCocktailDB API.
- **Cocktail Data**: Sourced from TheCocktailDB API.

## Future Improvements

- Add more filters (e.g., alcoholic vs non-alcoholic, glass type).
- Implement a favorites system where users can save their favorite cocktails.
- Add a search history feature.

## License

This project is open-source and available under the [MIT License]

---


This README provides a comprehensive overview of the project, its setup, and its features.
