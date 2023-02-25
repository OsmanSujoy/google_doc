import { useSession } from 'next-auth/react';
import Head from 'next/head';
import DocumentList from '../components/DocumentList';
import Header from '../components/Header';
import Login from '../components/Login';
import NewDocument from '../components/NewDocument';

export default function Home() {
  const { data: session } = useSession();

  if (!session) return <Login />;
  else
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
