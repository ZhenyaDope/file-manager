import { isAbsolute, resolve } from "path";
import { cwd } from "process";

export const formattedPath = (path_to_file) => {
  return isAbsolute(path_to_file) ? path_to_file : resolve(cwd(), path_to_file);
};
