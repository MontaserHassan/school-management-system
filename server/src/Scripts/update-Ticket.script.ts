import cron from 'node-cron';
import { Ticket } from '../Models/tickets.model';

// Schedule to check for expired tickets every year on January 1st at midnight
cron.schedule('0 0 1 1 *', async () => {
    try {
        await Ticket.updateMany({ expirationDate: { $lte: new Date() }, opened: true }, { opened: false });
    } catch (error) {
        console.error('Error closing expired tickets:', error);
    }
});
