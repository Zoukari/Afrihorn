import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { RadiantText } from './RadiantText';
import { InteractiveHoverButton } from './InteractiveHoverButton';
import { SectionTitle } from './SectionTitle';
import styles from './Contact.module.css';
import lightStyles from './SectionTitleLight.module.css';

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
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 800);
  };

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
            <a href="mailto:contact@afrihorn.com">contact@afrihorn.com</a>
            <span className={styles.bullet}>•</span>
            <span>{t('contact.phone')}</span>
            <span className={styles.bullet}>•</span>
            <a href={`mailto:${t('contact.supportEmail')}`}>{t('contact.supportEmail')}</a>
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
                disabled={sending}
                className={styles.submitBtn}
              >
                {sending ? '...' : sent ? '✓ Sent' : t('contact.sendEmail')}
              </InteractiveHoverButton>
              <a
                href={`https://wa.me/971XXXXXXXXX?text=${encodeURIComponent(t('contact.whatsappPrefill') || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                {t('contact.sendWhatsApp')}
              </a>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
