
import { createContext, useContext, useState } from "react"
import ConfirmDialog from "../components/ConfirmPopup"

const ConfirmDialogContext = createContext()

export function ConfirmDialogProvider({ children }) {
  const [dialog, setDialog] = useState({
    isOpen: false,
    message: "",
    onConfirm: () => {},
  })

  const showConfirmDialog = (message, onConfirm) => {
    setDialog({
      isOpen: true,
      message,
      onConfirm,
    })
  }

  const hideConfirmDialog = () => {
    setDialog({
      isOpen: false,
      message: "",
      onConfirm: () => {},
    })
  }

  const handleConfirm = () => {
    dialog.onConfirm()
    hideConfirmDialog()
  }

  return (
    <ConfirmDialogContext.Provider value={{ showConfirmDialog }}>
      {children}
      {dialog.isOpen && (
        <ConfirmDialog message={dialog.message} onConfirm={handleConfirm} onCancel={hideConfirmDialog} />
      )}
    </ConfirmDialogContext.Provider>
  )
}

export function useConfirmDialog() {
  return useContext(ConfirmDialogContext)
}
