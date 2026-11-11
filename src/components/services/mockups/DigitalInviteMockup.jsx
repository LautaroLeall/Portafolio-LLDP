import ServiceMockupCard from '../ServiceMockupCard';
import { getServiceMockupData } from '../../../data/mockupsData';

export default function DigitalInviteMockup({ isEs = true }) {
  const data = getServiceMockupData('invitaciones-digitales', isEs);
  return <ServiceMockupCard {...data} isEs={isEs} />;
}
