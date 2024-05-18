import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import { Icon } from "@/components"
import Key from "@/components/keyboard/Key"
import keyboardControl from "@/utils/keyboardControl"
import { useKeyboardContext } from "@/providers/KeyboardProvider"
import Layout from "@/components/Layout"
import TextField from "@mui/material/TextField"
import WS from "@/const/WS"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function () {
  const { currentKey, setCurrentKey } = useKeyboardContext()
  const navigate = useNavigate()

  useEffect(currentKey.toString() !== "1,0" ?
    keyboardControl.bind(null, currentKey, setCurrentKey) :
    () => void 0)

  return (
    <Layout>
      <Box sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: "1",
        justifyContent: "center",
        mb: 8
      }}>
        <Key position={[-1, 0]} keyData={{
          type: "cmd",
          value: "home",
          label: "home",
          action: () => navigate("/")
        }} />
        <Key position={[0, 0]} keyData={{
          type: "neutral"
        }} />
        <div
          data-x="1"
          data-y="0">
          <SpeedSetting />
        </div>
      </Box>
    </Layout>
  )
}

let timerConterTimeout: NodeJS.Timeout

function SpeedSetting() {
  const { currentKey, keySpeed, setCurrentKey, setKeySpeed } = useKeyboardContext()
  const [timerValue, setTimerValue] = useState(0)
  const focused = currentKey.toString() === "1,0"

  useEffect(() => {
    WS.onmessage = ({ data }) => {
      const i = keySpeed
      switch (data) {
        default: break
        case "w":
          setKeySpeed(() => i + 250)
          break
        case "a":
          setCurrentKey([0, 0])
          break
        case "s":
          setKeySpeed(() => i - 250)
          break
        case "d":
          setCurrentKey([-1, 0])
          break
      }
    }
    timerConterTimeout = setInterval(
      () => {
        if (timerValue === 100) {
          setTimerValue(0)
        }
        setTimerValue(timerValue + 1)
      }, keySpeed / 100
    )
    return () => {
      clearInterval(timerConterTimeout)
      WS.onmessage = null
    }
  }, [currentKey])

  return (
    <Box sx={{
      alignItems: "center",
      display: "flex",
      fontSize: "1.5em",
      gap: "1em"
    }}>
      <Box sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        ml: "1em"
      }}>
        <Box sx={{
          alignItems: "center",
          display: "flex",
        }}>
          <Box sx={{fontWeight: 600}}>
            Velocidade do teclado
          </Box>
          <Box sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            ml: "1em"
          }}>
            {focused && <Icon>keyboard_arrow_up</Icon>}
            <TextField
              focused={focused}
              id={btoa("input-segundosd")}
              label={"Segundos"}
              type="number"
              value={(keySpeed / 1e3)}
              variant="standard"
              sx={{ width: "6.5em" }} />
            {focused && <Icon>keyboard_arrow_down</Icon>}
          </Box>
          {focused && <CircularProgress
            color="primary"
            size={"1.6em"}
            value={timerValue}
            variant="determinate"
          />}
        </Box>
      </Box>
    </Box>
  )
}