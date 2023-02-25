import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="h-40 w-40 border-0">
        <Image
          src="/google_docs_logo.png"
          alt="Google docs Logo"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
        ></Image>
      </div>
      <Button
        onClick={() => {
          signIn();
        }}
        className="w-44 mt-10"
        variant="outlined"
        disableRipple={false}
        startIcon={<LoginIcon />}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
