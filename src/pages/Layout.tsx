import Box from "@mui/material/Box"
import Breadcrumb, { LayoutProps } from "../components/Breadcrumb"

export default function (
  { children, location }:
    React.HTMLProps<HTMLElement> & LayoutProps) {
  return (
    <Box sx={{
      p: 8
    }}>
      <Breadcrumb location={location}/>
      <main>
        {children}
      </main>
    </Box>
  )
} 