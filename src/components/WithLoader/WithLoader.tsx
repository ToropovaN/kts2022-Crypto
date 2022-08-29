import { Loader } from "../Loader/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader = ({ loading, children }: WithLoaderProps) => {
  return (
    <div>
      {loading && <Loader></Loader>}
      {!loading && children}
    </div>
  );
};
