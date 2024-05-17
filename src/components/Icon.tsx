import React, { LegacyRef } from "react"
import { styled, useThemeProps } from "@mui/material/styles"

interface IconProps {
  /** Código do ícone do material design */
  children: string
  /** ver Font variation settings */
  fill?: boolean
  /** ver Font variation settings */
  grade?: number
  /** ver Font variation settings */
  opticalSize?: number
  /** Variação da fonte do ícone */
  variant?: "outlined" | "rounded" | "sharp"
  /** Size in "em" */
  size?: number
  /** ver Font variation settings */
  weight?: number
}

const IconRoot = styled("span", {
  name: "MuiIcon",
  slot: "root"
})<{ ownerState: IconProps }>(props => {
  const { fill, grade, opticalSize, size, variant, weight } = props.ownerState
  return {
    direction: "ltr",
    display: "inline-block",
    fontSize: `${size}em`,
    fontStyle: "normal",
    fontVariationSettings: `
  "FILL" ${fill ? 1 : 0},
  "GRAD" ${grade},
  "opsz" ${opticalSize},
  "wght" ${weight}`,
    fontWeight: "normal",
    letterSpacing: "normal",
    lineHeight: 1,
    textTransform: "none",
    userSelect: "none",
    whiteSpace: "nowrap",
    wordWrap: "normal",
    MozFontFeatureSettings: "liga",
    MozOsxFontSmoothing: "grayscale",
    ...(variant === 'outlined' && {
      fontFamily: "Material Symbols Outlined"
    }),
    ...(variant === 'rounded' && {
      fontFamily: "Material Symbols Rounded"
    }),
    ...(variant === 'sharp' && {
      fontFamily: "Material Symbols Sharp"
    })
  }
})

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(function Icon(
  props: IconProps,
  ref: LegacyRef<HTMLSpanElement>) {
  const _props = useThemeProps({ props: props, name: "MuiIcon" })
  const {
    children,
    fill = false,
    grade = 0,
    opticalSize = 24,
    size = 1.2,
    variant = "rounded",
    weight = 400,
    ...other } = _props
  const ownerState = {
    ..._props,
    fill,
    grade,
    opticalSize,
    size,
    variant,
    weight
  }
  return (
    <IconRoot
      ref={ref}
      ownerState={ownerState}
      role="img"
      lang="en"
      aria-label={`${children} icon`}
      {...other} >
      {children}
    </IconRoot>
  )
})

export default Icon
export { Icon }