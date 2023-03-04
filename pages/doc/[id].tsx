import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import { Button } from '@mui/material';
import { doc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import Loading from '../../components/Loading';
import TextEditor from '../../components/TextEditor';
import { db } from '../../firebase.config';
import { authOptions } from '../api/auth/[...nextauth]';

function Doc() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const { id } = router.query;
  const docRef = doc(
    db,
    'userDocs',
    `${session?.user?.email!}`,
    'docs',
    `${id}`
  );
  const [data, loading, error] = useDocumentOnce(docRef);

  if (status === 'loading' || loading) {
    return <Loading />;
  }
  if (status !== 'authenticated' && !loading && !data?.data()) {
    router.replace('/');
  }
  return (
    <div>
      <header className=" flex justify-between items-center p-3 pb-2">
        <span onClick={() => router.push('/')} className=" cursor-pointer">
          <DescriptionIcon color="primary" fontSize="large" />
        </span>
        <div className=" flex-grow px-2">
          <h2>{data?.data()?.fileName}</h2>
          <div
            className=" flex items-center text-sm space-x-1
           -ml-1 h-8 text-gray-600"
          >
            <p className=" option">File</p>
            <p className=" option">Edit</p>
            <p className=" option">View</p>
            <p className=" option">Insert</p>
            <p className=" option">Format</p>
            <p className=" option">Tools</p>
          </div>
        </div>
        <Button
          className=" hidden md:inline-flex h-10"
          style={{
            backgroundColor: '#2196f3',
          }}
          variant="contained"
          startIcon={<PeopleIcon />}
        >
          SHARE
        </Button>
        <div className="cursor-pointer h-11 w-11 rounded-full ml-2">
          <Image
            loading="lazy"
            src={
              session?.user?.image ||
              'https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg'
            }
            alt="Profile Picture"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-full rounded-full"
            onClick={() => signOut()}
          ></Image>
        </div>
      </header>
      <TextEditor session={session} id={id} docRef={docRef} />
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  return {
    props: {
      session,
    },
  };
}
