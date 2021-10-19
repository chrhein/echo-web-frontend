import Markdown from 'markdown-to-jsx';
import { GetStaticProps } from 'next';
import React from 'react';
import anononymeTilbakemeldinger from '../../public/static/for-studenter/anonymeTilbakemeldinger.md';
import masterinfo from '../../public/static/for-studenter/masterinfo.md';
import okonomiskStotte from '../../public/static/for-studenter/okonomiskStotte.md';
import utleggsskjema from '../../public/static/for-studenter/utleggsskjema.md';
import JobAdvertList from '../components/job-advert-list';
import Layout from '../components/layout';
import SEO from '../components/seo';
import StaticInfo from '../components/static-info';
import StudentGroupSection from '../components/student-group-section';
import { JobAdvert, JobAdvertAPI, StudentGroup, StudentGroupAPI } from '../lib/api';
import MapMarkdownChakra from '../markdown';

const ForStudenterPage = ({
    subGroups,
    subGroupsError,
    subOrgs,
    subOrgsError,
    jobAdverts,
    jobAdvertsError,
}: {
    subGroups: Array<StudentGroup>;
    subGroupsError: string;
    subOrgs: Array<StudentGroup>;
    subOrgsError: string;
    jobAdverts: Array<JobAdvert>;
    jobAdvertsError: string;
}): JSX.Element => {
    return (
        <Layout>
            <SEO title="For studenter" />
            <StaticInfo
                tabNames={[
                    'Undergrupper',
                    'Underorganisasjoner',
                    'Stillingsannonser',
                    'Masterinfo',
                    'Økonomisk støtte',
                    'Anonyme tilbakemeldinger',
                    'Utlegg på vegne av echo',
                ]}
                tabPanels={[
                    <StudentGroupSection
                        key="undergrupper"
                        studentGroups={subGroups}
                        error={subGroupsError}
                        groupType="undergrupper"
                    />,
                    <StudentGroupSection
                        key="underorganisasjoner"
                        studentGroups={subOrgs}
                        error={subOrgsError}
                        groupType="underorganisasjoner"
                    />,
                    <JobAdvertList key="stillingsannonser" jobAdverts={jobAdverts} error={jobAdvertsError} />,
                    <Markdown key="masterinfo" options={{ overrides: MapMarkdownChakra }}>
                        {masterinfo}
                    </Markdown>,
                    <Markdown key="okonomisk-stotte" options={{ overrides: MapMarkdownChakra }}>
                        {okonomiskStotte}
                    </Markdown>,
                    <Markdown key="anononyme-tilbakemeldinger" options={{ overrides: MapMarkdownChakra }}>
                        {anononymeTilbakemeldinger}
                    </Markdown>,
                    <Markdown key="utleggsskjema" options={{ overrides: MapMarkdownChakra }}>
                        {utleggsskjema}
                    </Markdown>,
                ]}
                noSection={[false, false, true, false, false, false]}
            />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const subGroups = await StudentGroupAPI.getStudentGroupsByType('subgroup');
    const subOrgs = await StudentGroupAPI.getStudentGroupsByType('suborg');
    const jobAdverts = await JobAdvertAPI.getAdverts(10);

    return {
        props: {
            subGroups: subGroups.studentGroups,
            subGroupsError: subGroups.error,
            subOrgs: subOrgs.studentGroups,
            subOrgsError: subOrgs.error,
            jobAdverts: jobAdverts.jobAdverts,
            jobAdvertsError: jobAdverts.error,
        },
    };
};

export default ForStudenterPage;
