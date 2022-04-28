const fetchMeals = async (search, input) => {
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

  const url = `https://www.themealdb.com/api/json/v1/1/list.php?${endpoint}=${input}`;
  const response = await fetch(url);
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(data);
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

export { fetchMeals, fetchDrinks };

// É possível listar todas as categorias, nacionalidades (vindas da API como "areas") e ingredientes:
// categorias:
// https://www.themealdb.com/api/json/v1/1/list.php?c=list

// nacionalidades:
// https://www.themealdb.com/api/json/v1/1/list.php?a=list

// ingredientes:
// https://www.themealdb.com/api/json/v1/1/list.php?i=list

// filter ingredient
// https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}

// filter by name
// https://www.themealdb.com/api/json/v1/1/search.php?s={nome}

// filter by first letter
// https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}
