const hre = require("hardhat");
const { DistributeABI } = require("../abi/DistributeABI");
const { USDTABI } = require("../abi/test-usdt");

async function test_on_testnetwork() {
    console.log("[start test on bnb test network]")

    const rpc = new hre.ethers.JsonRpcProvider( process.env.bnbtest ) ;
    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, rpc);
    
    const DistributeContract = new hre.ethers.Contract(process.env.Distribute, DistributeABI, wallet);
    const USDTContract = new hre.ethers.Contract(process.env.USDT, USDTABI, wallet);

    console.log("test transferOwner()...");
    const tx1 = await DistributeContract.transferOwner(process.env.owner);
    console.log("add owner pengding successfully:", tx1.hash); 

    console.log()

    console.log("wait for 8 seconds, maybe the tx is pengding");
    setTimeout(function() {}, 8000);

    console.log()

    console.log("test receiveOwner()...");
    const tx2 = await DistributeContract.receiveOwner();
    console.log("modify the owner successfully:", tx2.hash); 

    console.log()

    console.log("test setDistributeInfo()...");
    const receiveArray = [
        "0x0000000000000000000000000000000000000000", 
        "0x0000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000002", 
        "0x0000000000000000000000000000000000000003", 
        "0x0000000000000000000000000000000000000004"
    ];
    const receiveRatio = [1,2,3,4,10];
    const tx3 = await DistributeContract.setDistributeInfo(receiveArray, receiveRatio);
    console.log("setDistributeInfo successfully:", tx3.hash); 

    console.log()

    console.log("test USDT transfer 100_000 to the Distribute...");
    const tx4 = await USDTContract.transfer(process.env.Distribute, 100_000);
    console.log("transfer 100_000 successfully:", tx4.hash); 

    console.log()

    console.log("test distributeAnyERC20()...");
    const tx5 = await DistributeContract.distributeAnyERC20(process.env.USDT);
    console.log("distributeAnyERC20 successfully:", tx5.hash); 

    console.log()

    console.log("balance of the five address:")
    const balance0 = await USDTContract.balanceOf("0x0000000000000000000000000000000000000000");
    const balance1 = await USDTContract.balanceOf("0x0000000000000000000000000000000000000001");
    const balance2 = await USDTContract.balanceOf("0x0000000000000000000000000000000000000002");
    const balance3 = await USDTContract.balanceOf("0x0000000000000000000000000000000000000003");
    const balance4 = await USDTContract.balanceOf("0x0000000000000000000000000000000000000004");
    console.log("address(0):", balance0);
    console.log("address(1):", balance1);
    console.log("address(2):", balance2);
    console.log("address(3):", balance3);
    console.log("address(4):", balance4);
}

test_on_testnetwork();