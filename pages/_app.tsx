import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Notify from '../components/atoms/Notify';
import { StreamingServicesProvider } from '../context/streamingServicesContext';
import { GenresProvider } from '../context/genresContext';
import { RolesProvider } from '../context/rolesContext';
import { WatchOptionsProvider } from '../context/watchOptionsContext';
import { PersonsProvider } from '../context/personsContext';
import { MoviesProvider } from '../context/moviesContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoviesProvider>
      <PersonsProvider>
        <WatchOptionsProvider>
          <RolesProvider>
            <GenresProvider>
              <StreamingServicesProvider>
                <Notify />
                <Component {...pageProps} />
              </StreamingServicesProvider>
            </GenresProvider>
          </RolesProvider>
        </WatchOptionsProvider>
      </PersonsProvider>
    </MoviesProvider>
  );
}

export default MyApp;
