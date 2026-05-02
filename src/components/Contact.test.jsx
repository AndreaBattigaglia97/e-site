import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Contact from './Contact';

beforeEach(() => i18n.changeLanguage('it'));

test('Contact renders heading', () => {
  render(<I18nextProvider i18n={i18n}><Contact /></I18nextProvider>);
  expect(screen.getByText('PARLIAMO.')).toBeInTheDocument();
});

test('Contact renders email link', () => {
  render(<I18nextProvider i18n={i18n}><Contact /></I18nextProvider>);
  const link = screen.getByText('ernesto.giuntini@gmail.com');
  expect(link.closest('a')).toHaveAttribute('href', 'mailto:ernesto.giuntini@gmail.com');
});

test('Contact renders phone link', () => {
  render(<I18nextProvider i18n={i18n}><Contact /></I18nextProvider>);
  const link = screen.getByText('+39 340 341 0815');
  expect(link.closest('a')).toHaveAttribute('href', 'tel:+393403410815');
});

test('Contact renders IMDB link with external attributes', () => {
  render(<I18nextProvider i18n={i18n}><Contact /></I18nextProvider>);
  const link = screen.getByText('Profilo Completo →');
  const anchor = link.closest('a');
  expect(anchor).toHaveAttribute('href', 'https://www.imdb.com/name/nm7536626/');
  expect(anchor).toHaveAttribute('target', '_blank');
  expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
});
