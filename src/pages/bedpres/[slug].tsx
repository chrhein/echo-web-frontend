import React from 'react';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { Bedpres, BedpresAPI } from '../../lib/api/bedpres';
import { HappeningType, RegistrationAPI, RegistrationCount } from '../../lib/api/registration';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

import ErrorBox from '../../components/error-box';
import HappeningUI from '../../components/happening';
import { useRouter } from 'next/router';
import { useTimeout } from '@chakra-ui/react';
import { differenceInMilliseconds, parseISO } from 'date-fns';

const BedpresPage = ({
    bedpres,
    backendUrl,
    regCount,
    date,
    error,
}: {
    bedpres: Bedpres;
    backendUrl: string;
    regCount: RegistrationCount;
    date: number;
    error: string;
}): JSX.Element => {
    const router = useRouter();
    const regDate = parseISO(bedpres?.registrationTime);
    const time =
        !bedpres || differenceInMilliseconds(regDate, date) < 0 || differenceInMilliseconds(regDate, date) > 172800000
            ? null
            : differenceInMilliseconds(regDate, date);

    useTimeout(() => {
        router.replace(router.asPath, undefined, { scroll: false });
    }, time);

    return (
        <Layout>
            {error && !bedpres && <ErrorBox error={error} />}
            {bedpres && !error && (
                <>
                    <SEO title={bedpres.title} />
                    <HappeningUI
                        bedpres={bedpres}
                        event={null}
                        backendUrl={backendUrl}
                        regCount={regCount}
                        date={date}
                    />
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
    const { bedpres, error } = await BedpresAPI.getBedpresBySlug(slug);
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';

    const bedkomKey = process.env.BEDKOM_KEY;
    if (!bedkomKey) throw Error('No BEDKOM_KEY defined.');

    const { regCount } = await RegistrationAPI.getRegistrationCount(bedkomKey, slug, HappeningType.BEDPRES, backendUrl);

    const date = Date.now();

    if (error === '404') {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            bedpres,
            regCount,
            date,
            backendUrl,
            error,
        },
    };
};

export default BedpresPage;
