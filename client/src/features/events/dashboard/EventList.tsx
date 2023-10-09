import { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Segment, Item, Header } from "semantic-ui-react";

import { useStore } from "../../../app/stores";
import EventListItem from "./EventListItem";

export default observer(function EventList() {
  const { eventStore } = useStore();

  return (
    <>
      {eventStore.groupedEvents.map(([group, events]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {events.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
