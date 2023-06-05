require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("./tasks/block-number")

const sepoliaConfig = {
	url: process.env.SEPOLIA_URL,
	accounts: [process.env.SEPOLIA_PRIVATE_KEY],
	chainId: 11155111,
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.18",
	networks: {
		sepolia: sepoliaConfig,
	},
	defaultNetwork: "hardhat",
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
}
