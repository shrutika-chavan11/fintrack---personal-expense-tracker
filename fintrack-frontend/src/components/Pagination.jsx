const Pagination = () => {
  return (
    <div className="flex justify-end items-center gap-3 mt-6">

      <button className="border px-4 py-2 rounded-lg">
        Previous
      </button>

      <span className="font-medium">
        Page 1
      </span>

      <button className="border px-4 py-2 rounded-lg">
        Next
      </button>

    </div>
  );
};

export default Pagination;