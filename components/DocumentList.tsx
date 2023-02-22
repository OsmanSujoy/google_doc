import FolderIcon from '@mui/icons-material/Folder';
function DocumentList() {
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
      </div>
    </section>
  );
}

export default DocumentList;
