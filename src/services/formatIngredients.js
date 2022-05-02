const getIngredientsData = (data) => {
  const nameImg = Object.entries(data).filter((item) => item[0]
    .includes('strIngredient') && item[1] !== null).map((item) => item[1]);

  const measures = Object.entries(data).filter((item) => item[0]
    .includes('strMeasure') && item[1] !== null).map((item) => item[1]);
  console.log(nameImg);
  console.log(measures);

  const formatedIngredients = nameImg.map((item, indice) => {
    const combine = measures[indice] ? indice : 0;
    return [item, measures[combine]];
  });

  return formatedIngredients;
};

export default getIngredientsData;
