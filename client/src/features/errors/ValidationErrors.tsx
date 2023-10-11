import { Message } from "semantic-ui-react";

type Props = {
  errors: string[];
};

export default function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      <Message.List>
        {errors.map((err, index) => (
          <Message.Item key={index}>{err}</Message.Item>
        ))}
      </Message.List>
    </Message>
  );
}
