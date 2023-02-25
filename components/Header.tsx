import AppsIcon from '@mui/icons-material/Apps';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
      <Button
        disableRipple={false}
        className="hidden md:inline-flex cursor-pointer h-12 w-12 rounded-full mt-2 border-2 hover:bg-gray-200"
      >
        <MenuIcon color="secondary" fontSize="medium" />
      </Button>
      <DescriptionIcon color="primary" fontSize="large" />
      <h1 className="hidden sm:ml-2 text-gray-700 text-2xl">Docs</h1>
      <div className="mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
        <SearchIcon color="secondary" fontSize="medium" />
        <input
          type="text"
          placeholder="Search"
          className=" flex-grow px-5 text-base bg-transparent outline-none"
        />
      </div>
      <Button
        disableRipple={false}
        className="hidden md:inline-flex ml-5 md:ml-20 w-20 border-0"
      >
        <AppsIcon color="secondary" fontSize="medium" />
      </Button>
      <div className="cursor-pointer h-12 w-12 rounded-full ml-2">
        <Image
          loading="lazy"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg"
          alt="Profile Picture"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-full"
          onClick={() => signOut()}
        ></Image>
      </div>
    </header>
  );
}

export default Header;
