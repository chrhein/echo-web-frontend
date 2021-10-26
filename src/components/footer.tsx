import {
    Center,
    Flex,
    Icon,
    LinkBox,
    LinkOverlay,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const echoLogoWhite = '/echo-logo-text-only-white.png';
const sanityLogo = '/sanity-logo.svg';

const Footer = (): JSX.Element => {
    const color = useColorModeValue('highlight.light.primary', 'highlight.dark.primary');

    return (
        <SimpleGrid
            columns={[1, 2, 4]}
            bg="bg.dark.secondary"
            justifyItems="center"
            alignItems="center"
            spacingX="3em"
            spacingY="3em"
            w="100%"
            py="0.75em"
            px="1em"
            mt="5em"
            bottom="0"
            pos="absolute"
            data-testid="footer"
        >
            <SimpleGrid columns={[4, 4, 2, 4, 4]} spacing="4">
                <LinkBox transition=".1s ease-out" _hover={{ transform: 'scale(1.05)' }} color={color}>
                    <NextLink href="https://facebook.com/groups/informatikk" passHref>
                        <LinkOverlay isExternal>
                            <Icon as={FaFacebook} w={12} h={12} />
                        </LinkOverlay>
                    </NextLink>
                </LinkBox>
                <LinkBox transition=".1s ease-out" _hover={{ transform: 'scale(1.05)' }} color={color}>
                    <NextLink href="https://github.com/echo-webkom/echo.uib.no" passHref>
                        <LinkOverlay isExternal>
                            <Icon as={FaGithub} w={12} h={12} />
                        </LinkOverlay>
                    </NextLink>
                </LinkBox>
                <LinkBox transition=".1s ease-out" _hover={{ transform: 'scale(1.05)' }} color={color}>
                    <NextLink href="mailto:echo@uib.no" passHref>
                        <LinkOverlay isExternal>
                            <Icon as={FiMail} w={12} h={12} />
                        </LinkOverlay>
                    </NextLink>
                </LinkBox>
                <LinkBox transition=".1s ease-out" _hover={{ transform: 'scale(1.05)' }} color={color}>
                    <NextLink href="https://instagram.com/echo_uib" passHref>
                        <LinkOverlay isExternal>
                            <Icon as={FaInstagram} w={12} h={12} />
                        </LinkOverlay>
                    </NextLink>
                </LinkBox>
            </SimpleGrid>
            <Flex display={['none', 'block', 'block']}>
                <Image alt="echo" width={175} height={85} src={echoLogoWhite} />
            </Flex>
            <SimpleGrid columns={1} alignItems="center">
                <VStack spacing="0">
                    <Text fontSize="sm" color="white">
                        POWERED BY
                    </Text>
                    <LinkBox>
                        <NextLink href="https://sanity.io" passHref>
                            <LinkOverlay isExternal>
                                <Center>
                                    <Image alt="sanity" width={175} height={52.5} src={sanityLogo} />
                                </Center>
                            </LinkOverlay>
                        </NextLink>
                    </LinkBox>
                </VStack>
            </SimpleGrid>
            <SimpleGrid columns={1} maxWidth="400px" textAlign="center">
                <LinkBox transition=".1s ease-out" _hover={{ transform: 'scale(1.05)' }}>
                    <NextLink href="mailto:echo@uib.no" passHref>
                        <LinkOverlay isExternal>
                            <Text fontSize="md" color={color}>
                                echo(at)uib.no
                            </Text>
                        </LinkOverlay>
                    </NextLink>
                </LinkBox>
                <LinkBox transition=".1s ease-out" _hover={{ transform: 'scale(1.05)' }}>
                    <NextLink href="https://goo.gl/maps/adUsBsoZh3QqNvA36" passHref>
                        <LinkOverlay isExternal>
                            <Text fontSize="md" color={color}>
                                Thormøhlensgate 55
                            </Text>
                            <Text fontSize="md" color={color}>
                                5006 Bergen
                            </Text>
                        </LinkOverlay>
                    </NextLink>
                </LinkBox>
                <LinkBox transition=".1s ease-out" _hover={{ transform: 'scale(1.05)' }}>
                    <NextLink href="https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=998995035" passHref>
                        <LinkOverlay isExternal>
                            <Text fontSize="md" color={color}>
                                Org nr: 998 995 035
                            </Text>
                        </LinkOverlay>
                    </NextLink>
                </LinkBox>
            </SimpleGrid>
        </SimpleGrid>
    );
};

export default Footer;
