const hre = require("hardhat");
const { modify_env } = require("./modify_env.js");

async function main() {
  console.log("start deploy...")

  const USDT = await hre.ethers.deployContract("USDT");

  await USDT.waitForDeployment();

  modify_env("USDT",USDT.target)
  console.log("contract address:", USDT.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});