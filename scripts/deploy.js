const hre = require("hardhat");

async function main() {

  const Distribute = await hre.ethers.deployContract("Distribute");

  await Distribute.waitForDeployment();

  console.log("contract address:", Distribute.target);
  console.log(await Distribute.owner());
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
