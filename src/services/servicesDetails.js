const getIngredientsData = (data) => {
  const nameImg = Object.entries(data).filter((item) => item[0]
    .includes('strIngredient') && item[1] !== null).map((item) => item[1]);

  const measures = Object.entries(data).filter((item) => item[0]
    .includes('strMeasure') && item[1] !== null).map((item) => item[1]);

  const formatedIngredients = nameImg.map((item, indice) => {
    const combine = measures[indice] ? indice : 0;
    return [item, measures[combine]];
  });

  return formatedIngredients;
};

const verifyIfHasStarted = (id, type) => {
  if (!localStorage.getItem('inProgressRecipes')) {
    return false;
  }

  if (localStorage.getItem('inProgressRecipes')) {
    const inProgressList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const hasStarted = Object.keys(inProgressList[type])
      .some((recipe) => recipe === id);
    // setStarted(hasStarted);
    return hasStarted;
  }
};

const handleStartBtn = (ingredients, id, type, setStarted) => {
  const arrayIngredients = ingredients.map((item) => item[0]);
  const objSave = { [id]: arrayIngredients };

  if (!localStorage.getItem('inProgressRecipes')) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ [type]: objSave }));
  // } else if () {
  } else {
    const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newStorage = { ...prevStorage,
      [type]: { ...prevStorage[type], [id]: arrayIngredients } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  }

  setStarted(true);
};

export { getIngredientsData, verifyIfHasStarted, handleStartBtn };
