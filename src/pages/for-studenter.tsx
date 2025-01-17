import Markdown from 'markdown-to-jsx';
import { GetStaticProps } from 'next';
import React from 'react';
import anononymeTilbakemeldinger from '../../public/static/for-studenter/anonymeTilbakemeldinger.md';
import masterinfo from '../../public/static/for-studenter/masterinfo.md';
import okonomiskStotte from '../../public/static/for-studenter/okonomiskStotte.md';
import utleggsskjema from '../../public/static/for-studenter/utleggsskjema.md';
import SEO from '../components/seo';
import StaticInfo from '../components/static-info';
import StudentGroupSection from '../components/student-group-section';
import { StudentGroup, StudentGroupAPI } from '../lib/api';
import MapMarkdownChakra from '../markdown';

const ForStudenterPage = ({
    subGroups,
    subGroupsError,
    subOrgs,
    subOrgsError,
    intGroups,
    intGroupsError,
}: {
    subGroups: Array<StudentGroup>;
    subGroupsError: string;
    subOrgs: Array<StudentGroup>;
    subOrgsError: string;
    intGroups: Array<StudentGroup>;
    intGroupsError: string;
}): JSX.Element => {
    return (
        <>
            <SEO title="For studenter" />
            <StaticInfo
                tabNames={[
                    'Undergrupper',
                    'Underorganisasjoner',
                    'Interessegrupper',
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
                    <StudentGroupSection
                        key="interessegrupper"
                        studentGroups={intGroups}
                        error={intGroupsError}
                        groupType="interessegrupper"
                    />,
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
            />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const subGroups = await StudentGroupAPI.getStudentGroupsByType('subgroup');
    const subOrgs = await StudentGroupAPI.getStudentGroupsByType('suborg');
    const intGroups = await StudentGroupAPI.getStudentGroupsByType('intgroup');

    return {
        props: {
            intGroups: intGroups.studentGroups,
            intGroupsError: intGroups.error,
            subGroups: subGroups.studentGroups,
            subGroupsError: subGroups.error,
            subOrgs: subOrgs.studentGroups,
            subOrgsError: subOrgs.error,
        },
    };
};

export default ForStudenterPage;
