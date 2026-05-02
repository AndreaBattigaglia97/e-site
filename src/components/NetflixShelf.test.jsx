import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import NetflixShelf from './NetflixShelf';

const items = [
  {
    id: 'a', title: 'Film A', type: 'CORTOMETRAGGIO', country: 'ITALIA',
    duration: "10'", year: 2023, role: 'SCENEGGIATURA', director: 'R',
    production: 'P', synopsis: 'S', synopsisEn: 'S',
    watchUrl: '#', watchPassword: null, awards: [], badgeUrls: [],
    posterUrl: null, bgUrl: null, accentColor: '#c9a84c',
  },
  {
    id: 'b', title: 'Film B', type: 'CORTOMETRAGGIO', country: 'ITALIA',
    duration: "12'", year: 2022, role: 'SCENEGGIATURA', director: 'R',
    production: 'P', synopsis: 'S', synopsisEn: 'S',
    watchUrl: '#', watchPassword: null, awards: [], badgeUrls: [],
    posterUrl: null, bgUrl: null, accentColor: '#c9a84c',
  },
];

test('NetflixShelf renders all items', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <NetflixShelf label="02 — Test" items={items} accentColor="#c9a84c" />
    </I18nextProvider>
  );
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

test('NetflixShelf renders section label', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <NetflixShelf label="02 — Test" items={items} accentColor="#c9a84c" />
    </I18nextProvider>
  );
  expect(screen.getByText('02 — Test')).toBeInTheDocument();
});
