import { Event, EventModel } from '../Models/events.model';



// ----------------------------- create Event -----------------------------


const createEvent = async (eventData: { schoolId: string, eventName: string, date: Date, description: string, userId: string, username: string, expiryDate: Date }[]) => {
    const event = await Event.insertMany(eventData);
    return event;
};


// ----------------------------- find events by event id -----------------------------


const findEventByEventId = async (eventId: string,) => {
    const event: EventModel = await Event.findById(eventId).select('-__v');
    return event;
};


// ----------------------------- aggregation of events -----------------------------


const eventDetails = async (eventId: string) => {
    const eventDetails = await Event.aggregate([
        { $match: { eventId } },
        {
            $group: {
                _id: null,
                totalAttending: { $sum: { $cond: [{ $eq: ['$response', 'Accept'] }, 1, 0] } },
                totalRejected: { $sum: { $cond: [{ $eq: ['$response', 'Reject'] }, 1, 0] } },
                totalNoResponse: { $sum: { $cond: [{ $eq: ['$response', 'Not Response'] }, 1, 0] } },
                attendees: { $push: { $cond: [{ $eq: ['$response', 'Accept'] }, { userId: '$userId', username: '$username' }, null], }, },
                rejected: { $push: { $cond: [{ $eq: ['$response', 'Reject'] }, { userId: '$userId', username: '$username' }, null], }, },
                noResponse: { $push: { $cond: [{ $eq: ['$response', 'Not Response'] }, { userId: '$userId', username: '$username' }, null], }, },
            },
        },
        {
            $project: {
                _id: 0, totalAttending: 1, totalRejected: 1, totalNoResponse: 1,
                attendees: { $filter: { input: '$attendees', as: 'item', cond: { $ne: ['$$item', null] }, }, },
                rejected: { $filter: { input: '$rejected', as: 'item', cond: { $ne: ['$$item', null] }, }, },
                notResponse: { $filter: { input: '$noResponse', as: 'item', cond: { $ne: ['$$item', null] }, }, },
            },
        },
    ]);
    return eventDetails.length ? eventDetails[0] : { totalAttending: 0, totalRejected: 0, totalNoResponse: 0, attendees: [], rejected: [], noResponse: [], };
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