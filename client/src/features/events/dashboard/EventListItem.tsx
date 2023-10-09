import { Event as IEvent } from "../../../app/types/Event";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

type Props = {
  event: IEvent;
};

export default function EventListItem({ event }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/events/${event.id}`}>
                {event.title}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {event.date}
          <Icon name="marker" /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>{event.description}</span>
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
