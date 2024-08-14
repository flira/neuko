import theme from '@/utils/theme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import KeyboardProvider from "./KeyboardProvider"

export default function AppProvider({ children }: React.HTMLProps<Element>) {
  return (
    <ThemeProvider theme={theme}>
      <KeyboardProvider>
        {children}
      </KeyboardProvider>
    </ThemeProvider>
  )
}
