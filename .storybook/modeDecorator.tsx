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
    <div className="bg-[var(--neutral-background)] flex flex-col">
      {/* toolbar */}
      <div className="sticky top-0 z-50 flex items-center justify-end px-4 py-2 bg-[var(--neutral-object)] border-b border-[var(--border-neutral-quiet)]">
        <Button onClick={toggleDarkMode} variant="quiet" size="xs">
          {isDarkMode ? "☀ Light mode" : "☾ Dark mode"}
        </Button>
      </div>

      {/* story canvas */}
      <div className="flex items-center justify-center p-6 min-h-[33vh]">
        <div className="w-full max-w-[var(--container-md)] bg-[var(--neutral-foreground)] rounded-xl p-8">
          <Story />
        </div>
      </div>
    </div>
  )
}

export default ModeDecorator
