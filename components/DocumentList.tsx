import FolderIcon from '@mui/icons-material/Folder';
import { collection, orderBy, query } from 'firebase/firestore';
import { Session } from 'next-auth';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { db } from '../firebase.config';
import DocumentRow from './DocumentRow';
import Loading from './Loading';

interface Props {
  session: Session | null;
}

function DocumentList({ session }: Props) {
  const docRef = query(
    collection(db, 'userDocs', session?.user?.email!, 'docs'),
    orderBy('timestamp', 'desc')
  );
  const [data, loading, error] = useCollectionOnce(docRef);
  if (loading) {
    return <Loading />;
  }
  return (
    <section className=" bg-white px-10 md:px-0">
      <div className=" max-w-3xl mx-auto py-8 text-sm text-gray-700">
        <div className=" flex items-center">
          <h2 className=" font-medium flex-grow justify-center pb-5">
            My Documents
          </h2>
          <p className=" mr-12">Date Created</p>
          <FolderIcon color="secondary" fontSize="medium" />
        </div>
        {data?.docs.map((doc) => (
          <DocumentRow
            key={doc.id}
            id={doc.id}
            fileName={doc.data().fileName}
            date={doc.data().timestamp.toDate()}
          />
        ))}
      </div>
    </section>
  );
}

export default DocumentList;
