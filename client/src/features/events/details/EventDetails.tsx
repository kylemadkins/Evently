import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Card, Image, Button } from "semantic-ui-react";

import { useStore } from "../../../app/stores";
import { Event as IEvent } from "../../../app/types/Event";
import Loading from "../../../app/layout/Loading";

export default observer(function EventDetails() {
  const { id } = useParams();

  const { eventStore } = useStore();
  const [event, setEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    if (id) {
      eventStore.loadEvent(id).then((event) => {
        if (event) setEvent(event);
      });
    }
  }, [id, eventStore]);

  if (eventStore.loading) return <Loading />;

  if (!event) return;

  return (
    <Card fluid>
      <Image src={`/categories/${event.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{event.title}</Card.Header>
        <Card.Meta>{event.date}</Card.Meta>
        <Card.Description>{event.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button as={Link} to="/events" basic color="grey" content="Cancel" />
          <Button
            as={Link}
            to={`/events/${event.id}/edit`}
            basic
            color="blue"
            content="Edit"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
