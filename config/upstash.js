import { Client } from '@upstash/qstash';

import { QSTASH_URL, QSTASH_TOKEN } from './env.js';

export const workflowClient = new Client({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
});