import { Menu, Container, Button } from "semantic-ui-react";

export default function Navigation() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/logo.png" alt="Evently" style={{ marginRight: "1rem" }} />
          Evently
        </Menu.Item>
        <Menu.Item name="Events"></Menu.Item>
        <Menu.Item>
          <Button positive content="Create Event" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
