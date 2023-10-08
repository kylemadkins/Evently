import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img src="/logo.png" alt="Evently" style={{ marginRight: "1rem" }} />
          Evently
        </Menu.Item>
        <Menu.Item as={NavLink} to="/events" end name="Events"></Menu.Item>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/events/create"
            positive
            content="Create Event"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
