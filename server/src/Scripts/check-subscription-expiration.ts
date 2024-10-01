import cron from 'node-cron';
import dayjs from 'dayjs';

import { SubscriptionSchool, SubscriptionSchoolModel } from '../Models/school.model';
import { notificationService } from '../Services/index.service';



export const initializeCronJobs = () => {
    cron.schedule('0 0 */7 * *', async () => {
        // cron.schedule('* * * * *', async () => {
        console.log('Cron job triggered');
        try {
            const today = dayjs();
            const twoDaysFromNow = dayjs().add(27, 'day').endOf('day');
            console.log(`Today: ${today}, 28 Day from Now: ${twoDaysFromNow}`);
            const expiringSchools: SubscriptionSchoolModel[] = await SubscriptionSchool.find({ endOfSubscription: { $gte: today.toDate(), $lte: twoDaysFromNow.toDate(), }, subscriptionStatus: 'paid', });
            console.log(`Found ${expiringSchools.length} schools`);
            // if (expiringSchools.length <= 0) return;
            for (const school of expiringSchools) {
                await notificationService.createNotification(school.admin, school._id, 'Subscription Expiration', 'Your subscription will expire in 2 days. Please renew your subscription.',);
            };
            console.log('check subscription expiration');
        } catch (err) {
            console.log('error inside check subscription expiration');
        };
    }, {
        timezone: 'Africa/Cairo'
    });
};