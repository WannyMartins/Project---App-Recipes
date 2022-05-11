const getIngredientsData = (data) => {
  const nameImg = Object.entries(data).filter((item) => item[0]
    .includes('strIngredient') && item[1] !== null).map((item) => item[1]);

  const measures = Object.entries(data).filter((item) => item[0]
    .includes('strMeasure') && item[1] !== null).map((item) => item[1]);

  const formatedIngredients = nameImg.filter((item) => item !== '')
    .map((item, indice) => {
      const combine = measures[indice] ? indice : 0;
      return [item, measures[combine]];
    });

  return formatedIngredients;
};

const verifyIfHasStarted = (id, type) => {
  if (!localStorage.getItem('inProgressRecipes')) {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
    return false;
  }

  if (JSON.parse(localStorage.getItem('inProgressRecipes'))[type]) {
    const inProgressList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const hasStarted = Object.keys(inProgressList[type])
      .some((recipe) => recipe === id);
    return hasStarted;
  }
};

const handleStartBtn = (ingredients, id, type, setStarted) => {
  const arrayIngredients = ingredients.filter((item) => item[0] !== '')
    .map((item) => item[0]);
  const objSave = { [id]: arrayIngredients };

  if (!localStorage.getItem('inProgressRecipes')) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ [type]: objSave }));
  }

  const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const newStorage = { ...prevStorage,
    [type]: { ...prevStorage[type], [id]: arrayIngredients } };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));

  setStarted(true);
};

const copyTextToClipboard = async (text) => {
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(text);
  }
  return document.execCommand('copy', true, text);
};

const copyLink = (pathname, setIsCopied) => {
  copyTextToClipboard(`http://localhost:3000${pathname}`);
  setIsCopied(true);
  const oneSec = 1500;
  setTimeout(() => {
    setIsCopied(false);
  }, oneSec);
};

const addOrRemoveFromLocalStorage = (isFavorite, objFav) => {
  if (!localStorage.getItem('favoriteRecipes') && isFavorite) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([objFav]));
  }

  if (isFavorite) {
    const storageFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newStorage = storageFav.some((fav) => fav.id === objFav.id)
      ? storageFav
      : [...storageFav, objFav];

    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }

  if (!isFavorite) {
    const storageFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newStorage = storageFav.filter((fav) => fav.id !== objFav.id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
};

const addDoneRecipes = (objDone) => {
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', JSON.stringify([objDone]));
  }

  const doneList = JSON.parse(localStorage.getItem('doneRecipes'));

  if (doneList) {
    const newList = [...doneList, objDone];
    localStorage.setItem('doneRecipes', JSON.stringify(newList));
  }

  if (doneList.some((item) => item.id === objDone.id)) {
    const filterStorage = doneList.filter((element) => element.id !== objDone.id);
    const newStorage = [...filterStorage, objDone];
    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  }
};

const verifyCheckedDone = (checked, value, setTagList) => {
  if (checked) {
    setTagList((state) => [...state, value]);
  } else {
    setTagList((state) => (state.filter((item) => item !== value)));
  }
};

const controlProgress = (ingredients, id) => {
  const result = ingredients.reduce((acc, curr) => {
    const ingredient = curr[0];
    const condition = localStorage.getItem('doneRecipes');
    if (!condition) {
      acc[ingredient] = false;
    } else if (JSON.parse(condition).find((recipe) => recipe.id === id)) {
      const storage = JSON.parse(localStorage.getItem('doneRecipes'));
      const recipe = storage.find((item) => item.id === id);
      acc[ingredient] = recipe.tags.some((ingName) => ingName === ingredient);
    } else {
      acc[ingredient] = false;
    }
    return acc;
  }, {});
  return result;
};

const verifyFavorite = (id) => {
  const verify = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return verify.some((item) => item.id === id);
};

const verifyDoneRecipe = (id, setIsDone) => {
  const doneList = JSON.parse(localStorage.getItem('doneRecipes'));
  const isItDone = doneList.some((recipe) => recipe.id === id);
  setIsDone(isItDone);
};

export {
  getIngredientsData, verifyIfHasStarted, handleStartBtn,
  copyLink, addOrRemoveFromLocalStorage,
  verifyFavorite, addDoneRecipes, verifyCheckedDone, controlProgress,
  verifyDoneRecipe,
};
