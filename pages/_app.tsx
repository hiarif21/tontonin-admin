import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Notify from '../components/atoms/Notify';
import { StreamingServicesProvider } from '../context/streamingServicesContext';
import { GenresProvider } from '../context/genresContext';
import { RolesProvider } from '../context/rolesContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RolesProvider>
      <GenresProvider>
        <StreamingServicesProvider>
          <Notify />
          <Component {...pageProps} />
        </StreamingServicesProvider>
      </GenresProvider>
    </RolesProvider>
  );
}

export default MyApp;
