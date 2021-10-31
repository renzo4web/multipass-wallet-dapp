import { ContractFactory, Contract } from "ethers";
import { ethers } from "hardhat";

const FAKE_ADDRESS = [
  "0x5e7dfa507ce10DeaAF411Fb80A663bcDbC05e961",
  "0xd33d866C673A4B7B18A6Af1695f2aba083E16A3f",
  "0xCF7cFEF9ba6D58978FF1AeBe312835E15cc37dC2",
];

async function main(): Promise<void> {
  const WalletFactory: ContractFactory = await ethers.getContractFactory(
    "Wallet"
  );
  //
  const walletContract: Contract = await WalletFactory.deploy(FAKE_ADDRESS, 2, {
    value: ethers.utils.parseEther("0.01"),
  });

  await walletContract.deployed();

  console.log("MultipassWallet deployed to:", walletContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
