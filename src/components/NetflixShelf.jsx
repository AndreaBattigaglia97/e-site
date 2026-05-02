import { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import WorkCard from './WorkCard';
import './NetflixShelf.css';

const CARD_WIDTH = 260;
const CARD_GAP = 16;
const SCROLL_BY = (CARD_WIDTH + CARD_GAP) * 3;
const EXPANDED_WIDTH = 520 + 280;

export default function NetflixShelf({ label, items, accentColor }) {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const scrollingRef = useRef(false);
  const [activeCard, setActiveCard] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  useEffect(() => {
    if (!activeCard || !scrollRef.current) return;
    const shelf = scrollRef.current;
    const cardEl = shelf.querySelector(`[data-card-id="${activeCard}"]`);
    if (!cardEl) return;

    const cardRight = cardEl.offsetLeft + EXPANDED_WIDTH;
    const shelfRight = shelf.scrollLeft + shelf.clientWidth;
    const overflow = cardRight - shelfRight;

    if (overflow > 0) {
      scrollingRef.current = true;
      shelf.scrollBy({ left: overflow + 32, behavior: 'smooth' });
      setTimeout(() => { scrollingRef.current = false; }, 600);
    }
  }, [activeCard]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * SCROLL_BY, behavior: 'smooth' });
  };

  return (
    <div
      className="shelf"
      onMouseLeave={() => setActiveCard(null)}
    >
      <div className="shelf__header">
        <div className="shelf__label" style={{ color: accentColor }}>
          {label}
        </div>
      </div>

      <div className="shelf__track-wrapper">
        {canScrollLeft && (
          <button
            className="shelf__arrow shelf__arrow--left"
            onClick={() => scroll(-1)}
            aria-label={t('sections.scrollLeft')}
          >
            ◀
          </button>
        )}

        <div
          className="shelf__track"
          ref={scrollRef}
          role="list"
        >
          {items.map((item) => (
            <WorkCard
              key={item.id}
              item={item}
              accentColor={accentColor}
              isActive={activeCard === item.id}
              onActivate={() => { if (!scrollingRef.current) setActiveCard(item.id); }}
              onDeactivate={() => setActiveCard(null)}
            />
          ))}
        </div>

        {canScrollRight && (
          <button
            className="shelf__arrow shelf__arrow--right"
            onClick={() => scroll(1)}
            aria-label={t('sections.scrollRight')}
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
}
