import { createContext } from "react";
import { AlertModel } from "../moodels";

export const AlertContext = createContext<AlertModel | undefined>(undefined);
