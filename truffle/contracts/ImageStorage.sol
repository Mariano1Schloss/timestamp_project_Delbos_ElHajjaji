// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

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
    /*modifier onlyOwner(bytes32 imageHash) {
        require(msg.sender == images[imageHash].owner, "Not the owner of the image");
        _;
    }*/

    // Function to add a new image to the blockchain
    function addImage(uint256 intValue) external {
    bytes32 _imageHash = bytes32(intValue);

    // Check if an image already exists for the given hash
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
    function getImageDetails(uint256 intValue) external view returns (address owner, uint256 timestamp) {
        bytes32 imageHash = bytes32(intValue);
        Image storage image = images[imageHash];
        //require(image.owner != address(0), "Image  does not exist for the given hash");
        return (image.owner, image.timestamp);
    }



    // Additional functions can be added for features like transferring ownership, revoking access, etc.
}
