/**
 * Определяет основную модель данных для коктейля в приложении.
 *
 * Этот интерфейс использует индексную подпись `[key: string]: string | null;`
 * для гибкой обработки динамически именуемых полей, таких как ингредиенты
 * (`strIngredient1`, `strIngredient2`, ...) и их меры (`strMeasure1`, `strMeasure2`, ...),
 * которые возвращает TheCocktailDB API.
 *
 * Основные, статичные поля коктейля определены явно для строгой типизации.
 */
export interface Cocktail {
  // Основные поля
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;

  // Опциональные/дополнительные поля
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strIBA: string | null;
  strInstructionsES: string | null;
  strInstructionsDE: string | null;
  strInstructionsFR: string | null;
  strInstructionsIT: string | null;
  'strInstructionsZH-HANS': string | null;
  'strInstructionsZH-HANT': string | null;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: string;
  dateModified: string;

  // Индексная подпись для всех остальных полей (strIngredientN, strMeasureN)
  [key: string]: string | null;
}
