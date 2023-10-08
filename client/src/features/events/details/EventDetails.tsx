import { Card, Image, Button } from "semantic-ui-react";

import { useStore } from "../../../app/stores";

export default function EventDetails() {
  const { eventStore } = useStore();
  const { selectedEvent: event } = eventStore;

  if (!event) return;

  return (
    <Card>
      <Image src={`/categories/${event.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{event.title}</Card.Header>
        <Card.Meta>{event.date}</Card.Meta>
        <Card.Description>{event.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={eventStore.deselectEvent}
          />
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => eventStore.openForm(event.id)}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
