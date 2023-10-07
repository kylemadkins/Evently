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
  formOpen: boolean;
  onOpenForm: (id?: string) => void;
  onCloseForm: () => void;
  onSaveEvent: (event: IEvent) => void;
};

export default function EventDashboard({
  events,
  selectedEvent,
  onSelectEvent,
  onCancelSelectEvent,
  formOpen,
  onOpenForm,
  onCloseForm,
  onSaveEvent,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <EventList events={events} onSelectEvent={onSelectEvent} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedEvent && !formOpen ? (
          <EventDetails
            event={selectedEvent}
            onCancelSelectEvent={onCancelSelectEvent}
            onOpenForm={onOpenForm}
          />
        ) : (
          ""
        )}
        {formOpen ? (
          <EventForm
            selectedEvent={selectedEvent}
            onCloseForm={onCloseForm}
            onSaveEvent={onSaveEvent}
          />
        ) : (
          ""
        )}
      </Grid.Column>
    </Grid>
  );
}
