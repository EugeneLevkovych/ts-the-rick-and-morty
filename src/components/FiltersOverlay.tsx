import { useState } from 'react';

export default function FiltersOverlay({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    setIsOpen(false);
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="relative md:hidden items-center bg-blue2 shadow-adv-filters-btn rounded-lg p-4 mb-12"
      >
        <svg className="absolute top-4 left-6 size-5 fill-gray4">
          <use href="./sprite.svg#icon-burger2"></use>
        </svg>
        <p className="text-center text-blue1">Advanced Filters</p>
      </div>

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-overlay md:hidden"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-[80%] absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded-sm pt-4 pb-5 px-3.5"
          >
            <div className="flex justify-between pb-4">
              <p>Filters</p>
              <svg onClick={onClose} className="size-6 fill-gray10">
                <use href="./sprite.svg#icon-close"></use>
              </svg>
            </div>
            <div className="flex flex-col gap-4 mb-8">{children}</div>
            <button
              onClick={onClose}
              className="w-full h-9 bg-blue2 text-blue1 rounded-sm shadow-adv-filters-btn"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
}
