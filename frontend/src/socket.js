import { io } from "socket.io-client";

const socket = io("https://resticy-production.up.railway.app");

export default socket;
