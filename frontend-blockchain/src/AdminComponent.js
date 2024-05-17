import React, { useState } from "react";
import { Web3 } from "web3";

const AdminComponent = () => {
  const [totalCourses, setTotalCourses] = useState("");
  const web3 = new Web3("http://127.0.0.1:7545");
  const [newCourseSellingAddress, setNewCourseSellingAddress] = useState("");
  // const contractAddress = "0xD4Fc541236927E2EAf8F27606bD7309C1Fc2cbee"; //adresa contractului
  const [contractAddress, setContractAddress] = useState("");
  const contractABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_courseSelling",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          indexed: true,
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "CourseUpdated",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_courseSelling",
          type: "address",
        },
      ],
      name: "setCourseSellingContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "admin",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "courseSelling",
      outputs: [
        {
          internalType: "contract CourseSelling",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256",
        },
      ],
      name: "getCoursePrice",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTotalCoursePrice",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "Max_",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  //   const getTotalCourses = async () => {
  //     try {
  //       const contractInstance = new web3.eth.Contract(
  //         contractABI,
  //         contractAddress
  //       );

  //       // Call the getTotalCoursePrice function
  //       const result = await contractInstance.methods
  //         .getTotalCoursePrice()
  //         .call();
  //       setTotalCourses(result);
  //     } catch (error) {
  //       console.error("Error getting total courses:", error);
  //       alert("Error getting total courses. Please try again.");
  //     }
  //   };

  const setCourseSellingContract = async () => {
    try {
      const contractInstance = new web3.eth.Contract(
        contractABI,
        contractAddress
      );

      // Call the setCourseSellingContract function
      await contractInstance.methods
        .setCourseSellingContract(newCourseSellingAddress)
        .send({ from: "0x1DE39e95b5C28A9A840C8B0124988F13d9157a5F" }); // Replace with your admin address
      alert("Course selling contract updated successfully!");
    } catch (error) {
      console.error("Error setting course selling contract:", error);
      alert("Error setting course selling contract. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    setNewCourseSellingAddress(event.target.value);
  };

  return (
    <div>
      <h1>Admin Component</h1>
      <h1>Admin Contract Address</h1>
      <label htmlFor="contractAddress">Contract Address:</label>
      <input
        type="text"
        id="contractAddress"
        name="contractAddress"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      {/* <button onClick={getTotalCourses}>Get Total Courses</button>
      <p>Total Courses: {totalCourses}</p> */}
      <h2>Set Course Selling Contract</h2>
      <input
        type="text"
        placeholder="Enter new CourseSelling contract address"
        value={newCourseSellingAddress}
        onChange={handleInputChange}
      />
      <button onClick={setCourseSellingContract}>
        Set Course Selling Contract
      </button>
    </div>
  );
};

export default AdminComponent;
