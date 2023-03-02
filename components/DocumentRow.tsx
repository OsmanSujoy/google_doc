import ArticleIcon from '@mui/icons-material/Article';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

interface Props {
  id: string;
  fileName: string;
  date: Date;
}

function DocumentRow({ id, fileName, date }: Props) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center p-4 rounded-lg
     hover:bg-gray-100 text-gray-700 
     text-sm cursor-pointer"
    >
      <ArticleIcon color="primary" fontSize="medium" />
      <p className=" flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{date.toLocaleDateString()}</p>
      <Button disableRipple={false} className="border-0">
        <MoreVertIcon color="secondary" fontSize="medium" />
      </Button>
    </div>
  );
}

export default DocumentRow;
