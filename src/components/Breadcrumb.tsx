import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Icon from "./Icon"
import React, { useId } from "react"

/** Nome da localização */
type LayoutPropsKey = string
/** Código do ícone do material design */
type LayoutPropsValue = string

export interface LayoutProps {
  /** Serve para criar o breadcrumb */
  location?: { [k: LayoutPropsKey]: LayoutPropsValue }
}

export default function Breadcrumb({ location }: LayoutProps) {
  const id = useId()
  const Path = ({ id }: React.HTMLProps<HTMLElement>) => location ?
      Object.entries(location).map(locationMap.bind(null, id || "")) :
      undefined

  return (
    <Box component="header" sx={{ pb: 2 }}>
      <Box
        component="ol"
        aria-label="Breadcrump visual"
        sx={{ alignItems: "center", display: "flex", gap: 2, listStyle: "none", m: 0, p: 0 }}>
        <li>
          <Typography
            variant="h1"
            sx={theme => ({
              color: location ?
                theme.palette.text.secondary : theme.palette.text.primary
            })}>Neuko</Typography>
        </li>
        <Path id={id} />
      </Box>
    </Box>
  )
}

function locationMap(
  id: string,
  [key, value]: [key: LayoutPropsKey, value: LayoutPropsValue],
  i: number,
  arr: [string, string][]) {
  const current = i === arr.length - 1
  return (
    <Box
      component="li"
      key={`${id}-${i}`}
      aria-current={current ? "page" : undefined}
      sx={{
        alignItems: "center",
        display: "flex"
      }}>
      <Typography
        variant="h1"
        sx={theme => ({
          alignItems: "center",
          color: !current ?
            theme.palette.text.secondary : theme.palette.text.primary,
          display: "flex",
          gap: 4
        })}>
        <Icon fill={current}>{value}</Icon>
        {key}
      </Typography>
    </Box>
  )
}