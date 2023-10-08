import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";

import { Event as IEvent } from "../types/Event";
import { api } from "../api";

export default class EventStore {
  events: IEvent[] = [];
  selectedEvent: IEvent | null = null;
  formOpen = false;
  loading = true;
  saving = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadEvents = async () => {
    try {
      const res = await api.Events.list();
      runInAction(() => {
        this.events = res.data.map((event) => ({
          ...event,
          date: event.date.split("T")[0],
        }));
      });
    } catch (err) {
      console.log(err);
    }
    runInAction(() => (this.loading = false));
  };

  selectEvent = (id: string) => {
    this.selectedEvent = this.events.find((event) => event.id === id) || null;
    this.formOpen = false;
  };

  deselectEvent = () => {
    this.selectedEvent = null;
  };

  openForm = (id?: string) => {
    if (id) {
      this.selectEvent(id);
    } else {
      this.deselectEvent();
    }
    this.formOpen = true;
  };

  closeForm = () => {
    this.formOpen = false;
  };

  createEvent = async (event: IEvent) => {
    this.saving = true;
    event.id = uuid();
    try {
      await api.Events.create(event);
      runInAction(() => {
        this.events = [...this.events, event];
        this.formOpen = false;
        this.selectedEvent = event;
      });
    } catch (err) {
      console.log(err);
    }
    runInAction(() => (this.saving = false));
  };

  updateEvent = async (event: IEvent) => {
    this.saving = true;
    try {
      await api.Events.update(event);
      runInAction(() => {
        this.events = [
          ...this.events.filter(({ id }) => id !== event.id),
          event,
        ];
        this.formOpen = false;
        this.selectedEvent = event;
      });
    } catch (err) {
      console.log(err);
    }
    runInAction(() => (this.saving = false));
  };

  deleteEvent = async (id: string) => {
    this.saving = true;
    try {
      await api.Events.delete(id);
      runInAction(() => {
        this.events = [...this.events.filter((event) => event.id !== id)];
        if (this.selectedEvent && this.selectedEvent.id === id) {
          this.selectedEvent = null;
        }
      });
    } catch (err) {
      console.log(err);
    }
    runInAction(() => (this.saving = false));
  };
}
