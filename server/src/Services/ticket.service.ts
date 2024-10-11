import { Ticket, TicketModel } from '../Models/tickets.model';



// ----------------------------- create ticket -----------------------------


const createTicket = async (schoolId: string, userOne: { userId: string, userName: string, }, userTwo: { userId: string, userName: string, }) => {
    const newTicket: TicketModel = new Ticket({
        schoolId: schoolId,
        userOne: userOne,
        userTwo: userTwo,
        read: { userId: userTwo.userId, read: false },
    });
    await newTicket.save();
    return newTicket;
};


// ----------------------------- get by id -----------------------------


const getById = async (ticketId: string) => {
    const ticket: TicketModel = await Ticket.findById(ticketId).select('-__v');
    return ticket;
};


// ----------------------------- get by user id -----------------------------


const totalDocument = async (userId: string) => {
    const tickets = await Ticket.countDocuments({ $or: [{ 'userOne.userId': userId }, { 'userTwo.userId': userId }], });
    return tickets;
};


// ----------------------------- get by user id -----------------------------


const getTicketsByUserId = async (userId: string, limit: number, skip: number) => {
    const tickets: TicketModel[] = await Ticket.find({ $or: [{ 'userOne.userId': userId }, { 'userTwo.userId': userId }] }).limit(limit).skip(skip).select('-__v').sort({ updatedAt: -1 });;
    return tickets;
};


// ----------------------------- get by user id -----------------------------


const getTicketBetweenTwoUser = async (userOne: string, userTwo: string) => {
    const ticket: TicketModel = await Ticket.findOne({ $or: [{ 'userOne.userId': userOne, 'userTwo.userId': userTwo }, { 'userOne.userId': userTwo, 'userTwo.userId': userOne },] }).select('-__v');
    return ticket;
};


// ----------------------------- add new message -----------------------------


const addNewMessageById = async (ticketId: string, messageData: any, userRead: string) => {
    const updatedTicket: TicketModel = await Ticket.findByIdAndUpdate(ticketId, { $push: { messages: messageData }, read: { userId: userRead, isRead: false } }, { new: true }).select('-__v');
    return updatedTicket;
};


// ----------------------------- update by id -----------------------------


const updateById = async (ticketId: string, updatedData: any) => {
    const updatedTicket: TicketModel = await Ticket.findByIdAndUpdate(ticketId, updatedData, { new: true }).select('-__v');
    return updatedTicket;
};



export default {
    createTicket,
    getById,
    totalDocument,
    getTicketsByUserId,
    getTicketBetweenTwoUser,
    addNewMessageById,
    updateById,
};