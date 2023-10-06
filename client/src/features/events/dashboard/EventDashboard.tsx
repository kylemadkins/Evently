import { Grid } from "semantic-ui-react";

import { Event as IEvent } from "../../../app/types/Event";
import EventList from "./EventList";
import EventDetails from "../details/EventDetails";
import EventForm from "../form/EventForm";

type Props = {
  events: IEvent[];
  selectedEvent: IEvent | null;
  onSelectEvent: (id: string) => void;
  onCancelSelectEvent: () => void;
};

export default function EventDashboard({
  events,
  selectedEvent,
  onSelectEvent,
  onCancelSelectEvent,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <EventList events={events} onSelectEvent={onSelectEvent} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedEvent ? (
          <EventDetails
            event={selectedEvent}
            onCancelSelectEvent={onCancelSelectEvent}
          />
        ) : (
          ""
        )}
        <EventForm />
      </Grid.Column>
    </Grid>
  );
}
