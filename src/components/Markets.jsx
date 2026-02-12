import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { RadiantText } from './RadiantText';
import { SectionTitle } from './SectionTitle';
import styles from './Markets.module.css';
import titleStyles from './MarketsTitleOverride.module.css';

export function Markets() {
  const { t, lang } = useLanguage();
  const currentLang = lang || 'en';

  const regions = [
    { name: "East Africa", nameFr: "Afrique de l'Est", nameAr: "شرق أفريقيا", details: "Kenya, Tanzania, Somalia, Djibouti" },
    { name: "Arabian Gulf", nameFr: "Golfe Arabique", nameAr: "الخليج العربي", details: "UAE, Oman, Qatar, Bahrain" },
    { name: "Red Sea Corridor", nameFr: "Corridor Mer Rouge", nameAr: "ممر البحر الأحمر", details: "Saudi Arabia, Sudan, Yemen" },
    { name: "Indian Ocean", nameFr: "Océan Indien", nameAr: "المحيط الهندي", details: "Seychelles, Mauritius, Madagascar" }
  ];

  const clients = [
    { title: "Port Authorities", titleFr: "Autorités Portuaires", titleAr: "سلطات الموانئ", desc: "Container terminals & dry ports" },
    { title: "Naval Forces", titleFr: "Forces Navales", titleAr: "القوات البحرية", desc: "Warships & naval bases" },
    { title: "Coast Guards", titleFr: "Garde-côtes", titleAr: "خفر السواحل", desc: "Patrol & rescue vessels" },
    { title: "Railway Corps", titleFr: "Sociétés Ferroviaires", titleAr: "الشركات السكك الحديدية", desc: "Locomotives & signaling" }
  ];

  const ports = [
    "Djibouti", "Mombasa", "Dar es Salaam", "Jeddah", "Aden", "Mogadishu", "Berbera", "Port Sudan"
  ];

  return (
    <section id="markets" className={styles.section}>
      <div className={titleStyles.whiteTitle}>
        <SectionTitle subtitle={t('markets.subtitle')}>
          {t('nav.locations')}
        </SectionTitle>
      </div>
      <div className={styles.container}>
        

        {/* Geographic Coverage - Styled List */}
        <div className={styles.gridSection}>
          <h3 className={styles.sectionLabel}>{t('markets.regionsTitle')}</h3>
          <div className={styles.regionList}>
            {regions.map((region, i) => (
              <motion.div 
                key={i} 
                className={styles.regionItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
              >
                <span className={styles.regionName}>
                  {currentLang === 'ar' ? region.nameAr : currentLang === 'fr' ? region.nameFr : region.name}
                </span>
                <span className={styles.regionDetails}>{region.details}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Clients - Cards */}
        <div className={styles.gridSection}>
          <h3 className={styles.sectionLabel}>{t('markets.clientsTitle')}</h3>
          <div className={styles.clientGrid}>
            {clients.map((client, i) => (
              <motion.div 
                key={i} 
                className={styles.clientCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 280 }}
              >
                <div className={styles.clientLine} />
                <h4 className={styles.clientTitle}>
                  {currentLang === 'ar' ? client.titleAr : currentLang === 'fr' ? client.titleFr : client.title}
                </h4>
                <p className={styles.clientDesc}>{client.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Major Ports - Marquee Style */}
        <div className={styles.portsWrapper}>
          <h3 className={styles.sectionLabel}>{t('markets.portsTitle')}</h3>
          <div className={styles.portsList}>
            {ports.map((port, i) => (
              <span key={i} className={styles.portItem}>{port}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}