import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { RadiantText } from './RadiantText';
import { InteractiveHoverButton } from './InteractiveHoverButton';
import { SectionTitle } from './SectionTitle';
import styles from './Contact.module.css';
import lightStyles from './SectionTitleLight.module.css';
import { SITE, whatsappLink } from '../config/site';

const formItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  }
};

export function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

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

  const fields = [
    { name: 'name', type: 'text', label: t('contact.name'), required: true },
    { name: 'email', type: 'email', label: t('contact.email'), required: true },
    { name: 'company', type: 'text', label: t('contact.company'), required: false },
    { name: 'message', textarea: true, label: t('contact.message'), required: true, placeholder: t('contact.messagePlaceholder') }
  ];

  return (
    <section id="contact" className={styles.section}>
      <div className={lightStyles.lightSubtitle}>
        <SectionTitle>
          {t('nav.contact')}
        </SectionTitle>
      </div>
      <div className={styles.container}>
        {/* Left column: icon, title, intro, contact details, map */}
        <motion.div
          className={styles.leftCol}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.iconBox}>
            <svg className={styles.envelopeIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h2 className={styles.title}>
            <RadiantText duration={5} as="span">
              {t('contact.title')}
            </RadiantText>
          </h2>
          <p className={styles.intro}>{t('contact.intro')}</p>
          <div className={styles.contactLine}>
            {[
              SITE.email && <a key="e" href={`mailto:${SITE.email}`}>{SITE.email}</a>,
              SITE.phone && <a key="p" href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>,
              SITE.supportEmail && <a key="s" href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>,
            ]
              .filter(Boolean)
              .flatMap((el, i) => (i ? [<span key={`b${i}`} className={styles.bullet}>•</span>, el] : [el]))}
          </div>
        </motion.div>

        {/* Right column: form with grid pattern */}
        <motion.div
          className={styles.rightCol}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          >
            {fields.map((field) => (
              <motion.label key={field.name} className={styles.label} variants={formItem}>
                <span>{field.label}</span>
                {field.textarea ? (
                  <textarea
                    name={field.name}
                    rows={5}
                    required={field.required}
                    placeholder={field.placeholder}
                    className={styles.textarea}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    className={styles.input}
                  />
                )}
              </motion.label>
            ))}
            <motion.div className={styles.formActions} variants={formItem}>
              <InteractiveHoverButton
                type="submit"
                disabled={status === 'sending'}
                className={styles.submitBtn}
              >
                {status === 'sending' ? '...' : status === 'sent' ? `✓ ${t('contact.sent')}` : t('contact.sendEmail')}
              </InteractiveHoverButton>
              {waLink && (
                <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                  {t('contact.sendWhatsApp')}
                </a>
              )}
            </motion.div>
            {status === 'error' && (
              <p role="alert" className={styles.formError}>{t('contact.error')}</p>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
