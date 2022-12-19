export const run = (command, params) => {
  try {
    if (typeof command !== "function") {
      console.log(`Invalid input`);
      return;
    }
    command(...params);
  } catch (error) {
    console.log(`Invalid input`);
  }
};
