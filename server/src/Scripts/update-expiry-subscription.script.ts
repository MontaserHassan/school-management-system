import cron from 'node-cron';
import { SubscriptionSchool } from '../Models/school.model';



export const updateExpiredSubscriptions = async () => {
    cron.schedule('0 0 */10 * *', async () => {
        console.log('Cron job triggered');
        try {
            const today = new Date();
            const subscriptions = await SubscriptionSchool.find({ endOfSubscription: { $lt: today }, subscriptionStatus: { $ne: 'expired' }, });
            for (const subscription of subscriptions) {
                subscription.subscriptionStatus = 'expired';
                await subscription.save();
                console.log(`Subscription for ${subscription.schoolName} updated to expired.`);
            };
            console.log('Subscription status check completed.');
        } catch (error) {
            console.error('Error checking expired subscriptions:', error);
        };
    }, {
        timezone: 'Africa/Cairo'
    });
};