import { formattedPath } from "../helpers/formatted-path.js";

import { pipeline } from "stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream, stat } from "fs";

export const archive = {
  compress: (source, dist) => {
    const isValidArgs = source && dist;

    if (!isValidArgs) {
      console.log("Operation failed");
      return;
    }

    const currectSource = formattedPath(source);
    const currectDist = formattedPath(dist);

    stat(currectSource, (err, stats) => {
      if (err || !stats.isFile()) {
        console.log("Operation failed");
        return;
      }
    });

    const readStream = createReadStream(currectSource);
    const writeStream = createWriteStream(currectDist);

    pipeline(readStream, createBrotliCompress(), writeStream);
  },

  decompress: (source, dist) => {
    const isValidArgs = source && dist;

    if (!isValidArgs) {
      console.log("Operation failed");
      return;
    }

    const currectSource = formattedPath(source);
    const currectDist = formattedPath(dist);

    const readStream = createReadStream(currectSource);
    const writeStream = createWriteStream(currectDist);

    pipeline(readStream, createBrotliDecompress(), writeStream);
  },
};
