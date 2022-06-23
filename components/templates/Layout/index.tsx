import Head from 'next/head';
import { ReactNode } from 'react';
import Sidebar from '../../organisms/layout/Sidebar';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className="mb-20">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="sticky top-0 bg-white">
        <Sidebar title={title} />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
