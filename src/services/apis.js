const fetchMeals = async (search) => {
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
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
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
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
};

export { fetchMeals, fetchDrinks };
