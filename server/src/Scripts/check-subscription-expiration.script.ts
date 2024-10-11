import cron from 'node-cron';
import dayjs from 'dayjs';

import { SubscriptionSchool, SubscriptionSchoolModel } from '../Models/school.model';
import { notificationService } from '../Services/index.service';



export const sendNotification = () => {
    cron.schedule('0 0 * * *', async () => {
        // cron.schedule('* * * * *', async () => {
        try {
            const today = dayjs().startOf('day');
            const checkDays = [
                { daysBefore: 5, message: 'Your subscription will expire in 5 days. Please renew your subscription before: ' },
                { daysBefore: 3, message: 'Your subscription will expire in 3 days. Please renew your subscription before: ' },
                { daysBefore: 1, message: 'Your subscription will expire in 1 day. Please renew your subscription before: ' },
            ];
            const notifiedSchoolIds = new Set();
            for (const check of checkDays) {
                const expirationDate = dayjs().add(check.daysBefore, 'day').startOf('day');
                const expirationDateEnd = expirationDate.endOf('day');
                const expiringSchools: SubscriptionSchoolModel[] = await SubscriptionSchool.find({
                    endOfSubscription: {
                        $gte: expirationDate.toDate(),
                        $lte: expirationDateEnd.toDate(),
                    },
                    subscriptionStatus: 'paid',
                });
                for (const school of expiringSchools) {
                    if (!notifiedSchoolIds.has(school._id.toString())) {
                        await notificationService.createNotification(
                            school.admin,
                            school._id,
                            'Subscription Expiration',
                            `${check.message}${dayjs(school.endOfSubscription).format('YYYY-MM-DD')}.`,
                            false
                        );
                        notifiedSchoolIds.add(school._id.toString());
                        break;
                    };
                };
            };
        } catch (err) {
            console.log('Error during subscription expiration check:', err);
        };
    }, {
        timezone: 'Africa/Cairo'
    });
};