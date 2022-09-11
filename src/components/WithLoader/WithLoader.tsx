import { memo } from "react";

import Loader, { LoaderSize } from "components/Loader/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
  size?: LoaderSize;
}>;

const WithLoader = ({ loading, size, children }: WithLoaderProps) => {
  return (
    <div>
      {loading && <Loader size={size}></Loader>}
      {!loading && children}
    </div>
  );
};

export default memo(WithLoader);
