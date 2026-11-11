import ServiceMockupCard from '../ServiceMockupCard';
import { getServiceMockupData } from '../../../data/mockupsData';

export default function WebBrowserMockup({ isEs = true }) {
  const data = getServiceMockupData('paginas-web', isEs);
  return <ServiceMockupCard {...data} isEs={isEs} />;
}
