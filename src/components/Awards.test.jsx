import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Awards from './Awards';

beforeEach(() => i18n.changeLanguage('it'));

test('Awards renders statistics', () => {
  render(<I18nextProvider i18n={i18n}><Awards /></I18nextProvider>);
  expect(screen.getByText('30+')).toBeInTheDocument();
  expect(screen.getByText('8')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
});

test('Awards renders section label', () => {
  render(<I18nextProvider i18n={i18n}><Awards /></I18nextProvider>);
  expect(screen.getByText('04 — Premi')).toBeInTheDocument();
});
