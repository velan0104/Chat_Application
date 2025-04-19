import { useAppStore } from "@/store/store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/constants";
import { RiCloseFill } from "react-icons/ri";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType, setIsChatDetails } =
    useAppStore();

  const editGroupDetails = () => {
    setIsChatDetails(true);
  };

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center ">
          <div className=" w-12 h-12 relative ml-5">
            {selectedChatType === "contact" ? (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {selectedChatData.image ? (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                      selectedChatData.color
                    )}`}
                  >
                    {selectedChatData.firstName
                      ? selectedChatData.firstName.split("").shift()
                      : selectedChatData.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="bg-[#ffffff22] h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full">
                <Avatar>
                  {selectedChatData.image.includes(".svg") ? (
                    <AvatarImage src={selectedChatData.image} />
                  ) : (
                    <AvatarImage src={`${HOST}/${selectedChatData.image}`} />
                  )}
                </Avatar>
              </div>
            )}
          </div>
          <div>
            {selectedChatType === "channel" && selectedChatData.name}
            {selectedChatType === "contact" && selectedChatData.firstName
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : selectedChatData.email}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 absolute right-5">
          {selectedChatType == "channel" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <PiDotsThreeOutlineVerticalFill
                    className=" text-neutral-400 font-light text-opacity-90 text-start cursor-pointer hover:text-neutral-100 transition-all duration-300"
                    onClick={editGroupDetails}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p> Edit </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <button
            className=" hover:bg-slate-600 p-2 rounded-full focus:border-none focus:outline-none foucs:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
