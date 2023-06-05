const { ethers, run, network } = require("hardhat")

const main = async () => {
	console.clear()
	const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
	console.log("Deploying contract...")
	const simpleStorage = await simpleStorageFactory.deploy()
	await simpleStorage.deployed()
	console.log(`Deployed contract to: ${simpleStorage.address}...`)

	if (network.name !== "hardhat") {
		await simpleStorage.deployTransaction.wait(5)
		await verify(simpleStorage.address, [])
	}

	const currentValue = await simpleStorage.retrieve()
	console.log(`Current Value is: ${currentValue}`)

	// Update the current value
	const transactionResponse = await simpleStorage.store(7)
	await transactionResponse.wait(1)
	const updatedValue = await simpleStorage.retrieve()
	console.log(`Updated Value is: ${updatedValue}`)
}

const verify = async (contractAddress, args) => {
	console.log("Verifying Contract...")
	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		})
	} catch (error) {
		if (error.message.toLowerCase().includes("already verified")) {
			console.log("Already Verified!")
		} else {
			console.log(error)
		}
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
