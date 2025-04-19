export const LOCAL_HOST = "http://localhost:5000";
export const HOST = "https://chatify-backend-73lu.onrender.com";

// import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/userInfo`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/updateProfile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/addProfileImage`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/removeProfileImage`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const CONTACT_ROUTE = "api/contact";
export const SEARCH_CONTACT_ROUTE = `${CONTACT_ROUTE}/search`;
export const GET_CONTACTS_FOR_DM = `${CONTACT_ROUTE}/getContacts`;
export const GET_ALL_CONTACTS_ROUTE = `${CONTACT_ROUTE}/getAllContacts`;

export const MESSAGE_ROUTE = "api/message";
export const GET_MESSAGES = `${MESSAGE_ROUTE}/getMessage`;
export const UPLOAD_FILE_ROUTE = `${MESSAGE_ROUTE}/uploadFile`;

export const CHANNEL_ROUTES = "api/channel";
export const CREATE_CHANNEL_ROUTE = `${CHANNEL_ROUTES}/createChannel`;
export const GET_USER_CHANNEL_ROUTE = `${CHANNEL_ROUTES}/getUserChannels`;
export const GET_CHANNEL_MESSAGES_ROUTE = `${CHANNEL_ROUTES}/getChannelMessages`;
export const ADD_CHANNEL_PROFILE_IMAGE_ROUTE = `${CHANNEL_ROUTES}/addProfileImage`;
export const REMOVE_CHANNEL_PROFILE_IMAGE_ROUTE = `${CHANNEL_ROUTES}/removeProfileImage`;
export const GET_ALL_MEMBERS_ROUTE = `${CHANNEL_ROUTES}/getAllMembers`;
export const GET_ALL_NEW_MEMBER_ROUTE = `${CHANNEL_ROUTES}/getNewMembers`;
export const ADD_NEW_MEMBER_ROUTE = `${CHANNEL_ROUTES}/addNewMembers`;
export const REMOVE_CHANNEL_MEMBER_ROUTE = `${CHANNEL_ROUTES}/removeMember`;
export const EXIT_CHANNEL_ROUTE = `${CHANNEL_ROUTES}/leaveGroup`;
export const RENAME_GROUP_ROUTE = `${CHANNEL_ROUTES}/renameGroup`;
