import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Notify from '../components/atoms/Notify';
import { StreamingServicesProvider } from '../context/streamingServicesContext';
import { GenresProvider } from '../context/genresContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GenresProvider>
      <StreamingServicesProvider>
        <Notify />
        <Component {...pageProps} />
      </StreamingServicesProvider>
    </GenresProvider>
  );
}

export default MyApp;
