import { extendTheme } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';

const mainPallette = {
    transparent: 'transparent',
    black: '#000000',
    white: '#ffffff',
    bg: {
        light: {
            primary: '#e6e6e6',
            secondary: '#ffffff',
            tertiary: '#F5F5F5',
            hover: '#F5F5F5',
            border: '#ADADAD',
        },
        dark: {
            primary: '#1E1E1E',
            secondary: '#393939',
            tertiary: '#434343',
            hover: '#434343',
            border: '#808080',
        },
    },
    button: {
        light: {
            primary: '#19A0B3',
            secondary: '',
            primaryHover: '#48D1E5',
            secondaryHover: '',
            primaryActive: '#049fb2',
            secondaryActive: '',
        },
        dark: {
            primary: '#98E5F0',
            secondary: '',
            primaryHover: '#C0EFF6',
            secondaryHover: '',
            primaryActive: '#52afbe',
            secondaryActive: '',
        },
    },
    highlight: {
        light: {
            primary: '#19A0B3',
            secondary: '#FDC42F',
        },
        dark: {
            primary: '#98E5F0',
            secondary: '#FEDE8B',
        },
    },
    vermillion: '#333a56',
    fresh: '#52658f',
    yellow: {
        50: '#FFF8E6',
        100: '#FEEBB8',
        200: '#FEDE8B',
        300: '#FED15D',
        400: '#FDC42F',
        500: '#FDB702',
        600: '#CA9202',
        700: '#986E01',
        800: '#654901',
        900: '#332500',
    },
    cyan: {
        50: '#E9F9FC',
        100: '#C0EFF6',
        200: '#98E5F0',
        300: '#70DBEB',
        400: '#48D1E5',
        500: '#20C8DF',
        600: '#19A0B3',
        700: '#137886',
        800: '#0D5059',
        900: '#06282D',
    },
    gray: {
        50: '#F5F5F5',
        100: '#DFDFDF',
        200: '#C8C8C8',
        300: '#B2B2B2',
        400: '#9C9C9C',
        500: '#868686',
        600: '#6F6F6F',
        700: '#595959',
        800: '#434343',
        900: '#2D2D2D',
    },
};

const mainTheme = extendTheme({
    fonts: {
        heading: 'IBM Plex Serif',
        body: 'Raleway',
    },
    styles: {
        global: ({ colorMode }: { colorMode: string }) => ({
            body: {
                color: colorMode === 'light' ? 'black' : 'white',
                bg: colorMode === 'light' ? 'bg.light.primary' : 'bg.dark.primary',
                lineHeight: 'base',
                // eslint-disable-next-line react-hooks/rules-of-hooks
                fontSize: useBreakpointValue(['1rem', null, '1.25rem']),
            },
        }),
    },
    colors: mainPallette,
});

export default mainTheme;
