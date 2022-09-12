import { memo } from "react";

import Loader, { LoaderProps } from "components/Loader/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loaderProps: LoaderProps;
}>;

const WithLoader = ({ loaderProps, children }: WithLoaderProps) => {
  return (
    <div>
      {loaderProps.loading && (
        <Loader
          size={loaderProps.size}
          className={loaderProps.className}
        ></Loader>
      )}
      {!loaderProps.loading && children}
    </div>
  );
};

export default memo(WithLoader);
