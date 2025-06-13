import { extendTheme } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e3f9f5',
      100: '#c1ece2',
      200: '#9edfd0',
      300: '#7bd2be',
      400: '#58c5ab',
      500: '#3eab91', //primary shade
      600: '#2f8570',
      700: '#206050',
      800: '#103b30',
      900: '#001610',
    },
  },
})

export default theme
