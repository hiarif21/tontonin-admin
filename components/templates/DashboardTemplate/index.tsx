import {
  DashboardTemplateProps,
  DataDashboard,
} from '../../../types/dashboard';
import Cards from '../../organisms/dashboard/Cards';
import Layout from '../Layout';

const DashboardTemplate = ({ data }: DashboardTemplateProps) => {
  const dataX = Object.keys(data).map((key) => {
    const val = data[key as keyof DataDashboard].toLocaleString();
    key = key.replace('_', ' ');
    return {
      content: (
        <>
          <span className="text-xl font-bold text-slate-900">{val}</span>
          <span className="text-xs text-slate-500">{key}</span>
        </>
      ),
    };
  });

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-2 gap-5 p-5">
        <Cards data={dataX} />
      </div>
    </Layout>
  );
};

export default DashboardTemplate;
