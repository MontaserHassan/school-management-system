import { Ticket, TicketModel } from '../Models/tickets.model';



// ----------------------------- create ticket -----------------------------


const createTicket = async (schoolId: string, employeeId: string, parentId: string, message?: { content: string, senderId: string, senderName: string, receiverId: string, receiverName: string, }) => {
    const newTicket: TicketModel = new Ticket({
        schoolId: schoolId,
        employeeId: employeeId,
        parentId: parentId,
        messages: [
            {
                senderId: message?.senderId,
                senderName: message?.senderName,
                receiverId: message?.receiverId,
                dateCreation: new Date(),
            },
        ],
    });
    await newTicket.save();
    return newTicket;
};


// ----------------------------- get by id -----------------------------


const getById = async (ticketId: string) => {
    const ticket: TicketModel = await Ticket.findById(ticketId).select('-__v');
    return ticket;
};


const updateById = async (ticketId: string, updatedData: any) => {
    const updatedTicket: TicketModel = await Ticket.findByIdAndUpdate(ticketId, updatedData, { new: true }).select('-__v');
    return updatedTicket;
};



export default {
    createTicket,
    getById,
    updateById,
};