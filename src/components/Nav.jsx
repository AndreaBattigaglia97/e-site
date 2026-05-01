import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Nav.css';

export default function Nav() {
  const { t, i18n } = useTranslation();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${solid ? ' nav--solid' : ''}`}>
      <div className="nav__right">
        <a href="#bio">{t('nav.bio')}</a>
        <a href="#lavori">{t('nav.works')}</a>
        <a href="#premi">{t('nav.awards')}</a>
        <a href="#contatti">{t('nav.contact')}</a>
        <div className="nav__lang">
          <button
            className={i18n.language === 'it' ? 'active' : ''}
            onClick={() => i18n.changeLanguage('it')}
          >
            IT
          </button>
          <button
            className={i18n.language === 'en' ? 'active' : ''}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}
