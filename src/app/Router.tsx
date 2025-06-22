import {
  Navigate,
  Route,
  BrowserRouter as RouterProvider,
  Routes,
} from 'react-router-dom';
import { COCKTAIL_CODES } from '../constants/cocktails';
import { CocktailPage } from '../pages/CocktailPage/CocktailPage';
import { Layout } from '../components/Layout/Layout';

/**
 * Компонент-роутер.
 */
export const Router = () => {
  const [firstCocktail] = COCKTAIL_CODES;

  return (
    <RouterProvider basename="/cocktail">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Navigate to={`/${firstCocktail}`} replace />}
          />
          <Route path=":code" element={<CocktailPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </RouterProvider>
  );
};
