const hre = require("hardhat");
const { modify_env } = require("./modify_env.js");

async function main() {
  console.log("start deploy Distribute...")

  const Distribute = await hre.ethers.deployContract("Distribute");
  await Distribute.waitForDeployment();

  modify_env("Distribute",Distribute.target)
  console.log("Distribute address:", Distribute.target);


  console.log("start deploy USDT...")

  const USDT = await hre.ethers.deployContract("USDT");
  await USDT.waitForDeployment();

  modify_env("USDT",USDT.target)
  console.log("USDT address:", USDT.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
