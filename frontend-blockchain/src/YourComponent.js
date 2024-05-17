import React, { useState, useEffect } from "react";
// import { Web3 } from "web3";
import Web3 from "web3";

const YourComponent = () => {
  const [courseName, setCourseName] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  // const [allCourses, setAllCourses] = useState([]);
  // const [courseCount, setCourseCount] = useState(0);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [courseIndex, setCourseIndex] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [courses, setCourses] = useState([]);
  const [gasLimit, setGasLimit] = useState("");
  const [estimatedGas, setEstimatedGas] = useState(0);

  const web3 = new Web3("http://127.0.0.1:7545");
  // const contractAddress = "0x9d83e140330758a8fFD07F8Bd73e86ebcA8a5692"; // adresa contractului
  const [contractAddress, setContractAddress] = useState("");
  const contractABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
      name: "CoursePurchased",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "CourseRegistered",
      type: "event",
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
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "courses",
      outputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
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
      ],
      name: "getAllCourses",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
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
      ],
      name: "getAllCourses_normal",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
          ],
          internalType: "struct CourseSelling.Course[]",
          name: "",
          type: "tuple[]",
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
      ],
      name: "getCourseCount",
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
      inputs: [
        {
          internalType: "address",
          name: "_seller",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256",
        },
      ],
      name: "purchaseCourse",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      name: "registerCourse",
      outputs: [],
      stateMutability: "payable",
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
      name: "updateCoursePrice",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];

  const registerCourse = async () => {
    try {
      const contractInstance = new web3.eth.Contract(
        contractABI,
        contractAddress
      );

      // Functie de estimare pt gas
      const estimatedGas = await contractInstance.methods
        .registerCourse(courseName)
        .estimateGas({ from: fromAddress });

      console.log(estimatedGas);

      setEstimatedGas(estimatedGas);

      if (!gasLimit) {
        alert("Please set a gas limit.");
        return;
      }

      const receipt = await contractInstance.methods
        .registerCourse(courseName)
        .send({
          from: fromAddress, // Use fromAddress state
          value: web3.utils.toWei(transactionValue, "ether"), // Use transactionValue state
          gas: gasLimit,
        });

      console.log("Transaction successful:", receipt);
      alert(
        "Course registered successfully!" + "Estimated Gas: " + estimatedGas
      );
    } catch (error) {
      console.error("Error registering course:", error);
      alert("Error registering course. Please try again.");
    }
  };

  const updateCoursePrice = async () => {
    try {
      const contractInstance = new web3.eth.Contract(
        contractABI,
        contractAddress
      );

      const gas = await contractInstance.methods
        .updateCoursePrice(ownerAddress, courseIndex)
        .estimateGas({ from: ownerAddress });

      setEstimatedGas(gas);

      if (!gasLimit) {
        alert("Please set a gas limit.");
        return;
      }

      const receipt = await contractInstance.methods
        .updateCoursePrice(ownerAddress, courseIndex)
        .send({
          from: ownerAddress,
          value: web3.utils.toWei(newPrice, "ether"),
          gas: gasLimit,
        });

      console.log("Transaction successful:", receipt);
      alert(
        "Course price updated successfully!" + "Estimated Gas: " + estimatedGas
      );
    } catch (error) {
      console.error("Error updating course price:", error);
      alert("Error updating course price. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "courseName") setCourseName(value);
    else if (name === "fromAddress") setFromAddress(value);
    else if (name === "transactionValue") setTransactionValue(value);
  };

  const handleInputChangeUpdate = (event) => {
    const { name, value } = event.target;
    if (name === "ownerAddress") setOwnerAddress(value);
    else if (name === "courseIndex") setCourseIndex(value);
    else if (name === "newPrice") setNewPrice(value);
  };

  const handleInputChangeOwner = (event) => {
    const { value } = event.target;
    setOwnerAddress(value);
  };

  // const getCourseCount = async () => {
  //   try {
  //     const contractInstance = new web3.eth.Contract(
  //       contractABI,
  //       contractAddress
  //     );

  //     const result = await contractInstance.methods
  //       .getCourseCount(ownerAddress) // Call getCourseCount with the owner address
  //       .call();

  //     console.log("Course count:", result);
  //     alert("Course count retrieved successfully!");
  //   } catch (error) {
  //     console.error("Error getting course count:", error);
  //     alert("Error getting course count. Please try again.");
  //   }
  // };

  const getCourseCount = async () => {
    try {
      const contractAddress = "0x9d83e140330758a8fFD07F8Bd73e86ebcA8a5692";
      const contractInstance = new web3.eth.Contract(
        contractABI,
        contractAddress
      );
      console.log("Am intrat");
      const count = await contractInstance.methods
        .getCourseCount(ownerAddress)
        .call();
      console.log("Number of courses:", count);

      // Handle the count in your UI or application logic as needed
    } catch (error) {
      console.error("Error getting course count:", error);
      alert("Error getting course count. Please try again.");
    }
  };

  // Observer Pattern - modifica UI-ul din frontend de fiecare data cand se schimba adresa Ownerului
  // useEffect(() => {
  //   getCourseCount();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ownerAddress]);

  return (
    <div>
      <h1>CourseSelling Contract Address</h1>
      <label htmlFor="contractAddress">Contract Address:</label>
      <input
        type="text"
        id="contractAddress"
        name="contractAddress"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <br />
      <h1>Register Course</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerCourse();
        }}
      >
        <label htmlFor="courseName">Course Name:</label>
        <input
          type="text"
          id="courseName"
          name="courseName"
          value={courseName}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="fromAddress">From Address:</label>
        <input
          type="text"
          id="fromAddress"
          name="fromAddress"
          value={fromAddress}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="transactionValue">Transaction Value (ETH):</label>
        <input
          type="text"
          id="transactionValue"
          name="transactionValue"
          value={transactionValue}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="gasLimit">Gas Limit:</label>
        <input
          type="text"
          id="gasLimit"
          name="gasLimit"
          value={gasLimit}
          onChange={(e) => setGasLimit(e.target.value)}
        />
        <br />
        <button type="submit">Register Course</button>
      </form>

      <h1>Update Course Price</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCoursePrice();
        }}
      >
        <label htmlFor="ownerAddress">Owner Address:</label>
        <input
          type="text"
          id="ownerAddress"
          name="ownerAddress"
          value={ownerAddress}
          onChange={handleInputChangeUpdate}
        />
        <br />
        <label htmlFor="courseIndex">Course Index:</label>
        <input
          type="text"
          id="courseIndex"
          name="courseIndex"
          value={courseIndex}
          onChange={handleInputChangeUpdate}
        />
        <br />
        <label htmlFor="newPrice">New Price (ETH):</label>
        <input
          type="text"
          id="newPrice"
          name="newPrice"
          value={newPrice}
          onChange={handleInputChangeUpdate}
        />
        <br />
        <label htmlFor="gasLimit">Gas Limit:</label>
        <input
          type="text"
          id="gasLimit"
          name="gasLimit"
          value={gasLimit}
          onChange={(e) => setGasLimit(e.target.value)}
        />
        <br />
        <button type="submit">Update Course Price</button>
      </form>

      <h1>Get Courses</h1>
      <label htmlFor="ownerAddress">Owner Address:</label>
      <input
        type="text"
        id="ownerAddress"
        value={ownerAddress}
        onChange={handleInputChangeOwner}
      />
      <br />
      <button onClick={getCourseCount}>Get Course Count</button>
      {/* <h2>All Courses</h2>
      <input
        type="text"
        placeholder="Enter owner address"
        value={ownerAddress}
        onChange={(e) => setOwnerAddress(e.target.value)}
      />
      <button onClick={getAllCourses}>Get All Courses</button>
      <ul>
        {allCourses.map((course, index) => (
          <li key={index}>
            Name: {course.name}, Price: {course.price}
          </li>
        ))}
      </ul>

      <h2>Course Count</h2>
      <input
        type="text"
        placeholder="Enter owner address"
        value={ownerAddress}
        onChange={(e) => setOwnerAddress(e.target.value)}
      />
      <button onClick={getCourseCount}>Get Course Count</button>
      <p>Total courses: {courseCount}</p> */}
    </div>
  );
};

export default YourComponent;
