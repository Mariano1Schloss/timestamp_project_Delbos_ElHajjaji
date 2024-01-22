// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ImageStorage {
    // Structure to represent an image
    struct Image {
        address owner;          // Ethereum address of the image owner
        bytes32 imageHash;      // Hash of the image content
        uint256 timestamp;      // Timestamp when the image was recorded
    }

    // Mapping from image hash to Image struct
    mapping(bytes32 => Image) public images;

    // Event emitted when a new image is added
    event ImageAdded(address indexed owner, bytes32 indexed imageHash, uint256 timestamp);

    // Modifier to ensure that only the owner can perform certain actions
    modifier onlyOwner(bytes32 imageHash) {
        require(msg.sender == images[imageHash].owner, "Not the owner of the image");
        _;
    }

    // Function to add a new image to the blockchain
    function addImage(bytes32 _imageHash) external {
        require(images[_imageHash].owner == address(0), "Image already exists");

        // Record the image details
        images[_imageHash] = Image({
            owner: msg.sender,
            imageHash: _imageHash,
            timestamp: block.timestamp
        });

        // Emit an event
        emit ImageAdded(msg.sender, _imageHash, block.timestamp);
    }

    // Function to get image details
    function getImageDetails(bytes32 imageHash) external view returns (address owner, uint256 timestamp) {
        return (images[imageHash].owner, images[imageHash].timestamp);
    }

    // Additional functions can be added for features like transferring ownership, revoking access, etc.
}
