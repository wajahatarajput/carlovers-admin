import { useEffect, useState, KeyboardEvent } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
} from "firebase/database";
import { useRouter } from "next/router";
import { auth, db } from "@/lib"; // Adjust the import path as necessary
import { collection, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

interface ChatProps {
  driverChat: boolean;
  driverId: string;
  driverName: string;
}

interface ChatMessage {
  sender_id: string;
  message: string;
  receiver_id: string;
  timestamp: string;
}

const Chat = () => {
  const router = useRouter();
  const { driverChat, driverId, driverName } = router.query as ChatProps | any;
  const [dName, setDName] = useState<string>(driverName);
  const Current_User_ID = auth?.currentUser?.uid as string;

  const [name, setName] = useState<string | null>(null);
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [tempchats, setTempChats] = useState<ChatMessage[]>([]);
  const [msg, setMsg] = useState<string>("");

  const db2 = getDatabase();
  const chatListRef = ref(
    db2,
    `chats/${driverChat ? driverId : Current_User_ID}/${driverChat ? Current_User_ID : driverId}`
  );

  const getChatData = async () => {
    onChildAdded(chatListRef, (data) => {
      const variable: ChatMessage = data.val();
      setTempChats((prevChats) => [...prevChats, variable]);
      setChats((prevChats) => [...prevChats, variable]);
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setName(localStorage.getItem("user"));
    }

    getChatData();
    getOwner();

    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        checkKeyPress();
      }
    };

    document.addEventListener("keydown", keyDownHandler as any);

    return () => {
      document.removeEventListener("keydown", keyDownHandler as any);
    };
  }, []);

  const checkKeyPress = () => {
    sendChat();
  };

  const Username = tempchats.map((o) => o.message);
  const filtered = tempchats.filter(
    ({ message }, index) => !Username.includes(message, index + 1)
  );

  const filteredByUsername = filtered.filter(
    (item) => item.sender_id === Current_User_ID || item.sender_id === driverId
  );

  const result = filteredByUsername.sort((a, b) =>
    Date.parse(a.timestamp) - Date.parse(b.timestamp)
  );

  const sendChat = () => {
    if (!msg) {
      toast.warning("Empty Message cannot be sent!");
      return;
    }

    const timestamp = new Date().toISOString();
    const chatRef = push(chatListRef);
    set(chatRef, {
      sender_id: Current_User_ID,
      message: msg,
      receiver_id: driverId,
      timestamp,
    });
    setMsg("");
  };

  const getOwner = async () => {
    const q = collection(db, "users");
    const docs = await getDocs(q);
    docs.docs.forEach((doc) => {
      if (doc.data().uid === driverId) {
        setDName(doc.data().fname);
      }
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light p-5">
      <div className="container-fluid border rounded shadow-lg p-4 bg-white">
        <div className="d-flex justify-content-start align-items-center mb-3 gap-2">
          <button
            onClick={() => router.back()}
            className="btn btn-outline-secondary rounded-circle border border-0"
          >
            <i className="fa fa-arrow-left"></i>
          </button>
          <h3 className="m-0 text-center">{driverChat ? "Owner" : "Driver"}: {dName || 'Wajahat'}</h3>
        </div>
        <hr />
        <div className="chat-container mb-4 border border-1" style={{ height: '400px', overflowY: 'auto', paddingRight: '10px' }}>
          {result.map((c, i) => (
            <div
              key={i}
              className={`mb-3 p-3 rounded ${c.sender_id === Current_User_ID ? "bg-primary text-white align-self-end" : "bg-secondary text-white"}`}
              style={{ maxWidth: '75%', alignSelf: c.sender_id === Current_User_ID ? 'flex-end' : 'flex-start' }}
            >
              <p className="mb-1">{c.message}</p>
              <small className="d-block text-end">{new Date(c.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
        <hr />
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            placeholder="Enter your message"
            required
          />
          <button
            className="btn btn-purple"
            onClick={sendChat}
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Chat;
