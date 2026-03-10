type PaginationProps = {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void; 
};

const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }: PaginationProps) => {
  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-2 justify-center mt-8">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)} // 👈 updated
          className={`px-2 py-2 rounded ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;