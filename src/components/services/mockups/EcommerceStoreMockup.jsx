import ServiceMockupCard from '../ServiceMockupCard';
import { getServiceMockupData } from '../../../data/mockupsData';

export default function EcommerceStoreMockup({ isEs = true }) {
  const data = getServiceMockupData('tienda-online', isEs);
  return <ServiceMockupCard {...data} isEs={isEs} />;
}
