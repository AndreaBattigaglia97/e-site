import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Bio from './Bio';

beforeEach(() => i18n.changeLanguage('it'));

test('Bio renders heading', () => {
  render(<I18nextProvider i18n={i18n}><Bio /></I18nextProvider>);
  expect(screen.getByText('Una voce italiana sul palco del mondo.')).toBeInTheDocument();
});

test('Bio renders IMDB label', () => {
  render(<I18nextProvider i18n={i18n}><Bio /></I18nextProvider>);
  expect(screen.getByText('IMDB')).toBeInTheDocument();
});
