export const createChatSlice = (set, get) => ({

    selectedChatType: undefined,
    selectedChatData: undefined,
    selectChatMessages: [],
    directMessagesContacts: [],
    isUploading: false,
    isDownloading: false,
    isChatDetails: false,
    fileUploadProgress: 0,
    fileDownloadProgress: 0,
    channels: [],
    allChannelMembers: [],
    openAddMemberModal: false,

    setOpenAddMemberModal: (openAddMemberModal) => set({ openAddMemberModal }),
    setAllChannelMembers: (allChannelMembers) => set({ allChannelMembers }),
    setChannels: (channels) => set({ channels }),
    setIsUploading: (isUploading) => set({ isUploading }),
    setIsDownloading: (isDownloading) => set({ isDownloading }),
    setIsChatDetails: (isChatDetails) => set({ isChatDetails }),
    setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
    setFileDownloadProgress: (fileDownloadProgress) => set({ fileDownloadProgress }),
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSelectedChatMessage: (selectChatMessages) => set({ selectChatMessages }),
    setDirectMessagesContacts: (directMessagesContacts) => set({ directMessagesContacts }),

    addChannel: (channel) => {
        const channels = get().channels;
        set({ channels: [channel, ...channels] });
    },

    closeChat: () =>
        set({
            selectedChatData: undefined,
            selectedChatType: undefined,
            selectChatMessages: []
        }),

    addMessage: (message) => {
        const selectChatMessages = get().selectChatMessages;
        const selectedChatType = get().selectedChatType;

        set({
            selectChatMessages: [
                ...selectChatMessages, {
                    ...message,
                    recipent:
                        selectedChatType === 'channel'
                            ? message.recipent
                            : message.recipient._id,
                    sender:
                        selectedChatType === 'channel'
                            ? message.sender
                            : message.sender._id,
                },
            ]
        })
    },

    addChannelInChannelList: (message) => {
        const channels = get().channels;
        const data = channels.find(channel => channel._id === message.channelId);
        const index = channels.findIndex(
            (channel) => channel._id === message.channelId
        );

        if (index == -1 && index != undefined) {
            channels.splice(index, 1);
            channels.unshift(data);
        }

    },

    addContactsInDMContacts: (message) => {
        const userId = get().userInfo.id;
        const fromId =
            message.sender._id === userId
                ? message.recipent._id
                : message.sender._id;

        const fromData = message.sender._id === userId ? message.recipent : message.sender;

        const dmContacts = get().directMessagesContacts;
        const data = dmContacts.find((contact) => contact._id === fromId);
        const index = dmContacts.findIndex((contact) => contact._id === fromId);

        if (index !== -1 && index !== undefined) {
            dmContacts.splice(index, 1);
            dmContacts.unshift(data);
        } else {
            dmContacts.unshift(fromData);
        }
        set({ directMessagesContacts: dmContacts })
    }
})