import { useNotification } from "../hooks/useNotification";

const Notification = () => {
  const {notification} = useNotification();
  console.log('notification state:', notification)
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const variant = {
    error: {
      ...style,
      color: "red",
    },
    success: {
      ...style,
      color: "green",
    },
  };

  if (!notification) return null;
  const { message, type } = notification;

  return <div style={variant[type]}>{message}</div>;
};

export default Notification;
