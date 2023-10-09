import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

export default function Home() {
  return (
    <Segment inverted textAlign="center" vertical className="hero">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/logo.png"
            alt="Evently"
            style={{ marginBottom: "1rem" }}
          />
          Evently
        </Header>
        <Header as="h2" inverted content="Welcome to Evently" />
        <Button
          size="large"
          as={Link}
          to="/events"
          inverted
          style={{ marginRight: 0 }}
        >
          Take me to the events
        </Button>
      </Container>
    </Segment>
  );
}
