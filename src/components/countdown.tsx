import React from 'react';
import { Center, Text } from '@chakra-ui/react';
import { format, isBefore, parseISO } from 'date-fns';
import { useCountdown } from '../lib/hooks';
import { Bedpres } from '../lib/api/bedpres';
import { Event } from '../lib/api/event';
import HappeningForm from './happening-form';
import { HappeningType } from '../lib/api/registration';

const Countdown = ({
    happening,
    type,
    backendUrl,
    date,
}: {
    happening: Bedpres | Event;
    type: HappeningType;
    backendUrl: string;
    date: Date;
}): JSX.Element => {
    const regDate = happening.registrationTime ? parseISO(happening.registrationTime) : date;
    const { hours, minutes, seconds } = useCountdown(regDate, date);

    if (happening.registrationTime) {
        if (isBefore(date, parseISO(happening.registrationTime))) {
            if (hours > 23) {
                return (
                    <Center>
                        <Text fontSize="2xl">Åpner {format(regDate, 'dd. MMM yyyy, HH:mm')}</Text>
                    </Center>
                );
            }
            return (
                <Center data-testid="bedpres-not-open" my="3">
                    <Text fontWeight="bold" fontSize="5xl">
                        {hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} :{' '}
                        {seconds < 10 ? `0${seconds}` : seconds}
                    </Text>
                </Center>
            );
        }

        if (isBefore(date, parseISO(happening.date)) && isBefore(regDate, date)) {
            return <HappeningForm happening={happening} type={type} backendUrl={backendUrl} />;
        }

        return (
            <Center my="3" data-testid="bedpres-has-been">
                <Text>Påmeldingen er stengt.</Text>
            </Center>
        );
    }
    return <></>;
};

export default Countdown;
