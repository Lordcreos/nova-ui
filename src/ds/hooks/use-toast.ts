import * as React from "react"

export interface ToastOptions {
  title?: string
  description?: string
  variant?: "default" | "success" | "danger" | "warning" | "info"
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastState extends ToastOptions {
  id: string
  open: boolean
}

type Action =
  | { type: "ADD_TOAST"; toast: ToastState }
  | { type: "UPDATE_TOAST"; id: string; toast: Partial<ToastState> }
  | { type: "DISMISS_TOAST"; id: string }
  | { type: "REMOVE_TOAST"; id: string }

interface State {
  toasts: ToastState[]
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 300

function toastReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, ...action.toast } : t
        ),
      }
    case "DISMISS_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, open: false } : t
        ),
      }
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      }
  }
}

let count = 0
function generateId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type Listeners = Array<(state: State) => void>
const listeners: Listeners = []
let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = toastReducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

function toast(options: ToastOptions) {
  const id = generateId()
  const duration = options.duration ?? 4000

  const newToast: ToastState = {
    ...options,
    id,
    open: true,
    variant: options.variant ?? "default",
  }

  dispatch({ type: "ADD_TOAST", toast: newToast })

  if (duration > 0) {
    setTimeout(() => {
      dispatch({ type: "DISMISS_TOAST", id })
      setTimeout(() => dispatch({ type: "REMOVE_TOAST", id }), TOAST_REMOVE_DELAY)
    }, duration)
  }

  return { id, dismiss: () => dispatch({ type: "DISMISS_TOAST", id }) }
}

function dismiss(id: string) {
  dispatch({ type: "DISMISS_TOAST", id })
  setTimeout(() => dispatch({ type: "REMOVE_TOAST", id }), TOAST_REMOVE_DELAY)
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  return {
    toasts: state.toasts,
    toast,
    dismiss,
  }
}

export { useToast, toast, dismiss }
export type { ToastState }
