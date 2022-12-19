import { navigate } from "./navigate.js";
import { file } from "./file.js";
import { os } from "./os.js";
import { hash } from "./hash.js";
import { archive } from "./archive.js";

export const commands = { ...navigate, ...file, ...os, ...hash, ...archive };
