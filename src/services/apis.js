const fetchMealsExplore = async (search) => {
  let endpoint;
  switch (search) {
  case 'categories':
    endpoint = 'c';
    break;
  case 'areas':
    endpoint = 'a';
    break;
  case 'ingredients':
    endpoint = 'i';
    break;
  default:
    break;
  }

  const url = `https://www.themealdb.com/api/json/v1/1/list.php?${endpoint}=list`;
  const response = await fetch(url);
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(data);
};

const fetchDrinksExplore = async (search) => {
  let endpoint;
  switch (search) {
  case 'categories':
    endpoint = 'c';
    break;
  case 'areas':
    endpoint = 'a';
    break;
  case 'ingredients':
    endpoint = 'i';
    break;
  default:
    break;
  }

  const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?${endpoint}=list`;
  const response = await fetch(url);
  const data = await response.json();
  return response.ok ? Promise.resolve(data.drinks) : Promise.reject(data);
};

const fetchDrinks = async (search, input) => {
  let endpoint;
  switch (search) {
  case 'name':
    endpoint = 's';
    break;
  case 'firstLetter':
    endpoint = 'f';
    break;
  case 'ingredients':
    endpoint = 'i';
    break;
  default:
    break;
  }

  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${endpoint}=${input}`;
  const response = await fetch(url);
  const data = await response.json();
  return response.ok ? Promise.resolve(data.drinks) : Promise.reject(data);
};

const fetchMealsSearch = async (searchFor) => {
  const { search, input } = searchFor;

  let url;
  switch (search) {
  case 'ingredient':
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
    break;
  case 'name':
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    break;
  case 'first-letter':
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
    break;
  case '':
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    break;
  default:
    break;
  }

  const response = await fetch(url);
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(data);
};

const fetchDrinksSearch = async (searchFor) => {
  const { search, input } = searchFor;

  let url;
  switch (search) {
  case 'ingredient':
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
    break;
  case 'name':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
    break;
  case 'first-letter':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`;
    break;
  case '':
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    break;
  default:
    break;
  }

  const response = await fetch(url);
  const data = await response.json();
  return response.ok ? Promise.resolve(data.drinks) : Promise.reject(data);
};

export {
  fetchMealsExplore,
  fetchDrinksExplore,
  fetchMealsSearch,
  fetchDrinks,
  fetchDrinksSearch,
};
