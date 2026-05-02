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
