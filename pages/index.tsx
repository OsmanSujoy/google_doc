import { useSession } from 'next-auth/react';
import Head from 'next/head';
import DocumentList from '../components/DocumentList';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Login from '../components/Login';
import NewDocument from '../components/NewDocument';

export default function Home() {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'authenticated') {
    return (
      <div>
        <Head>
          <title>Google Docs Clone</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <NewDocument />
        <DocumentList />
      </div>
    );
  }

  return <Login />;
}
