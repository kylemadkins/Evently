import { Dimmer, Loader } from "semantic-ui-react";

type Props = {
  inverted?: boolean;
  content?: string;
};

export default function Loading({
  inverted = true,
  content = "Loading...",
}: Props) {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
}
