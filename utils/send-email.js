import {emailTemplates} from './email-templates.js';
import dayjs from 'dayjs';
import transporter, {accountEmail} from '../config/nodemailer.js';


export const sendReminderEmail = async ({to, type, subscription}) => {
    if (!to || !type) {
        throw new Error('Missing required parameters: to and type are required');
    }

    const template = emailTemplates.find((t) => t.type === type);

    if(!template) {
        throw new Error(`Invalid email type: ${type}. Valid types are: ${emailTemplates.map(t => t.type).join(', ')}`);
    }

    const mainInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    }

    const message = template.generateEmailTemplate(mainInfo);
    const subject = template.generateSubject(mainInfo);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message,
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}:`, info.response);
}