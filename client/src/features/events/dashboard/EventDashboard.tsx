import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../app/stores";
import EventList from "./EventList";
import Loading from "../../../app/layout/Loading";

export default observer(function EventDashboard() {
  const { eventStore } = useStore();

  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]);

  if (eventStore.loading) return <Loading />;

  return (
    <Grid>
      <Grid.Column width="10">
        <EventList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
});
