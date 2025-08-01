type InputProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  className: string;
};

export default function Input({
  search,
  setSearch,
  className = "",
}: InputProps) {
  return (
    <div className="relative">
      <svg className="size-6 absolute top-4 left-4 fill-gray1">
        <use href="/sprite.svg#icon-leading"></use>
      </svg>
      <input
        value={search}
        className={`${className} h-14 border rounded-lg border-gray1 py-3 pl-12`}
        type="text"
        placeholder="Filter by name..."
        onChange={(e) => setSearch(e.target.value)}
        name="search"
      />
    </div>
  );
}
