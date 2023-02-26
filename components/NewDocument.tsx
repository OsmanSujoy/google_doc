import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import Image from 'next/image';

interface Props {
  handleClickOpen: () => void;
}

function NewDocument({ handleClickOpen }: Props) {
  return (
    <section className=" bg-[#F8F9FA pb-10 px-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between py-6">
          <h2 className=" text-gray-700 text-lg">Start a new document</h2>
          <Button disableRipple={false} className="border-0">
            <MoreVertIcon color="secondary" fontSize="medium" />
          </Button>
        </div>
        <div>
          <div
            onClick={() => handleClickOpen()}
            className=" relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
          >
            <Image
              src="/new_document.png"
              alt="Medium Logo"
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            ></Image>
          </div>
          <p className=" ml-2 mt-2 font-semibold text-sm text-gray-600">
            Blank
          </p>
        </div>
      </div>
    </section>
  );
}

export default NewDocument;
