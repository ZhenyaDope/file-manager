import { EOL } from "os";
import { stdin, argv, cwd } from "process";
import { parseArgs } from "./helpers/parse-args.js";
import { showCommands } from "./helpers/commands.js";
import { commands } from "./modules/commands.js";
import { run } from "./helpers/run.js";

export const app = () => {
  console.log();
  const username = argv.splice(2)[0].split("=")[1];

  console.log(`Welcome to the File Manager, ${username}!${EOL}`);

  let isFirst = true;

  console.log(showCommands());
  console.log(`You are currently in ${cwd()}${EOL}`);
  console.log(`Please enter command: ${EOL}${EOL}`);

  process.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  });

  stdin.on("data", (data) => {
    if (!isFirst) {
      console.log(showCommands());
      console.log(`You are currently in ${cwd()}${EOL}`);
      console.log(`Please enter command: ${EOL}${EOL}`);
    }
    isFirst = false;

    if (data.toString().trim() === ".exit") {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit();
    }

    const [command, params] = parseArgs(data);

    const commandFn = commands[command];

    run(commandFn, params);
  });
};
