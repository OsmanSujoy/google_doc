import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';
import DocumentList from '../components/DocumentList';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Login from '../components/Login';
import Modal from '../components/Modal';
import NewDocument from '../components/NewDocument';
import { authOptions } from './api/auth/[...nextauth]';

export default function Home() {
  const { status } = useSession();
  const [showModal, setModal] = useState(false);

  const handleClickOpen = () => {
    setModal(true);
  };

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
        <div>
          <Header />
          <div>
            <NewDocument handleClickOpen={handleClickOpen} />
            <Modal showModal={showModal} setModal={setModal} />
          </div>
        </div>
        <DocumentList />
      </div>
    );
  }

  return <Login />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  return {
    props: {
      session,
    },
  };
}
