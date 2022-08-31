import Loader from "@components/Loader/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader = ({ loading, children }: WithLoaderProps) => {
  return (
    <div>
      {loading && <Loader></Loader>}
      {!loading && children}
    </div>
  );
};

export default WithLoader;
