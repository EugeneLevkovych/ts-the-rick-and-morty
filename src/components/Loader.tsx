type LoaderProps = {
  item: string;
};

export default function Loader({ item }: LoaderProps) {
  return (
    <div className="container pt-21 pb-20.5 md:pt-19 md:pb-9 container-centered">
      <p>Loading {item}...</p>
    </div>
  );
}
