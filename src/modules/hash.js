import { formattedPath } from "../helpers/formatted-path.js";

import { createReadStream } from "fs";
import { createHash } from "crypto";

export const hash = {
  hash: async (source) => {
    const currectPath = formattedPath(source);
    const readStream = createReadStream(currectPath);
    const hashMD5 = createHash("md5").setEncoding("hex");

    // без await hash выводится позже чем нужно(
    await new Promise((res, rej) => {
      readStream.on("error", (err) => rej(err));
      readStream.on("data", (chunk) => hashMD5.update(chunk));
      readStream.on("end", () => res(hashMD5.digest("hex")));
    }).then(console.log);
  },
};
