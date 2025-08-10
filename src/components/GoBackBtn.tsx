// import { NavLink } from "react-router";

// type GoBackBtnProps = {
//   to: string;
// };

// export default function GoBackBtn({ to }: GoBackBtnProps) {
export default function GoBackBtn() {
  return (
    <div className="flex items-center gap-2 font-bold text-lg text-black uppercase cursor-pointer">
      <svg className="size-6">
        <use xlinkHref="/sprite.svg#icon-arrow-back"></use>
      </svg>
      <p>Go back</p>
    </div>
  );
}
