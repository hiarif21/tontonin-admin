import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Notify from '../components/atoms/Notify';
import { StreamingServicesProvider } from '../context/streamingServicesContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StreamingServicesProvider>
      <Notify />
      <Component {...pageProps} />
    </StreamingServicesProvider>
  );
}

export default MyApp;
