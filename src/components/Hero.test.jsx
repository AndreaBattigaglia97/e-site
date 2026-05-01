import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Hero from './Hero';

test('Hero renders without crashing', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <Hero />
    </I18nextProvider>
  );
});
