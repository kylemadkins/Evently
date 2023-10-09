import { useState } from "react";
import { Item, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { Event as IEvent } from "../../../app/types/Event";
import { useStore } from "../../../app/stores";

type Props = {
  event: IEvent;
};

export default function EventListItem({ event }: Props) {
  const { eventStore } = useStore();

  const [targetId, setTargetId] = useState("");

  const handleDelete = (id: string) => {
    eventStore.deleteEvent(id);
    setTargetId(id);
  };

  return (
    <Item>
      <Item.Content>
        <Item.Header as={Link} to={`/events/${event.id}`}>
          {event.title}
        </Item.Header>
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
            as={Link}
            to={`/events/${event.id}`}
            floated="right"
            content="View"
            color="blue"
          />
          <Button
            loading={eventStore.saving && event.id === targetId}
            floated="right"
            content="Delete"
            color="red"
            onClick={() => handleDelete(event.id)}
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}
