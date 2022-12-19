import { resolve } from "path";
import { cwd, chdir } from "process";
import { readdir, stat } from "fs";
import { stdout } from "process";
import { EOL } from "os";

export const navigate = {
  up: () => {
    const path = resolve(cwd(), "..");
    chdir(path);
  },
  cd: (path) => {
    const dist = resolve(cwd(), path);

    stat(dist, (err, stats) => {
      const isError = err || stats.isFile();

      if (isError) {
        stdout.write(`Operation failed${EOL}${EOL}`);

        return;
      }

      chdir(dist);
    });
  },
  ls: () => {
    readdir(cwd(), (_, data) => {
      console.table(data);
    });
  },
};
