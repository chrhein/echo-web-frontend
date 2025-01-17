import { Center, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { Happening, Post } from '../lib/api';
import ButtonLink from './button-link';
import EntryList from './entry-list';
import ErrorBox from './error-box';
import Section from './section';

interface Props {
    title?: string;
    titles?: Array<string>;
    entries: Array<Happening | Post> | null;
    entryLimit: number;
    error: string | null;
    altText?: string;
    linkTo?: string;
    type: 'event' | 'bedpres' | 'post';
    direction: 'column' | 'row';
}

const EntryBox = ({
    title,
    titles,
    entries,
    entryLimit,
    error,
    altText,
    linkTo,
    type,
    direction,
}: Props): JSX.Element => {
    const choices = titles || [title];
    const heading = useBreakpointValue(choices); // cannot call hooks conditionally

    return (
        <Section data-cy={`entry-box-${type}`}>
            {heading && (
                <Center minW="0">
                    <Heading mb="5">{heading}</Heading>
                </Center>
            )}
            {!entries && error && <ErrorBox error={error} />}
            {altText && entries && !error && entries.length === 0 && (
                <Center>
                    <Text>{altText}</Text>
                </Center>
            )}
            {entries && !error && entries.length !== 0 && (
                <EntryList entries={entries} entryLimit={entryLimit} type={type} direction={direction} />
            )}
            {linkTo && <ButtonLink data-cy="se-mer" text="Se mer" linkTo={linkTo} />}
        </Section>
    );
};

EntryBox.defaultProps = {
    title: undefined,
    titles: undefined,
    entryLimit: undefined,
    linkTo: undefined,
    altText: undefined,
    direction: 'column',
};

export default EntryBox;
