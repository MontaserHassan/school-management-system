import { Ticket, TicketModel } from '../Models/tickets.model';



// ----------------------------- create ticket -----------------------------


const createTicket = async (schoolId: string, userOne: string, userTwo: string, message?: { content: string, senderId: string, senderName: string, receiverId: string, receiverName: string, }) => {
    const newTicket: TicketModel = new Ticket({
        schoolId: schoolId,
        userOne: userOne,
        userTwo: userTwo,
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


const getTicketsByUserId = async (userId: string) => {
    const tickets: TicketModel[] = await Ticket.find({ $or: [{ 'user1.userId': userId }, { 'user2.userId': userId }] }).select('-__v');
    return tickets;
};


// ----------------------------- update by id -----------------------------


const updateById = async (ticketId: string, updatedData: any) => {
    const updatedTicket: TicketModel = await Ticket.findByIdAndUpdate(ticketId, updatedData, { new: true }).select('-__v');
    return updatedTicket;
};



export default {
    createTicket,
    getById,
    getTicketsByUserId,
    updateById,
};