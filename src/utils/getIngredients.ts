import type { Cocktail } from '../types/cocktail';

/**
 * Описывает структуру объекта ингредиента.
 */
export interface Ingredient {
  /** Название ингредиента */
  name: string;
  /** Количество/мера ингредиента */
  measure: string;
}

/**
 * Преобразует плоскую структуру полей `strIngredient` и `strMeasure`
 * из объекта коктейля в массив объектов `Ingredient`.
 * @param {Cocktail} cocktail - Объект коктейля из API.
 * @returns {Ingredient[]} - Массив ингредиентов.
 */
export const getIngredients = (cocktail: Cocktail): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Cocktail;
    const measureKey = `strMeasure${i}` as keyof Cocktail;

    const ingredient = cocktail[ingredientKey];
    const measure = cocktail[measureKey];

    if (ingredient) {
      ingredients.push({ name: ingredient, measure: measure || '' });
    }
  }
  return ingredients;
};
