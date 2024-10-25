import { auth } from "@lib/auth"; // TODO: move this path ?
import { toNextJsHandler } from "better-auth/next-js";
 
export const { POST, GET } = toNextJsHandler(auth);