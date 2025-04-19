import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/lib/api-client";
import { useAppStore } from "@/store/store";
import {
  GET_ALL_NEW_MEMBER_ROUTE,
  HOST,
  REMOVE_CHANNEL_MEMBER_ROUTE,
} from "@/utils/constants";
import { useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
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
import { MdDelete } from "react-icons/md";
import NewMembers from "./NewMembers";
import { getColor } from "@/lib/utils";

const Members = ({ members }) => {
  const { toast } = useToast();

  const [isHovered, setIsHovered] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const {
    userInfo,
    selectedChatData,
    openAddMemberModal,
    setOpenAddMemberModal,
  } = useAppStore();
  const isAdmin = userInfo.id === selectedChatData.admin;
  const [newMember, setNewMember] = useState([]);

  const searchNewMember = async () => {
    const response = await apiClient.post(
      GET_ALL_NEW_MEMBER_ROUTE,
      {
        channelId: selectedChatData._id,
      },
      {
        withCredentials: true,
      }
    );

    setNewMember(response.data);
    setOpenAddMemberModal(true);
  };

  const handleRemove = (id) => {
    const response = apiClient.delete(REMOVE_CHANNEL_MEMBER_ROUTE, {
      data: {
        channelId: selectedChatData._id,
        memberId: id,
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      toast({
        variant: "destructive",
        description: "Removed Successfully",
      });
    }
  };

  return (
    <>
      <div className="text-lg py-3">Members</div>
      <ScrollArea className="scroll-bar max-h-[450px] w-[500px] bg-black/50 rounded-lg text-white overflow-auto">
        <button
          className={`mt-5 mx-5 p-5 w-[450px] rounded-lg bg-emerald-700 flex items-center gap-x-5 ${
            !isAdmin ? "cursor-not-allowed" : "cursor-pointer "
          }`}
          disabled={!isAdmin}
          onClick={searchNewMember}
        >
          <IoPersonAddOutline className="text-xl" />
          Add Members
        </button>
        <div className="p-5">
          {members.map((member, index) => (
            <div
              key={index}
              className="py-2"
              onMouseEnter={() => {
                setIsHovered(true);
                setHoverIndex(index);
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="bg-gray-800 flex items-center justify-between gap-x-3 py-2 px-2 rounded-xl">
                <div className="flex items-center gap-x-5">
                  <div className=" w-12 h-12 relative">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                      {member.image ? (
                        <AvatarImage
                          src={`${HOST}/${member.image}`}
                          alt="profile"
                          className="object-cover w-full h-full bg-black"
                        />
                      ) : (
                        <div
                          className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                            member.color
                          )}`}
                        >
                          {member.firstName
                            ? member.firstName.split("").shift()
                            : member.email.split("").shift()}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div>
                    {" "}
                    {`${
                      member.firstName
                        ? member.firstName + " " + member.lastName
                        : member.email
                    } `}{" "}
                  </div>
                </div>
                <div className="absolute right-10">
                  {index === 0 && (
                    <Badge
                      variant="outline"
                      className={"text-green-400 border-2 p-2"}
                    >
                      Group Admin
                    </Badge>
                  )}
                </div>
                <div className="px-2">
                  {isHovered &&
                    hoverIndex === index &&
                    index !== 0 &&
                    isAdmin && (
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <div className="p-3 hover:bg-slate-700 rounded-full ">
                            <MdDelete className="text-2xl" />
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#121213] border-none">
                          <AlertDialogHeader>
                            <AlertDialogTitle> </AlertDialogTitle>
                            <AlertDialogDescription className="text-xl text-white">
                              {`Do you want remove ${
                                member.firstName
                                  ? member.firstName
                                  : member.email
                              } from this group?`}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemove(member._id)}
                              className="bg-red-700 hover:bg-red-600"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      {openAddMemberModal && <NewMembers newMembers={newMember} />}
    </>
  );
};

export default Members;
