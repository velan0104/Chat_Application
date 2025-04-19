import { useAppStore } from "@/store/store";
import {
  ADD_CHANNEL_PROFILE_IMAGE_ROUTE,
  HOST,
  REMOVE_CHANNEL_PROFILE_IMAGE_ROUTE,
} from "@/utils/constants";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import apiClient from "@/lib/api-client";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useState, useRef } from "react";

const AvatarComponent = ({ isAdmin }) => {
  const { selectedChatData } = useAppStore();
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("group-profile-image", file);
      formData.append("channelId", selectedChatData._id);
      const response = await apiClient.post(
        ADD_CHANNEL_PROFILE_IMAGE_ROUTE,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200 && response.data.image) {
        toast.success("Image updated Successfully");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(
        REMOVE_CHANNEL_PROFILE_IMAGE_ROUTE,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Image removed successfully.");
        setImage(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className=" h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
        {image ? (
          <AvatarImage
            src={`${HOST}/${image}`}
            alt="profile"
            className="object-cover w-full h-full bg-black"
          />
        ) : (
          <div
            className={` h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full `}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {selectedChatData.image.includes(".svg") ? (
                <AvatarImage
                  src={selectedChatData.image}
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  className="w-full h-full bg-black"
                />
              )}
            </Avatar>
          </div>
        )}
      </Avatar>
      {hovered && isAdmin && (
        <div
          className=" absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full"
          onClick={image ? handleDeleteImage : handleFileInputClick}
        >
          {image ? (
            <FaTrash className="text-white text-3xl cursor-pointer " />
          ) : (
            <FaPlus className="text-white text-3xl cursor-pointer " />
          )}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
        name="group-profile-image"
        accept=".png, .jpg, .jpeg, .svg, .webp"
      />
    </div>
  );
};

export default AvatarComponent;
