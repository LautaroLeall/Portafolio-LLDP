import ServiceMockupCard from '../ServiceMockupCard';
import { getServiceMockupData } from '../../../data/mockupsData';

export default function BudgetAuditMockup({ isEs = true }) {
  const data = getServiceMockupData('revision-presupuesto', isEs);
  return <ServiceMockupCard {...data} isEs={isEs} />;
}
