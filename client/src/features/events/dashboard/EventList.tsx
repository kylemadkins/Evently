import { useState } from "react";
import { Segment, Item, Label, Button } from "semantic-ui-react";

import { Event as IEvent } from "../../../app/types/Event";

type Props = {
  events: IEvent[];
  onSelectEvent: (id: string) => void;
  onDeleteEvent: (id: string) => void;
  saving: boolean;
};

export default function EventList({
  events,
  onSelectEvent,
  onDeleteEvent,
  saving,
}: Props) {
  const [targetId, setTargetId] = useState("");

  const handleDelete = (id: string) => {
    onDeleteEvent(id);
    setTargetId(id);
  };

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
                <Button
                  loading={saving && event.id === targetId}
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={() => handleDelete(event.id)}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
