const { ethers } = require("hardhat")
const { assert } = require("chai")

describe("SimpleStorage", () => {
	let simpleStorageFactory, simpleStorage

	beforeEach(async () => {
		simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
		simpleStorage = await simpleStorageFactory.deploy()
		await simpleStorage.deployed()
	})

	it("Should start with a favorite number of 0", async () => {
		const currentValue = await simpleStorage.retrieve()
		const expectedValue = "0"

		assert.equal(currentValue.toString(), expectedValue)
	})

	it("Should update when we call store", async () => {
		const expectedValue = "7"
		const transactionResponse = await simpleStorage.store(expectedValue)
		await transactionResponse.wait(1)

		const currentValue = await simpleStorage.retrieve()
		assert.equal(currentValue.toString(), expectedValue)
	})

	it("Should work correctly with the people struct and array", async () => {
		const expectedPersonName = "Juan"
		const expectedFavoriteNumber = "7"

		const transactionResponse = await simpleStorage.addPerson(
			expectedPersonName,
			expectedFavoriteNumber,
		)
		await transactionResponse.wait(1)

		const { favoriteNumber, name } = await simpleStorage.people(0)
		assert.equal(name, expectedPersonName)
		assert.equal(favoriteNumber, expectedFavoriteNumber)
	})
})
