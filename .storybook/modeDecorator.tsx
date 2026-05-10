import { useState } from "react"
import { Button } from "@/ds/components/ui/button"

const ModeDecorator = (Story: any) => {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  )

  const toggleDarkMode = () => {
    const next = !isDarkMode
    setIsDarkMode(next)
    document.documentElement.classList.toggle("dark", next)
  }

  return (
    <div className="relative flex flex-col gap-4 items-end">
      <Button
        onClick={toggleDarkMode}
        variant="quiet"
        size="xs"
        style={{
          position: "sticky",
          top: "4px",
          right: "4px",
          zIndex: 1000,
        }}
      >
        Toggle Dark Mode: {isDarkMode ? "On" : "Off"}
      </Button>
      <div className="w-full bg-[var(--neutral-foreground)] min-h-[400px] p-4">
        <Story />
      </div>
    </div>
  )
}

export default ModeDecorator
