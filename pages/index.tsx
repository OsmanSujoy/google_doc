import Head from 'next/head';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="flex items-center">
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  );
}
