import { observer } from "mobx-react-lite";
import { Segment, Item } from "semantic-ui-react";

import { useStore } from "../../../app/stores";
import EventListItem from "./EventListItem";

export default observer(function EventList() {
  const { eventStore } = useStore();

  return (
    <Segment>
      <Item.Group divided>
        {eventStore.eventsByDate.map((event) => (
          <EventListItem key={event.id} event={event} />
        ))}
      </Item.Group>
    </Segment>
  );
});
