import { createContext, useState } from "react";

const NotificationContext = createContext()

export default NotificationContext;

const DELAY = 5000;

export const NotificationContextProvider = ({children}) => {
    const [notification, setNotification] = useState(null)

    const showNotification = (message, type) => {
        setNotification({message, type})
        setTimeout(() => {
            setNotification(null)
        }, DELAY)
    }

    return (
        <NotificationContext.Provider value={{notification, showNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}