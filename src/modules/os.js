import OS from "os";

export const os = {
  os: (flag) => {
    if (!flag.includes("--")) {
      console.log("Operation failed");
      return;
    }

    const formattedFlag = flag.replace("--", "");
    const validArgs = ["EOL", "cpus", "homedir", "username", "architecture"];

    if (!validArgs.includes(formattedFlag)) {
      console.log("Operation failed");
      return;
    }

    let result;

    if (formattedFlag === "username") {
      result = OS.userInfo().username;
    } else {
      result = typeof OS[formattedFlag] === "function" ? OS[formattedFlag]() : OS[formattedFlag];
    }

    console.log(result);
  },
};
