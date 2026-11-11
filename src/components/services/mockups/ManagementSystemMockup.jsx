import ServiceMockupCard from '../ServiceMockupCard';
import { getServiceMockupData } from '../../../data/mockupsData';

export default function ManagementSystemMockup({ isEs = true }) {
  const data = getServiceMockupData('sistemas-gestion', isEs);
  return <ServiceMockupCard {...data} isEs={isEs} />;
}
