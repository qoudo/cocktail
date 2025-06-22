import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCocktailsByCode } from '../../store/cocktailSlice';
import type { AppDispatch, RootState } from '../../store/store';
import type { Cocktail } from '../../types/cocktail';
import { LazyImage } from '../../components/LazyImage/LazyImage';
import { getIngredients } from '../../utils/getIngredients';
import { COCKTAIL_CODES } from '../../constants/cocktails';
import './CocktailPage.scss';

/**
 * Компонент страницы для отображения детальной информации о коктейлях.
 * Получает код коктейля из URL.
 */
export const CocktailPage = () => {
  const { code } = useParams<{ code: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { cocktails, loading, error } = useSelector(
    (state: RootState) => state.cocktails,
  );

  useEffect(() => {
    if (code && COCKTAIL_CODES.includes(code)) {
      dispatch(fetchCocktailsByCode(code));
    }
  }, [code, dispatch]);

  if (!code || !COCKTAIL_CODES.includes(code)) {
    return <div>404 Not Found</div>;
  }

  const currentCocktails = (cocktails[code] as Cocktail[]) || [];

  if (loading && currentCocktails.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {currentCocktails.map((cocktail) => {
        const ingredients = getIngredients(cocktail);
        return (
          <article key={cocktail.idDrink} className="cocktail-item">
            <h2 className="cocktail-title">{cocktail.strDrink}</h2>

            <div className="cocktail-details">
              <p>
                <strong>Category:</strong> {cocktail.strCategory}
              </p>
              <p>
                <strong>Alcoholic:</strong> {cocktail.strAlcoholic}
              </p>
              <p>
                <strong>Glass:</strong> {cocktail.strGlass}
              </p>
            </div>

            <LazyImage
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              className="cocktail-image"
            />

            <div className="cocktail-instructions">
              <h3>Instructions:</h3>
              <p>{cocktail.strInstructions}</p>
            </div>

            <div className="cocktail-ingredients">
              <h3>List of ingredients:</h3>
              <ul>
                {ingredients.map((ing, index) => (
                  <li key={index}>
                    {ing.measure} {ing.name}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
};
