import { Menu, Container, Button } from "semantic-ui-react";

type Props = {
  onOpenForm: (id?: string) => void;
};

export default function Navigation({ onOpenForm }: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/logo.png" alt="Evently" style={{ marginRight: "1rem" }} />
          Evently
        </Menu.Item>
        <Menu.Item name="Events"></Menu.Item>
        <Menu.Item>
          <Button
            positive
            content="Create Event"
            onClick={() => onOpenForm()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
