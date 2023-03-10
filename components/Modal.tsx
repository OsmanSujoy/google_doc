import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { Session } from 'next-auth';
import { Dispatch, SetStateAction, useState } from 'react';
import { db } from '../firebase.config';
import Loading from './Loading';

interface Props {
  showModal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
}
function Modal({ showModal, setModal, session }: Props) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => setModal(false);

  const createDocument = async () => {
    if (!input) return;
    if (session?.user?.email) {
      setLoading(true);
      try {
        const docRef = doc(db, 'userDocs', session.user.email);
        const colRef = collection(docRef, 'docs');

        await addDoc(colRef, {
          fileName: input,
          username: session.user.email,
          timestamp: serverTimestamp(),
        });
        // console.log('Document written with ID: ', docRef.id);
        setInput('');
        setLoading(false);
        setModal(false);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={showModal}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {'Create new document?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide a name for your new document.
        </DialogContentText>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          margin="dense"
          id="name"
          label="Enter name of document"
          type="text"
          fullWidth
          variant="standard"
          onKeyDown={(e) => e.key === 'Enter' && (async () => createDocument())}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          autoFocus
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={async () => createDocument()}
          autoFocus
          disabled={loading}
        >
          Create
        </Button>
        {loading && <Loading />}
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
