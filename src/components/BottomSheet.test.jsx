import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import BottomSheet from './BottomSheet';

const item = {
  id: 'test',
  title: 'Test Film',
  type: 'CORTOMETRAGGIO',
  country: 'ITALIA',
  duration: "10'",
  year: 2023,
  role: 'SCENEGGIATURA',
  director: 'Mario Rossi',
  production: 'Test Prod',
  synopsis: 'Una sinossi di test.',
  synopsisEn: 'A test synopsis.',
  watchUrl: '#',
  watchPassword: null,
  awards: [],
  badgeUrls: [],
  posterUrl: null,
  bgUrl: null,
  accentColor: '#c9a84c',
};

test('BottomSheet shows title when open', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <BottomSheet item={item} accentColor="#c9a84c" onClose={() => {}} />
    </I18nextProvider>
  );
  expect(screen.getByText('Test Film')).toBeInTheDocument();
});

test('BottomSheet calls onClose when overlay clicked', () => {
  const onClose = jest.fn();
  render(
    <I18nextProvider i18n={i18n}>
      <BottomSheet item={item} accentColor="#c9a84c" onClose={onClose} />
    </I18nextProvider>
  );
  fireEvent.click(screen.getByTestId('bottomsheet-overlay'));
  expect(onClose).toHaveBeenCalled();
});
