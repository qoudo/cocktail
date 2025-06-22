import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { COCKTAIL_CODES } from '../../constants/cocktails';
import './Layout.scss';

/**
 * Компонент основного приложения.
 * Содержит боковую панель с навигацией и основную область для контента страниц.
 */
export const Layout = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <nav>
          <ul>
            {COCKTAIL_CODES.map((code) => (
              <li key={code}>
                <NavLink
                  to={`/${code}`}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {code.charAt(0).toUpperCase() + code.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};
