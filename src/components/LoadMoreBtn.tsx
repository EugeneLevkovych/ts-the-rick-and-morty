type LoadMoreBtnProps = {
  onClick: () => void;
};

export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <button
      onClick={onClick}
      className="w-36.5 md:w-38.5 h-9 block text-blue1 rounded-sm shadow-btn uppercase cursor-pointer mx-auto"
    >
      Load more
    </button>
  );
}
