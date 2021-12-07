import { eventsRepo } from "../../repository/events";

async function addEvent({ eventInfo }) {
  // TODO: try to use models and validations in use-cases
  // add validations to chedk if the event is in the past, check if there are more than 2 events on the same day
  const docsDate = await eventsRepo.getEventByDate({ date: eventInfo?.date });
  if (docsDate.length >= 2)
    throw new Error(`Cannot have any more events on ${eventInfo?.date}`);
  return eventsRepo.createEvent({ eventInfo });
}

async function getEvent({ id }) {
  return eventsRepo.getEventById({ id });
}

async function getEventsForSlots(slots) {
  return eventsRepo.getEventsForSlots(slots);
}

export const eventsUseCases = {
  addEvent,
  getEvent,
  getEventsForSlots,
};
