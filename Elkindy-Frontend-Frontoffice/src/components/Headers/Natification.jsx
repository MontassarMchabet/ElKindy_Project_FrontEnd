import "./natification.css";
import { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Socket, io } from "socket.io-client";


const Natification = () => {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("http://localhost:8089"));
    }, []);

    useEffect(() => {
        socket.on("getNotification", (data) => {
            setNotifications((prev) => [...prev, data]);
        });
    }, [socket]);

    const displayNotification = ({ senderName }) => {
        return (
            <span className="notification">{`${senderName} changed you order status.`}</span>
        );
    };

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
    };

    return (
        <div>
            <div className="icons">
                <div className="icon" onClick={() => setOpen(!open)}>
                <IoNotificationsOutline />
                    {
                        notifications.length > 0 &&
                        <div className="counter">{notifications.length}</div>
                    }
                </div>
            </div>
            {open && (
                <div className="notifications">
                    {notifications.map((n) => displayNotification(n))}
                    <button className="nButton" onClick={handleRead}>
                        Mark as read
                    </button>
                </div>
            )}
        </div>
    );
};

export default Natification;