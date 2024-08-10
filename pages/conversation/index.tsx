import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "@/lib"; // Adjust the import path as necessary
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

interface Conversation {
  userId: string;
  userName: string;
  userProfilePic: string;
  lastMessage: string;
  lastMessageTimestamp: string;
}

const ConversationsList = () => {
  const router = useRouter();
  const Current_User_ID = auth?.currentUser?.uid as string;
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const getConversations = async () => {
    if (!Current_User_ID) {
      toast.error("User not authenticated!");
      return;
    }

    const q = query(collection(db, "conversations"), where("participants", "array-contains", Current_User_ID));
    const querySnapshot = await getDocs(q);
    const conversationsData: Conversation[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const otherUserId = data.participants.find((id: string) => id !== Current_User_ID);
      const lastMessage = data.lastMessage || "";
      const lastMessageTimestamp = data.lastMessageTimestamp || "";

      conversationsData.push({
        userId: otherUserId,
        userName: data.userName,
        userProfilePic: data.userProfilePic,
        lastMessage,
        lastMessageTimestamp,
      });
    });

    setConversations(conversationsData);
  };

  useEffect(() => {
    getConversations();
  }, []);

  const redirectToChat = (userId: string, userName: string) => {
    router.push({
      pathname: "/chat",
      query: {
        driverChat: false,
        driverId: userId,
        driverName: userName,
      },
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Conversations</h2>
      <div className="list-group">
        {conversations.map((conversation, index) => (
          <div
            key={index}
            className="list-group-item list-group-item-action d-flex align-items-center"
            onClick={() => redirectToChat(conversation.userId, conversation.userName)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={conversation.userProfilePic || "/default-profile.png"}
              alt={`${conversation.userName}'s profile picture`}
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <div className="d-flex justify-content-between w-100">
              <div>
                <h5 className="mb-1">{conversation.userName}</h5>
                <p className="mb-0 text-muted">{conversation.lastMessage}</p>
              </div>
              <small className="text-muted">{new Date(conversation.lastMessageTimestamp).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ConversationsList;
