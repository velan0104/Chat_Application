import AvatarComponent from "@/components/Profile/AvatarComponent";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import apiClient from "@/lib/api-client";
import { useAppStore } from "@/store/store";
import {
  EXIT_CHANNEL_ROUTE,
  GET_ALL_MEMBERS_ROUTE,
  RENAME_GROUP_ROUTE,
} from "@/utils/constants";
import EmojiPicker from "emoji-picker-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong, FaPen } from "react-icons/fa6";
import {
  MdExitToApp,
  MdOutlineDone,
  MdOutlineEmojiEmotions,
} from "react-icons/md";
import { RiCloseFill } from "react-icons/ri";
import "@/utils/utils.css";
import Members from "./Member";
import { useToast } from "@/components/ui/use-toast";

const ChatDetails = () => {
  const {
    setIsChatDetails,
    selectedChatData,
    userInfo,
    setAllChannelMembers,
    allChannelMembers,
  } = useAppStore();
  const emojiRef = useRef();
  const isAdmin = userInfo.id === selectedChatData.admin;
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(selectedChatData.name);
  const [saveChanges, setSaveChanges] = useState();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState();
  const { toast } = useToast();

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(
        `${GET_ALL_MEMBERS_ROUTE}/${selectedChatData._id}`,
        {
          withCredentials: true,
        }
      );

      if (response) {
        setAllChannelMembers(response.data);
      } else console.error("error");
    };

    getData();
  }, [selectedChatData._id, setAllChannelMembers]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const Button = ({ content, disabled = false, event, className = "" }) => {
    return (
      <button
        className={`cursor-pointer p-3 hover:bg-slate-600 rounded-full ${
          disabled && "text-gray-700"
        } ${className}`}
        onClick={event}
        disabled={disabled}
      >
        {content}
      </button>
    );
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
    setSaveChanges(true);
  };

  const handleChanges = () => {
    const response = apiClient.put(
      RENAME_GROUP_ROUTE,
      {
        channelId: selectedChatData._id,
        updatedName: name,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      toast({
        description: "Updated Successfully!!",
      });
    } else {
      toast({
        variant: "destructive",
        description: "Issue in saving changes",
      });
    }

    setSaveChanges(false);
    setIsEditable(!isEditable);
  };

  const handleEmoji = () => {
    setEmojiPickerOpen(true);
  };

  const handleAddEmoji = (emoji) => {
    setName((name) => name + emoji.emoji);
  };

  const handleExit = () => {
    const response = apiClient.delete(EXIT_CHANNEL_ROUTE, {
      data: {
        channelId: selectedChatData._id,
      },
      withCredentials: true,
    });

    if (response) {
      toast({
        description: "Exited Successfully!!",
      });
    }
  };

  return (
    <div className="scroll-bar overflow-y-auto">
      <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-5">
        <button
          className="hover:bg-slate-600 p-2 rounded-full focus:border-none focus:outline-none foucs:text-white duration-300 transition-all"
          onClick={() => setIsChatDetails(false)}
        >
          <FaArrowLeftLong className="text-2xl" />
        </button>
        <button
          className=" hover:bg-slate-600 p-2 rounded-full focus:border-none focus:outline-none foucs:text-white duration-300 transition-all"
          onClick={() => setIsChatDetails(false)}
        >
          <RiCloseFill className="text-3xl" />
        </button>
      </div>

      <div className="flex items-center flex-col ">
        <div className="flex justify-center items-center p-5">
          <AvatarComponent isAdmin={isAdmin} />
        </div>
        <div className="text-sm text-slate-400">
          Created {moment(selectedChatData.createdAt).fromNow()}
        </div>

        <div className="flex justify-center items-center">
          <input
            type="text"
            disabled={!isAdmin || !isEditable}
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-inherit rounded-md p-3 text-center text-3xl focus:none outline-none"
          />
          {!saveChanges && (
            <Button
              content={<FaPen />}
              disabled={!isAdmin}
              event={handleEdit}
            />
          )}
          {saveChanges && (
            <>
              <Button
                content={<MdOutlineEmojiEmotions />}
                event={handleEmoji}
                className="text-2xl"
              />
              <Button
                content={<MdOutlineDone />}
                event={handleChanges}
                className="text-2xl"
              />
            </>
          )}
        </div>
        <div className="absolute bottom-1 right-10" ref={emojiRef}>
          <EmojiPicker
            theme="dark"
            open={emojiPickerOpen}
            onEmojiClick={handleAddEmoji}
            autoFocusSearch={false}
          />
        </div>

        <div className="text-lg">
          Group . {selectedChatData.members.length + 1} members
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-7">
        <Members members={allChannelMembers} />
      </div>

      <div className="flex justify-center">
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="w-[500px] bg-red-500 p-3 rounded-lg flex items-center justify-center m-5 gap-x-1 hover:bg-red-700">
              <MdExitToApp className="text-xl" />
              Exit Group
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#121213] border-none">
            <AlertDialogHeader>
              <AlertDialogTitle></AlertDialogTitle>
              <AlertDialogDescription className="text-xl text-white">
                {` Do you want to Exit "${selectedChatData.name}" group?`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleExit}
                className="bg-red-700 hover:bg-red-600"
              >
                Exit
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ChatDetails;
