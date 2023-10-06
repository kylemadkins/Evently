import { Segment, Item, Label, Button } from "semantic-ui-react";

import { Event as IEvent } from "../../../app/types/Event";

type Props = {
  events: IEvent[];
  onSelectEvent: (id: string) => void;
};

export default function EventList({ events, onSelectEvent }: Props) {
  return (
    <Segment>
      <Item.Group divided>
        {events.map((event) => (
          <Item key={event.id}>
            <Item.Content>
              <Item.Header as="a">{event.title}</Item.Header>
              <Item.Meta>{event.date}</Item.Meta>
              <Item.Description>
                <div>{event.description}</div>
                <div>
                  {event.city}, {event.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Label basic content={event.category} />
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => onSelectEvent(event.id)}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
