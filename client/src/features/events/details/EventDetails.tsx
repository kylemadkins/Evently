import { Card, Image, Button } from "semantic-ui-react";

import { Event as IEvent } from "../../../app/types/Event";

type Props = {
  event: IEvent;
};

export default function EventDetails({ event }: Props) {
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
          <Button basic color="blue" content="Edit" />
          <Button basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
