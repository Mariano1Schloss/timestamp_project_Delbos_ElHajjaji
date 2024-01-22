// SPDX-License-Identifier: MIT
const ImageStorage = artifacts.require('ImageStorage');

contract('ImageStorage', (accounts) => {
    let imageStorageInstance;

    before(async () => {
        imageStorageInstance = await ImageStorage.deployed();
    });

    it('should add a new image and get its details', async () => {
        const imageHash = "0x123";  // Replace with an actual hash

        // Add a new image
        await imageStorageInstance.addImage(imageHash, { from: accounts[0] });

        // Get image details
        const details = await imageStorageInstance.getImageDetails(imageHash);
        const owner = details[0];
        const timestamp = details[1];

        assert.equal(owner, accounts[0], 'Incorrect owner');
        assert.notEqual(timestamp, 0, 'Timestamp should not be zero');
    });
});
