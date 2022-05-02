import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';
import { fetchMealsExplore } from '../../services/apis';
import FoodsList from '../../components/FoodsList';

function FoodExploreNationalities() {
  const [nacionalities, setNacionalities] = useState([]);

  useEffect(() => {
    const fetchNacionalities = async () => {
      const data = await fetchMealsExplore('areas');
      setNacionalities(data);
    };
    fetchNacionalities();
  }, []);

  return (
    <>
      <Header tittle="Explore Nationalities">
        <SearchBar />
      </Header>
      <main>
        <section>
          <select data-testid="explore-by-nationality-dropdown">
            {nacionalities.map((nacionality, index) => (
              <option
                key={ `${index}-nacionality` }
                value={ nacionality.strArea }
                data-testid={ `${nacionality.strArea}-option` }
              >
                { nacionality.strArea }
              </option>
            ))}
          </select>
        </section>
        <FoodsList />
      </main>
      <Footer />
    </>
  );
}

export default FoodExploreNationalities;
