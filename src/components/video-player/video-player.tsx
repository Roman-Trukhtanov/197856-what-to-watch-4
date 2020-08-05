import React, {Fragment} from "react";

interface Props {
  children: React.ReactNode | React.ReactNodeArray;
}

const VideoPlayer: React.FunctionComponent<Props> = (props: Props) => {
  const {
    children,
  } = props;

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default VideoPlayer;
