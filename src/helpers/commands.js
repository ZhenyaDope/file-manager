import { EOL } from "os";

const COMMANDS = [
  { command: "up", description: "Go upper from current directory" },
  { command: "cd path_to_directory", description: "Go to dedicated folder from current directory" },
  { command: "ls", description: "Print in console list of all files and folders in current directory" },
  { command: "cat path_to_file", description: "Read file and print it's content in console" },
  { command: "add new_file_name", description: "Create empty file in current working directory" },
  { command: "rn path_to_file new_filename", description: "Rename file" },
  { command: "cp path_to_file path_to_new_directory", description: "Copy file " },
  { command: "mv path_to_file path_to_new_directory", description: "Move file" },
  { command: "rm path_to_file", description: "Delete file" },
  { command: "os --EOL", description: "Get EOL" },
  { command: "os --cpus", description: "Get host machine CPUs info" },
  { command: "os --homedir", description: "Get home directory and print it to console" },
  { command: "os --username", description: "Get current system user name" },
  { command: "os --architecture", description: "Get CPU architecture" },
  { command: "hash path_to_file", description: "Calculate hash for file and print it into console" },
  { command: "compress path_to_file path_to_destination", description: "Compress file" },
  { command: "decompress path_to_file path_to_destination", description: "Decompress file" },
];

export const showCommands = () => {
  let result = "";
  let maxLengthCommand = 0;

  COMMANDS.forEach((cmd) => (cmd.command.length > maxLengthCommand ? (maxLengthCommand = cmd.command.length) : ""));

  COMMANDS.forEach((cmd) => {
    result += `\x1b[1m${cmd.command}\x1b[0m\x1b[30m${" ".repeat(maxLengthCommand - cmd.command.length)}  -  ${
      cmd.description
    }${EOL}\x1b[0m`;
  });

  return result + EOL;
};
