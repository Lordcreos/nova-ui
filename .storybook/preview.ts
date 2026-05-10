import type { Preview } from "@storybook/react"
import "../src/index.css"
import ModeDecorator from "./modeDecorator"

const preview: Preview = {
  decorators: [ModeDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    viewport: {
      viewports: {
        mobile:  { name: "Mobile  (≥320px)",  styles: { width: "375px",  height: "812px" } },
        tablet:  { name: "Tablet  (≥769px)",  styles: { width: "900px",  height: "768px" } },
        laptop:  { name: "Laptop  (≥992px)",  styles: { width: "1200px", height: "768px" } },
        desktop: { name: "Desktop (≥1440px)", styles: { width: "1440px", height: "900px" } },
      },
      defaultViewport: "laptop",
    },
  },
}

export default preview
