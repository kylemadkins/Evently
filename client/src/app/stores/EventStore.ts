import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";

import { Event as IEvent } from "../types/Event";
import { api } from "../api";

export default class EventStore {
  events = new Map<string, IEvent>();
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
        res.data.forEach((event) => {
          event.date = event.date.split("T")[0];
          this.events.set(event.id, event);
        });
      });
    } catch (err) {
      console.log(err);
    }
    runInAction(() => (this.loading = false));
  };

  get eventsByDate() {
    return [...this.events.values()].sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date),
    );
  }

  selectEvent = (id: string) => {
    this.selectedEvent = this.events.get(id) || null;
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
        this.events.set(event.id, event);
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
        this.events.set(event.id, event);
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
        this.events.delete(id);
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
