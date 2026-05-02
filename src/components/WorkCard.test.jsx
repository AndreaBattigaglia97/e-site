import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import WorkCard from './WorkCard';

const baseItem = {
  id: 'test',
  title: 'Test Film',
  type: 'CORTOMETRAGGIO',
  country: 'ITALIA',
  duration: "10'",
  year: 2023,
  role: 'SCENEGGIATURA',
  director: 'Mario Rossi',
  production: 'Test Prod',
  synopsis: 'Sinossi.',
  synopsisEn: 'Synopsis.',
  watchUrl: '#',
  watchPassword: null,
  awards: [],
  badgeUrls: [],
  accentColor: '#c9a84c',
};

test('WorkCard always uses bgUrl in the carousel', () => {
  const item = { ...baseItem, posterUrl: '/poster.jpg', bgUrl: '/bg.jpg' };
  render(
    <I18nextProvider i18n={i18n}>
      <WorkCard item={item} accentColor="#c9a84c" isActive={false} onActivate={() => {}} onDeactivate={() => {}} />
    </I18nextProvider>
  );
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', '/bg.jpg');
});

test('WorkCard shows placeholder when bgUrl is null', () => {
  const item = { ...baseItem, posterUrl: '/poster.jpg', bgUrl: null };
  render(
    <I18nextProvider i18n={i18n}>
      <WorkCard item={item} accentColor="#c9a84c" isActive={false} onActivate={() => {}} onDeactivate={() => {}} />
    </I18nextProvider>
  );
  expect(screen.queryByRole('img')).toBeNull();
  expect(document.querySelector('.work-card__placeholder')).toBeInTheDocument();
});
