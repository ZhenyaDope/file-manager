export const parseArgs = (commandLine) => {
  const [command, ...params] = commandLine.toString().trim().split(" ");

  return [command, params];
};
