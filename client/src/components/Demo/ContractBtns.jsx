import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from "web3";


function ContractBtns({ setValue,value }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const read = async () => {
    //const value = await contract.methods.read().call({ from: accounts[0] });
    //setValue(value);
    console.log(value);
    const image_details = await contract.methods.getImageDetails(Web3.utils.utf8ToHex(value)).call({ from: accounts[0] });
    console.log(image_details );
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    console.log(accounts[0]);
    //await contract.methods.write(newValue).send({ from: accounts[0] });
    await contract.methods.addImage(Web3.utils.utf8ToHex(newValue)).send({ from: accounts[0] });
    //setValue(newValue);
  };

  return (
    <div className="btns">

      <button onClick={read}>
        read()
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
