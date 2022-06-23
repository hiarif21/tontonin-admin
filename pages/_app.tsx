import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Notify from '../components/atoms/Notify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Notify />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
