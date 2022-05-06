import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { fetchMealsExplore, fetchMealsNacionalities } from '../../services/apis';
import FoodsList from '../../components/FoodsList';
import FoodCard from '../../components/FoodCard';
import SearchBar from '../../components/SearchBar';

function FoodExploreNationalities() {
  const [areas, setAreas] = useState([]);
  const [meals, setMeals] = useState([]);
  const [nacionality, setNacionality] = useState(undefined);
  const twelve = 12;

  useEffect(() => {
    const getNacionalities = async () => {
      const data = await fetchMealsExplore('areas');
      setAreas(data);
    };
    getNacionalities();
  }, []);

  useEffect(() => {
    const getMeals = async () => {
      const data = await fetchMealsNacionalities(nacionality);
      console.log(data);
      setMeals(data);
    };
    if (nacionality) getMeals();
  }, [nacionality]);

  const handleChange = (value) => {
    setNacionality(value);
  };

  return (
    <>
      <Header tittle="Explore Nationalities">
        <SearchBar />
      </Header>
      <main>
        <section>
          <select
            data-testid="explore-by-nationality-dropdown"
            onChange={ (e) => handleChange(e.target.value) }
          >
            <option value="" data-testid="All-option">
              All
            </option>
            {areas.map((area, index) => (
              <option
                key={ `${index}-nacionality` }
                value={ area.strArea }
                data-testid={ `${area.strArea}-option` }
              >
                { area.strArea }
              </option>
            ))}
          </select>
        </section>
        { !nacionality
          ? <FoodsList />
          : meals.filter((item, index) => index < twelve)
            .map((meal, index) => (
              <FoodCard
                key={ meal.idMeal }
                data-testid={ `${index}-recipe-card` }
                meal={ meal }
                index={ index }
              />
            ))}
      </main>
      <Footer />
    </>
  );
}

export default FoodExploreNationalities;
