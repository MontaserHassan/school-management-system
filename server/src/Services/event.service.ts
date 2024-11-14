import { Event, EventModel } from '../Models/events.model';
import generateId from 'Utils/generate-id.util';



// ----------------------------- create Event -----------------------------


const createEvent = async (eventData: { schoolId: string, eventName: string, date: Date, description: string, userId: string, username: string }[]) => {
    const event = await Event.insertMany(eventData);
    return event;
};


// ----------------------------- find events by event id -----------------------------


const findEventByEventId = async (eventId: string, schoolId: string) => {
    const event: EventModel[] = await Event.find({ eventId, schoolId }).select('-__v');
    return event;
};


// ----------------------------- aggregation of events -----------------------------


const eventDetails = async (eventId: string) => {
    const eventDetails = await Event.aggregate([
        { $match: { eventId } },
        {
            $group: {
                _id: null,
                totalAttending: { $sum: { $cond: [{ $eq: ['$response', 'Accepted'] }, 1, 0] } },
                totalRejected: { $sum: { $cond: [{ $eq: ['$response', 'Rejected'] }, 1, 0] } },
                totalNoResponse: { $sum: { $cond: [{ $eq: ['$response', 'Not Response'] }, 1, 0] } },
                attendees: { $push: { userId: '$userId', username: '$username' } },
                rejected: { $push: { userId: '$userId', username: '$username' } },
                noResponse: { $push: { userId: '$userId', username: '$username' } },
            },
        },
    ]);
    return eventDetails;
};


// ----------------------------- find all events for user -----------------------------


const findAllEventsForUser = async (userId: string) => {
    const events: EventModel[] = await Event.find({ userId }).select('-__v').sort({ createdAt: -1 });
    return events;
};


// ----------------------------- find event by id -----------------------------


const findEventForUser = async (eventId: string) => {
    const event: EventModel = await Event.findById(eventId).select('-__v').sort({ createdAt: -1 });
    return event;
};


// ----------------------------- update event by id -----------------------------


const updateEvent = async (eventId: string, response: string) => {
    const event: EventModel = await Event.findByIdAndUpdate(eventId, { response: response }, { new: true });
    return event;
};



export default {
    createEvent,
    findEventByEventId,
    eventDetails,
    findAllEventsForUser,
    findEventForUser,
    updateEvent,
};