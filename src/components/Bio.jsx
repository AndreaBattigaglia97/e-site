import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';
import './Bio.css';

export default function Bio() {
  const { t } = useTranslation();
  const ref = useScrollReveal();

  const rows = [
    { key: 'born',      label: t('bio.labels.born'),      value: t('bio.values.born') },
    { key: 'role',      label: t('bio.labels.role'),      value: t('bio.values.role') },
    { key: 'languages', label: t('bio.labels.languages'), value: t('bio.values.languages') },
    { key: 'active',    label: t('bio.labels.active'),    value: t('bio.values.active') },
    { key: 'siae',      label: t('bio.labels.siae'),      value: t('bio.values.siae') },
  ];

  return (
    <section className="bio">
      <div className="bio__grid" ref={ref}>
        <div className="bio__left">
          <p className="bio__paragraph">{t('bio.paragraph')}</p>
        </div>
        <div className="bio__right">
          {rows.map(({ key, label, value }) => (
            <div className="bio__row" key={key}>
              <span className="bio__label">{label}</span>
              <span className="bio__value">{value}</span>
            </div>
          ))}
          <div className="bio__row">
            <span className="bio__label">{t('bio.labels.imdb')}</span>
            <a
              className="bio__link"
              href="https://www.imdb.com/name/nm7536626/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('bio.values.imdb')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
