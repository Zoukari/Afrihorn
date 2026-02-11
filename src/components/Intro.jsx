import { useRef, useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { RadiantText } from './RadiantText';
import styles from './Intro.module.css';

const DURATION = 6000;

export function Intro() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: t('intro.p1'),
      author: t('intro.slide1Author'),
      role: t('intro.slide1Role'),
      company: t('intro.company')
    },
    {
      quote: t('intro.p2'),
      author: t('intro.slide2Author'),
      role: t('intro.slide2Role'),
      company: t('intro.company')
    },
    {
      quote: t('intro.p3'),
      author: t('intro.slide3Author'),
      role: t('intro.slide3Role'),
      company: t('intro.company')
    },
    {
      quote: t('intro.p4'),
      author: t('intro.slide4Author'),
      role: t('intro.slide4Role'),
      company: t('intro.company')
    }
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  function handleMouseMove(e) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, DURATION);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[activeIndex];
  const paddedIndex = String(activeIndex + 1).padStart(2, '0');
  const progressHeight = `${((activeIndex + 1) / testimonials.length) * 100}%`;

  const wordVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    exit: (i) => ({
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, delay: i * 0.02 }
    })
  };

  return (
    <section className={styles.section} id="about">
      <div
        ref={containerRef}
        className={styles.container}
        onMouseMove={handleMouseMove}
      >
        {/* Oversized index number with parallax */}
        <motion.div
          className={styles.bigNumber}
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              className={styles.bigNumberInner}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {paddedIndex}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <div className={styles.main}>
          {/* Left column: vertical label + progress */}
          <div className={styles.leftCol}>
            <motion.span
              className={styles.verticalLabel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <RadiantText duration={5} as="span">
                {t('intro.title')}
              </RadiantText>
            </motion.span>
            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressFill}
                animate={{ height: progressHeight }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center: badge, quote, author, nav */}
          <div className={styles.centerCol}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className={styles.badgeWrap}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                {current && (
                  <span className={styles.badge}>
                    <span className={styles.badgeDot} />
                    {current.company}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>

            <div className={styles.quoteWrap}>
              <AnimatePresence mode="wait">
                {current && (
                  <motion.blockquote
                    key={activeIndex}
                    className={styles.quote}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.05 } },
                      exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } }
                    }}
                  >
                    {current.quote.split(' ').map((word, i) => (
                      <motion.span
                        key={`${activeIndex}-${i}`}
                        className={styles.quoteWord}
                        variants={wordVariants}
                        custom={i}
                      >
                        {word}{' '}
                      </motion.span>
                    ))}
                  </motion.blockquote>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.authorRow}>
              <AnimatePresence mode="wait">
                {current && (
                  <motion.div
                    key={activeIndex}
                    className={styles.authorBlock}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <motion.span
                      className={styles.authorLine}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      style={{ originX: 0 }}
                    />
                    <div>
                      <p className={styles.authorName}>{current.author}</p>
                      <p className={styles.authorRole}>{current.role}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.nav}>
                <motion.button
                  type="button"
                  className={styles.navBtn}
                  onClick={goPrev}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous"
                >
                  <span className={styles.navBtnFill} />
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className={styles.navIcon}>
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
                <motion.button
                  type="button"
                  className={styles.navBtn}
                  onClick={goNext}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next"
                >
                  <span className={styles.navBtnFill} />
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className={styles.navIcon}>
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className={styles.tickerWrap}>
          <motion.div
            className={styles.ticker}
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className={styles.tickerItem}>
                {testimonials.map((item) => item.company).join(' • ')} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
