// api url (where your server is hosted at)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const WEBSOCKET_URL =
  import.meta.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001";

export { BACKEND_URL, WEBSOCKET_URL };
