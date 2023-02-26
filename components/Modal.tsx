import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  createDocument: () => void;
  showModal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}
function Modal({ createDocument, showModal, setModal }: Props) {
  const [input, setInput] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => setModal(false);
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
          onKeyDown={(e) => e.key === 'Enter' && createDocument()}
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
          onKeyDown={createDocument}
          autoFocus
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
