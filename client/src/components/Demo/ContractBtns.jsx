import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from "web3";


function ContractBtns({ setValue,value }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [imageDetails, setImageDetails] = useState(null);


  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const read = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const imageHash = parseInt(inputValue);
    console.log("Input value:", imageHash);

    try {
      const imageDetailsResponse = await contract.methods.getImageDetails(imageHash).call({ from: accounts[0] });
      console.log("Image Details:", imageDetailsResponse);
      setImageDetails(imageDetailsResponse);
    } catch (error) {
      console.error("Error fetching image details:", error.message);
      setImageDetails(null);
    }
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const imageHash = parseInt(inputValue);
    console.log("Input value:", imageHash);
    console.log("Address:", accounts[0]);

    try {
      const receipt = await contract.methods.addImage(imageHash).send({ from: accounts[0] });
      console.log("Transaction Receipt:", receipt);
      setValue(inputValue);
      console.log("New value:", value);
    } catch (error) {
      console.error("Error adding image:", error.message);
    }

  };

  return (
    <div>
    <div className="btns">
      <button onClick={read} className="input-btn">
        getImage (
        <input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </button>

      <div onClick={write} className="input-btn">
        write (
        <input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>
    </div>

    {imageDetails && (
      <div className="image-details">
        <p>
          <strong>Owner:</strong> {imageDetails.owner}
        </p>
        <p>
          <strong>Timestamp:</strong> {imageDetails.timestamp}
        </p>
      </div>
    )}
  </div>
  );
}

export default ContractBtns;
