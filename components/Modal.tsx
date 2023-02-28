import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { db } from '../firebase.config';
import Loading from './Loading';

interface Props {
  showModal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}
function Modal({ showModal, setModal }: Props) {
  const { data: Session } = useSession();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => setModal(false);

  const createDocument = async () => {
    if (!input) return;
    if (Session?.user?.email) {
      setLoading(true);
      try {
        const docRef = await addDoc(collection(db, 'userDocs'), {
          fileName: input,
          username: Session.user.email,
          timestamp: serverTimestamp(),
        });
        console.log('Document written with ID: ', docRef.id);
        setInput('');
        setLoading(false);
        setModal(false);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } else {
      console.log('No session');
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
