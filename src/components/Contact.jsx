import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionTitle } from './SectionTitle';
import styles from './Contact.module.css';
import { SITE, whatsappLink } from '../config/site';

const tel = (n) => `tel:${n.replace(/\s/g, '')}`;

export function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const messageRef = useRef(null);

  // « Demander un devis » depuis la section Services : pré-remplit le message.
  useEffect(() => {
    const onQuote = (e) => {
      const el = messageRef.current;
      if (!el) return;
      el.value = `${t('services.quote')} : ${e.detail}\n\n`;
      setTimeout(() => el.focus({ preventScroll: true }), 600);
    };
    window.addEventListener('afrihorn:quote', onQuote);
    return () => window.removeEventListener('afrihorn:quote', onQuote);
  }, [t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Pas d'endpoint configuré : on ouvre le client mail avec le message pré-rempli.
    if (!SITE.formEndpoint) {
      const subject = `Afrihorn — ${data.name}${data.company ? ` (${data.company})` : ''}`;
      const body = `${data.message}\n\n${data.name}\n${data.email}${data.company ? `\n${data.company}` : ''}`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _replyto: data.email, _subject: `Afrihorn — ${data.name}` }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const waLink = whatsappLink(t('contact.whatsappPrefill'));

  return (
    <section id="contact" className={styles.section}>
      <SectionTitle subtitle={t('contact.intro')}>{t('nav.contact')}</SectionTitle>

      <div className={styles.container}>
        <aside className={styles.info}>
          <dl className={styles.lines}>
            <div>
              <dt>{t('markets.hq')}</dt>
              <dd>{t('contact.address')}</dd>
            </div>
            {SITE.phone && (
              <div>
                <dt>{t('contact.phoneLabel')}</dt>
                <dd><a href={tel(SITE.phone)}>{SITE.phone}</a></dd>
              </div>
            )}
            {SITE.email && (
              <div>
                <dt>{t('contact.emailLabel')}</dt>
                <dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
              </div>
            )}
            {SITE.supportEmail && (
              <div>
                <dt>Support</dt>
                <dd><a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a></dd>
              </div>
            )}
          </dl>
          {waLink && (
            <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.whatsapp}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.06c-.24.68-1.42 1.32-1.96 1.38-.5.06-1.13.09-1.83-.12-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.18-4.94-4.37-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48l-.43.5c-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.97 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.65-.14.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.12.07.7-.17 1.38Z"/></svg>
              WhatsApp {SITE.phone}
            </a>
          )}
        </aside>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label className={styles.field}>
              <span>{t('contact.name')}</span>
              <input name="name" type="text" required autoComplete="name" />
            </label>
            <label className={styles.field}>
              <span>{t('contact.email')}</span>
              <input name="email" type="email" required autoComplete="email" />
            </label>
          </div>
          <label className={styles.field}>
            <span>{t('contact.company')}</span>
            <input name="company" type="text" autoComplete="organization" />
          </label>
          <label className={styles.field}>
            <span>{t('contact.message')}</span>
            <textarea ref={messageRef} name="message" rows={6} required placeholder={t('contact.messagePlaceholder')} />
          </label>
          <div className={styles.actions}>
            <button type="submit" className={styles.submit} disabled={status === 'sending'}>
              {status === 'sending' ? '…' : status === 'sent' ? `✓ ${t('contact.sent')}` : t('contact.sendEmail')}
            </button>
          </div>
          {status === 'error' && <p role="alert" className={styles.error}>{t('contact.error')}</p>}
        </form>
      </div>
    </section>
  );
}
