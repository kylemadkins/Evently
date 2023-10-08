import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function Home() {
  return (
    <Container style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
      <h1>Home</h1>
      <p>
        Go to <Link to="/events">Events</Link>
      </p>
    </Container>
  );
}
