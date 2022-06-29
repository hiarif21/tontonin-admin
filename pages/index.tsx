import DashboardTemplate from '../components/templates/DashboardTemplate';
import { getDashboard } from '../services/api/dashboard.service';
import { DashboardProps } from '../types/dashboard';

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
