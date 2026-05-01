import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TextType from '../TextType';
import './Hero.css';

export default function Hero() {
  const { i18n } = useTranslation();
  const [phrases, setPhrases] = useState(
    i18n.t('hero.phrases', { returnObjects: true })
  );

  useEffect(() => {
    const handleLangChange = () => {
      setPhrases([]);
      setTimeout(() => {
        setPhrases(i18n.t('hero.phrases', { returnObjects: true }));
      }, 100);
    };
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, [i18n]);

  return (
    <header className="hero" id="hero">
      <div className="hero__logo">
        <h1>e</h1>
        <p className="hero__dot">.</p>
      </div>
      <div className="hero__phrases">
        {phrases.length > 0 && (
          <TextType
            text={phrases}
            typingSpeed={90}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
          />
        )}
      </div>
    </header>
  );
}
