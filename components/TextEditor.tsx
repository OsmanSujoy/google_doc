import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import {
  doc,
  DocumentData,
  DocumentReference,
  setDoc,
} from 'firebase/firestore';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

import { db } from '../firebase.config';
import CustomEditor from './CustomEditor';

// const CustomSunEditor = dynamic(() => import('./SunEditor'), {
//   ssr: false,
// });
interface Props {
  session: Session | null;
  id: string | string[] | undefined;
  docRef: DocumentReference<DocumentData>;
}
function TextEditor({ session, id, docRef }: Props) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());

  const [snapshot, loading, error] = useDocumentOnce(docRef);

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      seteditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);

  const onEditorStateChange = async (editorState: EditorState) => {
    seteditorState(editorState);
    const docRef = doc(
      db,
      'userDocs',
      `${session?.user?.email!}`,
      'docs',
      `${id}`
    );
    await setDoc(
      docRef,
      {
        editorState: convertToRaw(editorState.getCurrentContent()),
      },
      { merge: true }
    );
  };

  return (
    // <div className=" justify-center bg-[#F8F9FA] min-h-screen pb-16">
    <CustomEditor />
    // </div>
  );
}

export default TextEditor;
