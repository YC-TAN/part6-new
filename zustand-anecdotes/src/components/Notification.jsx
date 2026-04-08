import { useNotification } from "../stores/useNotification";

const Notification = () => {
  const notification = useNotification();

  if (!notification) return null;

  const {message, type} = notification;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    background: 'lightgrey',
  };

  const success = {
    ...style,
    color: "green",
  };

  const error = {
    ...style,
    color: "red",
  };

  
  return <div style={type === "success" ? success : error}>{message}</div>;
};

export default Notification;
