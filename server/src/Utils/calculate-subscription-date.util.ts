import { addMonths, addYears } from 'date-fns';



const calculateSubscriptionDate = (subscriptionWay: string, date: Date): Date => {
    if (subscriptionWay === 'yearly') {
        return addYears(date, 1);
    } else if (subscriptionWay === 'monthly') {
        return addMonths(date, 1);
    }
};


export default calculateSubscriptionDate;