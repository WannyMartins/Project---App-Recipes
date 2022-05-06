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
    localStorage
      .setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
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

const verifyFavorite = (id) => {
  const verify = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return verify.some((item) => item.id === id);
};

export { getIngredientsData, verifyIfHasStarted, handleStartBtn,
  copyLink, addOrRemoveFromLocalStorage, verifyFavorite };
