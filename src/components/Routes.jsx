import React, { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecipesProvider from '../context/recipesProvider';
import DoneRecipes from '../pages/DoneRecipes';
import DrinkDetails from '../pages/drinks/DrinkDetails';
import DrinkInProgress from '../pages/drinks/DrinkInProgress';
import Drinks from '../pages/drinks/Drinks';
import DrinksExplore from '../pages/drinks/DrinksExplore';
import DrinksExploreIngredients from '../pages/drinks/DrinksExploreIngredients';
import Explore from '../pages/Explore';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import FoodDetails from '../pages/foods/FoodDetails';
import FoodExploreIngredients from '../pages/foods/FoodExploreIngredients';
import FoodExploreNationalities from '../pages/foods/FoodExploreNationalities';
import FoodInProgress from '../pages/foods/FoodInProgress';
import Foods from '../pages/foods/Foods';
import FoodsExplore from '../pages/foods/FoodsExplore';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';

function Routes() {
  return (
    <RecipesProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/foods/:id" component={ FoodDetails } />
          <Route exact path="/foods/:id/in-progress" component={ FoodInProgress } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/drinks/:id" component={ DrinkDetails } />
          <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/explore/foods" component={ FoodsExplore } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ FoodExploreIngredients }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ FoodExploreNationalities }
          />
          <Route exact path="/explore/drinks" component={ DrinksExplore } />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ DrinksExploreIngredients }
          />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </RecipesProvider>
  );
}

export default Routes;
