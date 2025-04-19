import { useAppStore } from "@/store/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo, addMessage, addContactsInDMContacts } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server from Client side ");
      });

      const handleReceiveMessage = (message) => {
        const { selectedChatData, selectedChatType } = useAppStore.getState();
        if (selectedChatData._id !== userInfo.id) {
          if (
            selectedChatType !== undefined &&
            (selectedChatData._id === message.sender._id ||
              selectedChatData._id === message.recipient._id)
          ) {
            addMessage(message);
            addContactsInDMContacts(message);
          }
        }
      };

      const handleReceiveChannelMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addChannelInChannelList,
        } = useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          selectedChatData._id === message.channelId
        ) {
          addMessage(message);
          addChannelInChannelList(message);
        }
      };

      socket.current.on("receiveMessage", handleReceiveMessage);
      socket.current.on("receiveChannelMessage", handleReceiveChannelMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
