import { motion } from 'framer-motion';
import { ServiceSection } from './ServiceSection';
import styles from './ServicesGrid.module.css';

const services = [
  { id: 'port-operations', image: '/port_operations.avif' },
  { id: 'marine-services', image: '/marine_services.avif' },
  { id: 'shipyard-operations', image: '/shipyard.jpg' },
  { id: 'docking-berthing', image: '/docking_bethering_support.jpg' },
  { id: 'engineering-fabrication', image: '/engineering.jpg' },
  { id: 'safety-compliance', image: '/Safety, Compliance & Inspection.jpg' },
  { id: 'equipment-supply', image: '/Equipment- Supply.jpg' },
  { id: 'project-technical', image: '/Project & Technical Support.jpeg' },
  { id: 'logistics-supply', image: '/Trading & Agencies.jpeg' },
  { id: 'offshore-support', image: '/offshore_support.jpg' },
  { id: 'trading-agencies', image: '/Trading & Agencies.jpeg' },
  { id: 'consultancies-research', image: '/Project & Technical Support.jpeg' },
];

export function ServicesGrid() {
  return (
    <div className={styles.servicesScroll}>
      {services.map((service, idx) => (
        <ServiceSection key={service.id} service={service} index={idx} />
      ))}
    </div>
  );
}
