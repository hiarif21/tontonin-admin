import DashboardTemplate from '../components/templates/DashboardTemplate';
import { getDashboard } from '../services/api/dashboard.service';

interface DashboardProps {
  data: {
    discovers: number;
    movies: number;
    persons: number;
    streaming_services: number;
  };
}

const Dashboard = ({ data }: DashboardProps) => {
  return <DashboardTemplate data={data} />;
};

export async function getServerSideProps() {
  const result = await getDashboard();
  return {
    props: {
      data: result.data,
    },
  };
}

export default Dashboard;
