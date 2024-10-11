import cron from 'node-cron';
import { SubscriptionSchool } from '../Models/school.model';
import { notificationService } from '../Services/index.service';



export const updateExpiredSubscriptions = async () => {
    cron.schedule('0 0 */10 * *', async () => {
        // cron.schedule('* * * * *', async () => {
        try {
            const today = new Date();
            const subscriptions = await SubscriptionSchool.find({ endOfSubscription: { $lt: today }, subscriptionStatus: { $ne: 'expired' }, });
            for (const subscription of subscriptions) {
                subscription.subscriptionStatus = 'expired';
                await subscription.save();
                await notificationService.createNotification(subscription.admin, subscription._id, 'Subscription Expiration', 'Your subscription has expired. Please renew your subscription.',);
            };
            // console.log('Subscription status check completed.');
        } catch (error) {
            console.error('Error checking expired subscriptions:', error);
        };
    }, {
        timezone: 'Africa/Cairo'
    });
};