import React from 'react';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { EventAPI, Event } from '../../lib/api/event';

import ErrorBox from '../../components/error-box';
import HappeningUI from '../../components/happening';
import { HappeningType, RegistrationAPI, RegistrationCount } from '../../lib/api/registration';
import { useRouter } from 'next/router';
import { differenceInMilliseconds, formatISO, parseISO } from 'date-fns';
import { useTimeout } from '../../lib/hooks';

const EventPage = ({
    event,
    backendUrl,
    regCount,
    date,
    error,
}: {
    event: Event;
    backendUrl: string;
    regCount: RegistrationCount;
    date: number;
    error: string;
}): JSX.Element => {
    const router = useRouter();
    const regDate = parseISO(event?.registrationTime || formatISO(new Date()));
    const time =
        !event || differenceInMilliseconds(regDate, date) < 0 || differenceInMilliseconds(regDate, date) > 172800000
            ? null
            : differenceInMilliseconds(regDate, date);

    useTimeout(() => {
        if (event.registrationTime) router.replace(router.asPath, undefined, { scroll: false });
    }, time);

    return (
        <Layout>
            {error && !event && <ErrorBox error={error} />}
            {event && !error && (
                <>
                    <SEO title={event.title} />
                    <HappeningUI bedpres={null} event={event} backendUrl={backendUrl} regCount={regCount} date={date} />
                </>
            )}
        </Layout>
    );
};

interface Params extends ParsedUrlQuery {
    slug: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params as Params;
    const { event, error } = await EventAPI.getEventBySlug(slug);
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';

    const bedkomKey = process.env.BEDKOM_KEY;
    if (!bedkomKey) throw Error('No BEDKOM_KEY defined.');

    const { regCount } = await RegistrationAPI.getRegistrationCount(bedkomKey, slug, HappeningType.EVENT, backendUrl);

    const date = Date.now();

    if (error === '404') {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            event,
            regCount,
            date,
            backendUrl,
            error,
        },
    };
};

export default EventPage;
