import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import EventList from "./EventList";
import EventDetails from "../details/EventDetails";
import EventForm from "../form/EventForm";
import { useStore } from "../../../app/stores";

export default observer(function EventDashboard() {
  const { eventStore } = useStore();

  return (
    <Grid>
      <Grid.Column width="10">
        <EventList />
      </Grid.Column>
      <Grid.Column width="6">
        {eventStore.selectedEvent && !eventStore.formOpen ? (
          <EventDetails />
        ) : (
          ""
        )}
        {eventStore.formOpen ? <EventForm /> : ""}
      </Grid.Column>
    </Grid>
  );
});
