import { toast } from "react-toastify";

export const GAME_ERRORS = {
  alreadyUsed: "La palabra ya fue utilizada.",
  invalidChain: "La palabra no respeta la cadena de palabras.",
  notFound: "La palabra no existe."
};

export const notify = {
  success: (message) => toast.success(message),
  info: (message) => toast.info(message),
  error: (message) => toast.error(message),
  warning: (message) => toast.warning(message),
};