import { createRequire } from 'module';
import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';

const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

const REMINDERS = [7, 5, 2, 1]; // days before renewal date to send reminders

export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscrtipion = await fetchSubscription(context, subscriptionId);

    if (!subscrtipion || subscrtipion.status != 'active') {
        return;
    }

    const renewalDate = dayjs(subscrtipion.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
        console.log(`Subscription ${subscriptionId} has already expired. No reminder sent.`);
        return;
    }

    console.log(`Sending reminder for subscription ${subscriptionId} to user ${subscrtipion.user.email}`);

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if(reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before renewal`, reminderDate);
        }

        if(dayjs().isSame(reminderDate, 'day')) {
            await triggerReminder(context, `Reminder for ${daysBefore} days before renewal`, subscrtipion, daysBefore);
        }

    
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder date: ${date.toISOString()}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription, daysBefore) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);

        await sendReminderEmail({
            to: subscription.user.email,
            type: `reminder-${daysBefore}`,
            subscription,
        });
    })
}