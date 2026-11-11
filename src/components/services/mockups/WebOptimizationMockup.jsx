import ServiceMockupCard from '../ServiceMockupCard';
import { getServiceMockupData } from '../../../data/mockupsData';

export default function WebOptimizationMockup({ isEs = true }) {
  const data = getServiceMockupData('mejora-web', isEs);
  return <ServiceMockupCard {...data} isEs={isEs} />;
}
