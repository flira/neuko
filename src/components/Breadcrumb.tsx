import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Icon from "./Icon";
import React, { useId } from "react";

/** Nome da localização */
type LayoutPropsKey = string
/** Código do ícone do material design */
type LayoutPropsValue = string

export interface LayoutProps {
  /** Serve para criar o breadcrumb */
  location?: { [k: LayoutPropsKey]: LayoutPropsValue };
}

export default function ({ location }: LayoutProps) {
  const id = useId();
  const Path: ({ id }: React.HTMLProps<Element>) => JSX.Element[] | undefined = id => location ? Object.entries(location)
    .map(locationMap.bind(null, id)) : undefined;

  return (
    <Box component="header" sx={theme => ({
      borderBottom: `solid 1px ${theme.palette.grey[400]}`,
      pb: 8
    })}>
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
  arr: string[]) {
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

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />