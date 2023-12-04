const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Distribute", function () {
  let Distribute, owner, newOwenr, usdt, user01, user02, user03, user04;

  beforeEach(async () => {
    [owner, newOwenr, user01, user02, user03, user04] = await ethers.getSigners();
    Distribute = await hre.ethers.deployContract("Distribute");
    await Distribute.waitForDeployment();

    usdt = await hre.ethers.deployContract("USDT");
    await usdt.waitForDeployment();

    expect(await Distribute.owner()).to.equal(owner.address); 
    expect(await usdt.balanceOf(owner.address)).to.equal(await usdt.totalSupply());
  });

  // 测试：转移owner权限给newOwner
  it('test transfer owner', async function() {
    await Distribute.transferOwner(newOwenr.address);
    await Distribute.connect(newOwenr).receiveOwner();

    expect(await Distribute.owner()).to.equal(newOwenr.address);
  });

    // 测试：设置新的5个接收地址和比例
  it('test setDistributeInfo', async function() {
    // 这是第一次设置的5个地址和比例
    const receiveArray1 = [owner.address, newOwenr.address, owner.address, newOwenr.address,  owner.address];
    const receiveRatio1 = [1,2,3,4,5];

    await Distribute.setDistributeInfo(receiveArray1, receiveRatio1);

    for (let i = 0; i < 5; i++) {
        expect((await Distribute.distributeInfo(i))[0]).to.equal(receiveArray1[i]);
        expect((await Distribute.distributeInfo(i))[1]).to.equal(receiveRatio1[i]);
    }


    // 这是第二次设置的5个地址和比例
    const receiveArray2 = [owner.address, newOwenr.address, owner.address, newOwenr.address,  owner.address];
    const receiveRatio2 = [11195,589,1,666,1891];

    await Distribute.setDistributeInfo(receiveArray2, receiveRatio2);

    for (let i = 0; i < 5; i++) {
        expect((await Distribute.distributeInfo(i))[0]).to.equal(receiveArray2[i]);
        expect((await Distribute.distributeInfo(i))[1]).to.equal(receiveRatio2[i]);
    }
  });

  // 测试：一旦有代币转到合约，就可以调用合约的方法进行分发代币给5个地址
  it('test distributeAnyERC20', async function() {
    const receiveArray = [newOwenr.address, user01.address, user02.address, user03.address, user04.address];
    const receiveRatio = [1,2,3,4,10];

    await Distribute.setDistributeInfo(receiveArray, receiveRatio);

    await usdt.connect(owner).transfer(Distribute.target, 100_000);

    expect(await usdt.balanceOf(Distribute.target)).to.equal(100_000);

    await Distribute.distributeAnyERC20(usdt.target);

    expect(await usdt.balanceOf(newOwenr.address)).to.equal(100_000 * (1 / 20));
    expect(await usdt.balanceOf(user01.address)).to.equal(100_000 * (2 / 20));
    expect(await usdt.balanceOf(user02.address)).to.equal(100_000 * (3 / 20));
    expect(await usdt.balanceOf(user03.address)).to.equal(100_000 * (4 / 20));
    expect(await usdt.balanceOf(user04.address)).to.equal(100_000 * (10 / 20));

  });

})