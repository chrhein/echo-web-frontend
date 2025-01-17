import axios from 'axios';
import { array, boolean, decodeType, record, string } from 'typescript-json-decoder';
import handleError from './errors';
import { SanityAPI } from '.';

// Automatically creates the Minute type with the
// fields we specify in our minuteDecoder.
type Minute = decodeType<typeof minuteDecoder>;
const minuteDecoder = record({
    date: string,
    allmote: boolean,
    title: string,
    document: (value) => record({ asset: record({ url: string }) })(value).asset.url,
});

const MinuteAPI = {
    /**
     * Get the n last meeting minutes.
     * @param n how many meeting minutes to retrieve
     */
    getMinutes: async (): Promise<{ minutes: Array<Minute> | null; error: string | null }> => {
        try {
            const query = `
                *[_type == "meetingMinute" && !(_id in path('drafts.**'))] | order(date desc) {
                    allmote,
                    date,
                    title,
                    document {
                        asset -> {
                            url
                        }
                    }
                }`;

            const result = await SanityAPI.fetch(query);

            return {
                minutes: array(minuteDecoder)(result),
                error: null,
            };
        } catch (error) {
            console.log(error); // eslint-disable-line
            return {
                minutes: null,
                error: handleError(axios.isAxiosError(error) ? error.response?.status || 500 : 500),
            };
        }
    },
};

export { MinuteAPI };
export type { Minute };
