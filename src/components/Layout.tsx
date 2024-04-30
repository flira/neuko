import Box from "@mui/material/Box"
import Breadcrumb, { LayoutProps } from "../components/Breadcrumb"
import { TextKeyboard } from "../components/keyboard"
import { SxProps } from "@mui/material"

export default function (
  { children, location }:
    React.HTMLProps<HTMLElement> & LayoutProps) {
  const baseStyle: SxProps = {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1"
  }
  return (
    <Box sx={{ ...baseStyle, p: 2 }}>
      <Breadcrumb location={location} />
      <Box component="main" sx={{...baseStyle,
        bgcolor: theme => theme.palette.background.paper
      }}>
        <TextKeyboard>
          {children}
        </TextKeyboard>
      </Box>
    </Box>
  )
} 