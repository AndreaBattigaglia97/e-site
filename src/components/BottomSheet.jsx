import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import './BottomSheet.css';

export default function BottomSheet({ item, accentColor, onClose }) {
  const { t, i18n } = useTranslation();
  const synopsis = i18n.language === 'it' ? item.synopsis : (item.synopsisEn ?? item.synopsis);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className="bs-overlay"
      data-testid="bottomsheet-overlay"
      onClick={onClose}
    >
      <div
        className="bs-sheet"
        style={{ borderTopColor: accentColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="bs-close" onClick={onClose} aria-label="Chiudi">×</button>

        <p className="bs-meta" style={{ color: accentColor }}>
          {[item.type, item.country, item.duration, item.year, item.role]
            .filter(Boolean)
            .join(' · ')}
        </p>

        <h2 className="bs-title">{item.title}</h2>

        {(item.director || item.production) && (
          <p className="bs-credits">
            {item.director && `Regia: ${item.director}`}
            {item.director && item.production && ' — '}
            {item.production && `Prod: ${item.production}`}
          </p>
        )}

        {synopsis && <p className="bs-synopsis">{synopsis}</p>}

        {item.badgeUrls?.length > 0 && (
          <div className="bs-badges">
            {item.badgeUrls.map((url, i) => (
              <img key={i} src={url} alt="" className="bs-badge" loading="lazy" />
            ))}
          </div>
        )}

        {item.watchUrl && item.watchUrl !== '#' && (
          <a
            className="bs-watch"
            href={item.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: accentColor }}
          >
            {t('card.watch')}
            {item.watchPassword && (
              <span className="bs-password">
                {' '}({t('card.password')}: {item.watchPassword})
              </span>
            )}
          </a>
        )}
      </div>
    </div>,
    document.body
  );
}
