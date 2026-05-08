import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/priority"
    );

    console.log(res.data);

    setNotifications(res.data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notifications</h1>

      {notifications.map((n) => (
        <div
          key={n.ID}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{n.Type}</h3>
          <p>{n.Message}</p>
          <small>{n.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default App;