import { Button, Center, LinkBox, LinkOverlay, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

interface Props {
    text: string;
    linkTo: string;
}

const ButtonLink = ({ text, linkTo }: Props): JSX.Element => {
    const bg = useColorModeValue('button.light.primary', 'button.dark.primary');
    const hover = useColorModeValue('button.light.primaryHover', 'button.dark.primaryHover');
    const active = useColorModeValue('button.light.primaryActive', 'button.dark.primaryActive');
    const textColor = useColorModeValue('white', 'black');
    return (
        <Center>
            <LinkBox data-cy="button-link">
                <NextLink href={linkTo} passHref>
                    <LinkOverlay>
                        <Button
                            bg={bg}
                            color={textColor}
                            _hover={{ bg: hover }}
                            _active={{ borderColor: active }}
                            mt="1.5rem"
                            fontSize="xl"
                            borderRadius="0.5rem"
                        >
                            {text}
                        </Button>
                    </LinkOverlay>
                </NextLink>
            </LinkBox>
        </Center>
    );
};

export default ButtonLink;
