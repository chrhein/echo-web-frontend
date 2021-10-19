import axios from 'axios';
import { array, decodeType, literal, union, record, string, number } from 'typescript-json-decoder';
import { SanityAPI } from './api';
import { Slug, slugDecoder } from './decoders';
import handleError from './errors';

export type JobAdvert = decodeType<typeof jobAdvertDecoder>;
const jobAdvertDecoder = record({
    slug: string,
    body: string,
    companyName: string,
    logoUrl: string,
    applyByDate: string,
    city: string,
    advertLink: string,
    jobType: union(literal('Fulltid'), literal('Deltid'), literal('Sommerjobb')),
    degreeYears: array(number),
});

export const JobAdvertAPI = {
    getPaths: async (): Promise<Array<string>> => {
        try {
            const query = `*[_type == "jobAdvert"]{ "slug": slug.current }`;
            const result = await SanityAPI.fetch(query);

            return array(slugDecoder)(result).map((nestedSlug: Slug) => nestedSlug.slug);
        } catch (error) {
            console.log(error); // eslint-disable-line
            return [];
        }
    },

    getJobAdverts: async (n: number): Promise<{ jobAdverts: Array<JobAdvert> | null; error: string | null }> => {
        try {
            const query = `*[_type == "jobAdvert" && !(_id in path('drafts.**'))] | order(_createdAt desc) [0..${n}] {
                    "slug": slug.current,
                    body,
                    companyName,
                    "logoUrl": logo.asset -> url,
                    applyByDate,
                    city,
                    advertLink,
                    jobType,
                    degreeYears
                }`;
            const result = await SanityAPI.fetch(query);

            return {
                jobAdverts: array(jobAdvertDecoder)(result),
                error: null,
            };
        } catch (error) {
            console.log(error); // eslint-disable-line
            return {
                jobAdverts: null,
                error: handleError(axios.isAxiosError(error) ? error.response?.status || 500 : 500),
            };
        }
    },

    getJobAdvertBySlug: async (slug: string): Promise<{ jobAdvert: JobAdvert | null; error: string | null }> => {
        try {
            const query = `
                *[_type == "jobAdvert" && slug.current == "${slug}" && !(_id in path('drafts.**'))] {
                    "slug": slug.current,
                    body,
                    companyName,
                    "logoUrl": logo.asset -> url,
                    applyByDate,
                    city,
                    advertLink,
                    jobType,
                    degreeYears
                }`;
            const result = await SanityAPI.fetch(query);

            return {
                jobAdvert: array(jobAdvertDecoder)(result)[0],
                error: null,
            };
        } catch (error) {
            console.log(error); // eslint-disable-line
            return {
                jobAdvert: null,
                error: handleError(axios.isAxiosError(error) ? error.response?.status || 500 : 500),
            };
        }
    },
};
