export const notisSelector = (state) => state.notis;
export const unreadNotisSelector = (state) => state.notis.filter((noti) => noti.is_read === false);
