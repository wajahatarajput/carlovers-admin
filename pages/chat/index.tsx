import { useEffect, useState, KeyboardEvent } from "react";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { useRouter } from "next/router";
import { auth, db } from "@/lib/firebase"; // Adjust the import path
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ChatMessage {
  sender_id: string;
  message: string;
  receiver_id: string;
  timestamp: string;
}

const Chat = () => {
  const router = useRouter();
  const { driverChat, driverId, driverName } = router.query;
  const [dName, setDName] = useState<string | string[] | undefined>(driverName);
  const Current_User_ID = auth?.currentUser?.uid as string;

  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [tempchats, setTempChats] = useState<ChatMessage[]>([]);
  const [msg, setMsg] = useState<string>("");

  const db2 = getDatabase();
  const chatListRef = ref(db2, `chats/${driverChat ? driverId : Current_User_ID}/${driverChat ? Current_User_ID : driverId}`);

  const getChatData = async () => {
    await onChildAdded(chatListRef, (data) => {
      const chatMessage = data.val() as ChatMessage;
      setTempChats((prevChats) => [...prevChats, chatMessage]);
      setChats((prevChats) => [...prevChats, chatMessage]);
    });
  };

  useEffect(() => {
    getChatData();
    getOwner();
    document.addEventListener('keydown', keyDownHandler as any);
    return () => {
      document.removeEventListener('keydown', keyDownHandler as any);
    };
  }, []);

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendChat();
    }
  };

  const filteredByUsername = tempchats.filter(
    (item) => item.sender_id === Current_User_ID || item.sender_id === driverId
  ).sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));

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
      timestamp: timestamp,
    });
    setMsg("");
  };

  const getOwner = async () => {
    const q = query(collection(db, "users"), where("uid", "==", driverId));
    const docs = await getDocs(q);
    docs.docs.forEach((doc) => {
      setDName(doc.data().fname);
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container border rounded shadow-lg p-4">
        <button
          onClick={() => router.back()}
          className="btn btn-outline-secondary mb-3 rounded"
        >
          <i className="fa fa-arrow-left"> Back</i>
        </button>
        <h3 className="text-center mb-3">
          {driverChat ? "Owner" : "Driver"}: {dName}
        </h3>
        <div className="mb-3 p-3 bg-light" style={{ height: "300px", overflowY: "scroll" }}>
          {filteredByUsername.map((c, i) => (
            <div key={i} className={`d-flex ${c.sender_id === Current_User_ID ? "justify-content-end" : "justify-content-start"}`}>
              <div className="p-2 mb-2 bg-secondary text-white rounded">
                <p className="mb-0">{c.message}</p>
                <small className="text-light">{c.timestamp}</small>
              </div>
            </div>
          ))}
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            placeholder="Enter your message"
            required
          />
          <button className="btn btn-outline-info" onClick={sendChat}>
            <i className="fa fa-paper-plane"></i> Send
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Chat;
