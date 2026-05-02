import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BottomSheet from './BottomSheet';
import './WorkCard.css';

export default function WorkCard({ item, accentColor, isActive, onActivate, onDeactivate }) {
  const { t, i18n } = useTranslation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const cardImage = item.bgUrl;
  const imgStyle = {};

  const synopsis = i18n.language === 'it'
    ? item.synopsis
    : (item.synopsisEn ?? item.synopsis);

  const metaLine = [item.type, item.country, item.duration, item.year, item.role]
    .filter(Boolean)
    .join(' · ');

  return (
    <>
      <div
        className={`work-card${isActive ? ' work-card--active' : ''}`}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onClick={() => setSheetOpen(true)}
        role="listitem"
        aria-expanded={isActive}
        tabIndex={0}
        onFocus={onActivate}
        onBlur={onDeactivate}
        onKeyDown={(e) => e.key === 'Enter' && setSheetOpen(true)}
      >
        <div className="work-card__media">
          {cardImage ? (
            <img
              src={cardImage}
              alt={item.title}
              className="work-card__img"
              style={imgStyle}
              loading="lazy"
            />
          ) : (
            <div className="work-card__placeholder">
              <span className="work-card__placeholder-title">{item.title}</span>
            </div>
          )}

          <div className="work-card__overlay">
            <p className="work-card__type" style={{ color: accentColor }}>
              {item.type}
            </p>
            <h3 className="work-card__title">{item.client ?? item.title}</h3>
            {item.client && (
              <p className="work-card__subtitle">{item.title}</p>
            )}
            <p className="work-card__year">{item.year}</p>
          </div>
        </div>

        {isActive && (
          <div
            className="work-card__details"
            style={{ borderLeftColor: accentColor }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="work-card__meta" style={{ color: accentColor }}>
              {metaLine}
            </p>
            <h3 className="work-card__details-title">{item.title}</h3>
            {(item.director || item.production) && (
              <p className="work-card__credits">
                {item.director && `Regia: ${item.director}`}
                {item.director && item.production && ' — '}
                {item.production && `Prod: ${item.production}`}
              </p>
            )}
            {synopsis && (
              <p className="work-card__synopsis">{synopsis}</p>
            )}
            {item.badgeUrls?.length > 0 && (
              <div className="work-card__badges">
                {item.badgeUrls.map((url, i) => (
                  <img key={i} src={url} alt="" className="work-card__badge" loading="lazy" />
                ))}
              </div>
            )}
            {item.watchUrl && item.watchUrl !== '#' && (
              <a
                className="work-card__watch"
                href={item.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accentColor }}
                onClick={(e) => e.stopPropagation()}
              >
                {t('card.watch')}
                {item.watchPassword && (
                  <span className="work-card__password">
                    {' '}({t('card.password')}: {item.watchPassword})
                  </span>
                )}
              </a>
            )}
          </div>
        )}
      </div>

      {sheetOpen && (
        <BottomSheet
          item={item}
          accentColor={accentColor}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </>
  );
}
