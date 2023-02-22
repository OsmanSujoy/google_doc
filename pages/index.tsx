import Head from 'next/head';
import DocumentList from '../components/DocumentList';
import Header from '../components/Header';
import NewDocument from '../components/NewDocument';

export default function Home() {
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
