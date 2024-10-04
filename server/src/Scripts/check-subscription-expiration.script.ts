import cron from 'node-cron';
import dayjs from 'dayjs';

import { SubscriptionSchool, SubscriptionSchoolModel } from '../Models/school.model';
import { notificationService } from '../Services/index.service';



export const sendNotification = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Cron job triggered');
        try {
            const today = dayjs().startOf('day');
            const checkDays = [
                { daysBefore: 5, message: 'Your subscription will expire in 5 days. Please renew your subscription.' },
                { daysBefore: 3, message: 'Your subscription will expire in 3 days. Please renew your subscription.' },
                { daysBefore: 1, message: 'Your subscription will expire in 1 day. Please renew your subscription.' }
            ];
            for (const check of checkDays) {
                const expirationDate = dayjs().add(check.daysBefore, 'day').endOf('day');
                console.log(`Checking for schools with subscriptions expiring in ${check.daysBefore} days: ${expirationDate}`);
                const expiringSchools: SubscriptionSchoolModel[] = await SubscriptionSchool.find({
                    endOfSubscription: {
                        $gte: today.toDate(),
                        $lte: expirationDate.toDate(),
                    },
                    subscriptionStatus: 'paid',
                });
                console.log(`Found ${expiringSchools.length} schools expiring in ${check.daysBefore} days`);
                for (const school of expiringSchools) {
                    await notificationService.createNotification(
                        school.admin,
                        school._id,
                        'Subscription Expiration',
                        check.message
                    );
                };
            };
            console.log('Checked subscription expiration for 5, 3, and 1 days before expiration');
        } catch (err) {
            console.log('Error during subscription expiration check:', err);
        };
    }, {
        timezone: 'Africa/Cairo'
    });
};