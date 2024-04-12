import Box from "@mui/material/Box"
import Breadcrumb, { LayoutProps } from "../components/Breadcrumb"
import { TextKeyboard } from "../components/keyboards"
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
    <Box sx={{ ...baseStyle, p: 8 }}>
      <Breadcrumb location={location} />
      <Box component="main" sx={baseStyle}>
        <Box sx={{
          borderBottom: theme => `solid 1px ${theme.palette.grey[400]}`,
          flexGrow: "1",
          mb: 8
        }}>
          {children}
        </Box>
        <TextKeyboard />
      </Box>
    </Box>
  )
} 