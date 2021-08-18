const ERC20 = artifacts.require("ERC20");
const Dex = artifacts.require("Dex");

const toWei = (number) => web3.utils.toWei(web3.utils.toBN(number), "ether");

module.exports = async function (deployer) {
  await deployer.deploy(ERC20, "Dai", "DAI", 18, toWei(10 ** 10)); // should be string or bigNNumber
  const dai = await ERC20.deployed(); // get the instance just after the deployment
  await deployer.deploy(ERC20, "Chainlink", "LINK", 18, toWei(10 ** 6));
  const link = await ERC20.deployed();
  await deployer.deploy(ERC20, "Compound", "COMP", 18, toWei(10 ** 4));
  const comp = await ERC20.deployed();

  await deployer.deploy(Dex, [dai.address, link.address, comp.address]);
  const dex = await Dex.deployed();

  await dai.transfer(dex.address, toWei(10 ** 10));
  await link.transfer(dex.address, toWei(10 ** 6));
  await comp.transfer(dex.address, toWei(10 ** 4));
};
