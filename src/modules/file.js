import { stdout } from "process";
import { pipeline } from "stream";
import { createReadStream, createWriteStream, appendFile, rename, unlink, stat } from "fs";

import { formattedPath } from "../helpers/formatted-path.js";

export const file = {
  cat: (source) => {
    const currectPath = formattedPath(source);
    const readStream = createReadStream(currectPath);

    pipeline(readStream, stdout, (err) => {
      if (err) console.log("Operation failed");
    });
  },

  add: (fileName) => {
    appendFile(fileName, "", function (err) {
      if (err) console.log("Operation failed");
    });
  },

  rn: (source, fileName) => {
    const currectPath = formattedPath(source);

    rename(currectPath, fileName, (err) => {
      if (err) console.log("Operation failed");
    });
  },

  cp: (source, dist) => {
    const isValidArgs = source && dist;

    if (!isValidArgs) {
      console.log("Operation failed");

      return;
    }

    const currectSource = formattedPath(source);
    const currectDist = formattedPath(dist);

    const readStream = createReadStream(currectSource);
    const writeStream = createWriteStream(currectDist);

    pipeline(readStream, writeStream, (err) => {
      if (err) console.log("Operation failed");
    });
  },

  mv: (source, dist) => {
    const isValidArgs = source && dist;

    if (!isValidArgs) {
      throw new Error();
    }

    const currectSource = formattedPath(source);

    stat(currectSource, (err, stats) => {
      if (err || !stats.isFile()) {
        console.log("Operation failed");
        return;
      }
    });

    const currectDist = formattedPath(dist);

    const readStream = createReadStream(currectSource);
    const writeStream = createWriteStream(currectDist);

    pipeline(readStream, writeStream, (err) => {
      if (err) {
        console.log("Operation failed");

        return;
      }
      unlink(currectSource, (err) => {
        if (err) {
          console.log("Operation failed");

          return;
        }
      });
    });
  },
  rm: (source) => {
    const currectSource = formattedPath(source);
    unlink(currectSource, (err) => {
      if (err) console.log("Operation failed");
    });
  },
};
