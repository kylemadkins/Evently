import { Link } from "react-router-dom";
import { Segment, Header, Icon, Button } from "semantic-ui-react";

import PageWithNav from "../../app/layout/PageWithNav";

export default function NotFound() {
  return (
    <PageWithNav>
      <Segment placeholder>
        <Header icon>
          <Icon name="search" />
          Oops, we couldn't find what you're looking for
        </Header>
        <Segment.Inline>
          <Button as={Link} to="/events" content="See all events" />
        </Segment.Inline>
      </Segment>
    </PageWithNav>
  );
}
