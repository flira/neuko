import Box from "@mui/material/Box"
import Breadcrumb, { LayoutProps } from "@/components/Breadcrumb"
import { SxProps } from "@mui/material"

export default function Layout (
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
      <Box component="main" sx={{
        ...baseStyle,
        bgcolor: theme => theme.palette.background.paper
      }}>
        {children}
      </Box>
    </Box>
  )
} 