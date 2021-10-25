import { record, string } from 'typescript-json-decoder';
import type { NextApiRequest, NextApiResponse } from 'next';
import SendGrid from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) throw Error('No SENDGRID_API_KEY defined.');

const adminKey = process.env.ADMIN_KEY;
if (!adminKey) throw Error('No ADMIN_KEY defined.');

SendGrid.setApiKey(apiKey);

const emailDecoder = record({
    from: string,
    to: string,
    subject: string,
    text: string,
});

export default (req: NextApiRequest, res: NextApiResponse) => {
    const auth = req.headers.authorization;

    if (!auth) return res.status(401).json({ message: 'No Authorization header' });

    const [user, pass] = Buffer.from(auth.split(' ')[1], 'base64').toString('ascii').split(':');

    if (user !== 'admin' || pass !== adminKey) return res.status(403).json({ message: 'Invalid credentials' });

    try {
        const email = emailDecoder(req.body);
        SendGrid.send(email);

        return res.status(200).json({ message: 'Successfully sent email' });
    } catch (err) {
        console.log(err); // eslint-disable-line

        return res.status(500).json({ message: JSON.stringify(err) });
    }
};
