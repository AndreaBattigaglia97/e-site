import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';
import shorts from '../data/shorts';
import films from '../data/films';
import './Awards.css';

const allAwards = [...films, ...shorts].flatMap((item) =>
  (item.awards ?? [])
    .filter((a) =>
      a.toLowerCase().includes('winner') ||
      a.toLowerCase().includes('miglior') ||
      a.toLowerCase().includes('best') ||
      a.toLowerCase().includes('vincitore') ||
      a.toLowerCase().includes('premio stampa')
    )
    .map((award) => ({ film: item.title, award, year: item.year }))
);

export default function Awards() {
  const { t } = useTranslation();
  const statsRef = useScrollReveal();
  const listRef = useScrollReveal();

  return (
    <section className="awards">
      <div className="awards__header">
        <p className="awards__section-label" style={{ color: 'var(--accent-awards)' }}>
          {t('awards.sectionLabel')}
        </p>
      </div>

      <div className="awards__stats" ref={statsRef}>
        <div className="awards__stat">
          <span className="awards__stat-num">{t('awards.stat1_num')}</span>
          <span className="awards__stat-label">{t('awards.stat1_label')}</span>
        </div>
        <div className="awards__stat">
          <span className="awards__stat-num">{t('awards.stat2_num')}</span>
          <span className="awards__stat-label">{t('awards.stat2_label')}</span>
        </div>
        <div className="awards__stat">
          <span className="awards__stat-num">{t('awards.stat3_num')}</span>
          <span className="awards__stat-label">{t('awards.stat3_label')}</span>
        </div>
      </div>

      <div className="awards__list" ref={listRef}>
        {allAwards.map(({ film, award, year }, i) => (
          <div className="awards__item" key={i}>
            <span className="awards__film">{film}</span>
            <span className="awards__award">{award}</span>
            <span className="awards__year" style={{ color: 'var(--accent-awards)' }}>
              {year}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
