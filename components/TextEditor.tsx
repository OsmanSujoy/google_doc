import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import {
  doc,
  DocumentData,
  DocumentReference,
  setDoc,
} from 'firebase/firestore';
import { Session } from 'next-auth';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { db } from '../firebase.config';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
);
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
    <div className=" justify-center bg-[#F8F9FA] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName=" flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"
      />
    </div>
  );
}

export default TextEditor;
