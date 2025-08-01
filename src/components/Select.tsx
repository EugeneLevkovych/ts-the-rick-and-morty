export default function Select({
  onChange,
  value,
  options,
  name,
  className = '',
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        name={name}
        className="appearance-none h-14 w-full border rounded-lg border-gray1 cursor-pointer p-4"
        onChange={onChange}
      >
        <option value="" disabled hidden>
          {name}
        </option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg className="absolute top-4 right-4 size-6 pointer-events-none">
        <use href="./sprite.svg#icon-triangle-down"></use>
      </svg>
    </div>
  );
}
