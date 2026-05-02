import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';
import './Contact.css';

export default function Contact() {
  const { t } = useTranslation();
  const ref = useScrollReveal();

  const contacts = [
    {
      label: t('contact.phone_label'),
      value: t('contact.phone'),
      href: `tel:${t('contact.phone').replace(/\s/g, '')}`,
    },
    {
      label: t('contact.email_label'),
      value: t('contact.email'),
      href: `mailto:${t('contact.email')}`,
    },
    {
      label: t('contact.imdb_label'),
      value: t('contact.imdb_value'),
      href: 'https://www.imdb.com/name/nm7536626/',
      external: true,
    },
  ];

  return (
    <section className="contact" id="contact-section">
      <p className="contact__section-label" style={{ color: 'var(--accent-film)' }}>
        {t('contact.sectionLabel')}
      </p>
      <div className="contact__grid" ref={ref}>
        <div className="contact__left">
          <p className="contact__sub">{t('contact.sub')}</p>
        </div>
        <div className="contact__right">
          {contacts.map(({ label, value, href, external }) => (
            <a
              key={href}
              className="contact__item"
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="contact__label">{label}</span>
              <span className="contact__value">{value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
