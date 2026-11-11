import ServiceMockupCard from './ServiceMockupCard';
import { getServiceMockupData } from '../../data/mockupsData';

/**
 * ServiceMockup — Dispatcher de Consolas Interactivas de Servicios
 * Renderiza de forma modular y dinámica la simulación en tiempo real
 * correspondiente a cada especialidad de ingeniería de software.
 */
export default function ServiceMockup({
  serviceId,
  service,
  lang,
  language,
  variant = 'card'
}) {
  const activeId = serviceId || service?.id || 'paginas-web';
  const isEs = (lang || language || 'es') === 'es';
  const data = getServiceMockupData(activeId, isEs);

  return <ServiceMockupCard {...data} isEs={isEs} variant={variant} />;
}
