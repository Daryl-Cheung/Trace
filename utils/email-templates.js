const BRAND = {
    name: 'Trace',
    accent: '#4F46E5',
    text: '#1F2937',
    muted: '#6B7280',
    border: '#E5E7EB',
    background: '#F3F4F6',
};

const detailRow = (label, value) => `
    <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.muted}; font-size: 14px;">${label}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.text}; font-size: 14px; font-weight: 600; text-align: right;">${value}</td>
    </tr>`;

const layout = ({ userName, subscriptionName, renewalDate, planName, price, paymentMethod }, introHtml, subject) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.background}; font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${BRAND.background}; padding: 32px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid ${BRAND.border};">
                    <tr>
                        <td style="padding: 24px 32px; border-bottom: 1px solid ${BRAND.border};">
                            <span style="font-size: 18px; font-weight: 700; color: ${BRAND.accent};">${BRAND.name}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 32px;">
                            <p style="margin: 0 0 16px; font-size: 15px; color: ${BRAND.text};">Hi ${userName},</p>
                            <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.5; color: ${BRAND.text};">${introHtml}</p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                                ${detailRow('Subscription', subscriptionName)}
                                ${detailRow('Plan', planName)}
                                ${detailRow('Price', price)}
                                ${detailRow('Renewal date', renewalDate)}
                                ${detailRow('Payment method', paymentMethod)}
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 32px; background-color: ${BRAND.background};">
                            <p style="margin: 0; font-size: 12px; line-height: 1.5; color: ${BRAND.muted};">
                                You're receiving this because you have an active subscription tracked with ${BRAND.name}. Manage your reminder preferences from your account settings.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const emailTemplates = [
    {
        type: 'reminder-7',
        generateSubject: (info) => `${info.subscriptionName} renews in 7 days`,
        generateEmailTemplate: (info) =>
            layout(info, `Your <strong>${info.subscriptionName}</strong> subscription renews in 7 days. Here's a quick summary so there are no surprises.`, `${info.subscriptionName} renews in 7 days`),
    },
    {
        type: 'reminder-5',
        generateSubject: (info) => `${info.subscriptionName} renews in 5 days`,
        generateEmailTemplate: (info) =>
            layout(info, `Just a heads up — <strong>${info.subscriptionName}</strong> is set to renew in 5 days.`, `${info.subscriptionName} renews in 5 days`),
    },
    {
        type: 'reminder-2',
        generateSubject: (info) => `${info.subscriptionName} renews in 2 days`,
        generateEmailTemplate: (info) =>
            layout(info, `<strong>${info.subscriptionName}</strong> renews in 2 days. Review the details below if you'd like to make changes.`, `${info.subscriptionName} renews in 2 days`),
    },
    {
        type: 'reminder-1',
        generateSubject: (info) => `${info.subscriptionName} renews tomorrow`,
        generateEmailTemplate: (info) =>
            layout(info, `<strong>${info.subscriptionName}</strong> renews tomorrow. This is your final reminder before you're charged.`, `${info.subscriptionName} renews tomorrow`),
    },
];
