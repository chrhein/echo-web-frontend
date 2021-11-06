import {
    Button,
    Center,
    HStack,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { addHours, format } from 'date-fns';
import { nb } from 'date-fns/locale';
import React from 'react';
import { BiCalendar } from 'react-icons/bi';
import { CgOrganisation } from 'react-icons/cg';
import { ImLocation } from 'react-icons/im';
import { IoMdListBox } from 'react-icons/io';
import { MdEventSeat, MdLockOutline, MdLogout } from 'react-icons/md';
import { RiTimeLine } from 'react-icons/ri';
import AddToCalendarHOC, { SHARE_SITES } from 'react-add-to-calendar-hoc';
import { SpotRange, SpotRangeCount } from '../lib/api';
import IconText from './icon-text';
import ButtonLink from './button-link';

interface Props {
    date: Date;
    location: string;
    title: string;
    contactEmail: string | null;
    companyLink: string | null;
    spotRangeCounts: Array<SpotRangeCount> | null;
    spotRangesFromCms: Array<SpotRange> | null;
}

interface ModalProps {
    children: [];
    isOpen: boolean;
    onRequestClose: () => void;
}

const HappeningMetaInfo = ({
    date,
    location,
    title,
    contactEmail,
    companyLink,
    spotRangeCounts,
    spotRangesFromCms,
}: Props): JSX.Element => {
    // If spotrangeCounts (from backend) is null, we transform spotRangesFromCms
    // to the type spotRangeCount with regCount = 0 and waitListCount = 0.
    // This means spots from CMS will be displayed if backend does not respond.
    const trueSpotRanges: Array<SpotRangeCount> = spotRangeCounts
        ? spotRangeCounts
        : spotRangesFromCms?.map((sr: SpotRange) => {
              return {
                  spots: sr.spots,
                  minDegreeYear: sr.minDegreeYear,
                  maxDegreeYear: sr.maxDegreeYear,
                  regCount: 0,
                  waitListCount: 0,
              };
          }) || [];

    const minDegreeYear =
        trueSpotRanges.length === 0 ? 1 : Math.min(...trueSpotRanges.map((sr: SpotRange) => sr.minDegreeYear));
    const maxDegreeYear =
        trueSpotRanges.length === 0 ? 5 : Math.max(...trueSpotRanges.map((sr: SpotRange) => sr.maxDegreeYear));

    const dontShowDegreeYear =
        (minDegreeYear === 1 && maxDegreeYear === 5 && trueSpotRanges.length === 1) || trueSpotRanges.length === 1;

    const { isOpen, onClose } = useDisclosure();

    const CustomModal = ({ children, isOpen, onRequestClose }: ModalProps) => {
        return (
            <Modal isOpen={isOpen} onClose={onRequestClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Legg til i din kalender</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <HStack>
                                {children.map((child: JSX.Element, index: number) => {
                                    return (
                                        <ButtonLink
                                            key={index}
                                            text={child.key?.toString() || ''}
                                            linkTo={child.props.href}
                                        />
                                    );
                                })}
                            </HStack>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    };

    const AddToCalendarModal = AddToCalendarHOC(Button, CustomModal);

    const addToCalendarEvent = {
        duration: 4,
        endDatetime: format(addHours(date, 4), 'yyyymmddthhmmssz'),
        location: location,
        startDatetime: format(date, 'yyyymmddthhmmssz'),
        title: title,
    };

    return (
        <VStack alignItems="left" spacing={3}>
            {companyLink && (
                <IconText
                    icon={CgOrganisation}
                    text={companyLink.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]}
                    link={companyLink}
                />
            )}
            {trueSpotRanges.map((sr: SpotRangeCount) => (
                <>
                    {sr.regCount === 0 && sr.spots !== 0 && (
                        <IconText
                            key={`mdeventseat1-${sr.spots}`}
                            icon={MdEventSeat}
                            text={`${sr.spots} plasser`.concat(
                                dontShowDegreeYear ? '' : `for ${sr.minDegreeYear}. - ${sr.maxDegreeYear}. trinn`,
                            )}
                        />
                    )}
                    {sr.regCount !== 0 && (
                        <IconText
                            key={`mdeventseat2-${sr.spots}`}
                            icon={MdEventSeat}
                            text={`${Math.min(sr.regCount, sr.spots)}/${sr.spots} påmeldt`.concat(
                                dontShowDegreeYear ? '' : ` for ${sr.minDegreeYear}. - ${sr.maxDegreeYear}. trinn`,
                            )}
                        />
                    )}
                    {sr.waitListCount > 0 && (
                        <IconText
                            key={`iomdlistbox-${sr.waitListCount}`}
                            icon={IoMdListBox}
                            text={`${sr.waitListCount} på venteliste`.concat(
                                dontShowDegreeYear ? '' : ` for ${sr.minDegreeYear}. - ${sr.maxDegreeYear}. trinn`,
                            )}
                        />
                    )}
                </>
            ))}
            <IconText icon={BiCalendar} text={format(date, 'dd. MMM yyyy', { locale: nb })} />
            <IconText icon={RiTimeLine} text={format(date, 'HH:mm')} />
            <IconText icon={ImLocation} text={location} />
            {contactEmail && (
                <IconText
                    icon={MdLogout}
                    text="Avmelding"
                    link={`mailto:${contactEmail}?subject=Avmelding '${title}'`}
                />
            )}
            {minDegreeYear && maxDegreeYear && (minDegreeYear > 1 || maxDegreeYear < 5) && (
                <IconText
                    icon={MdLockOutline}
                    text={`Bare for ${
                        minDegreeYear === maxDegreeYear ? `${minDegreeYear}` : `${minDegreeYear}. - ${maxDegreeYear}`
                    }. trinn`}
                />
            )}
            <AddToCalendarModal
                buttonText="Legg til i kalender"
                event={addToCalendarEvent}
                isOpen={isOpen}
                onRequestClose={onClose}
                items={[SHARE_SITES.GOOGLE, SHARE_SITES.ICAL]}
            />
        </VStack>
    );
};

export default HappeningMetaInfo;
