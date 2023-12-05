const hre = require("hardhat");
const { modify_env } = require("./modify_env.js");

async function main() {
  console.log("start deploy...")

  const Distribute = await hre.ethers.deployContract("Distribute");

  await Distribute.waitForDeployment();

  modify_env("Distribute",Distribute.target)
  console.log("contract address:", Distribute.target);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});