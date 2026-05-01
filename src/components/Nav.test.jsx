import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Nav from './Nav';

beforeEach(() => i18n.changeLanguage('it'));

test('Nav renders section links', () => {
  render(<I18nextProvider i18n={i18n}><Nav /></I18nextProvider>);
  expect(screen.getByText('bio')).toBeInTheDocument();
  expect(screen.getByText('lavori')).toBeInTheDocument();
  expect(screen.getByText('premi')).toBeInTheDocument();
  expect(screen.getByText('contatti')).toBeInTheDocument();
});

test('Nav language switch changes language', () => {
  render(<I18nextProvider i18n={i18n}><Nav /></I18nextProvider>);
  fireEvent.click(screen.getByText('EN'));
  expect(i18n.language).toBe('en');
  fireEvent.click(screen.getByText('IT'));
  expect(i18n.language).toBe('it');
});
