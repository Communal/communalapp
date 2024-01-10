import { Stack } from "craftbook"
import { HeroSection } from "."
import { Navbar } from "./navbar"

const LandingPage: React.FunctionComponent = () => {
  return (
    <Stack>
      <Navbar />
      <HeroSection />
    </Stack>
  )
}

export {
  LandingPage
}