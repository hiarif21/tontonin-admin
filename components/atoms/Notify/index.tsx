import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notify = () => {
  return <ToastContainer autoClose={2000} theme={'colored'} />;
};

export default Notify;
