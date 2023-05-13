"use client";
import { useState } from "react";
import axios from "../api/axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [nid, setNid] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name,
      password,
      contactNumber,
      nid,
      registrationNumber,
      createdAt: new Date(),
    };
    console.log(formData);
    try {
      const response = await axios.post("/auth", formData);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        Contact Number:
        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </label>
      <br />
      <label>
        NID:
        <input
          type="text"
          value={nid}
          onChange={(e) => setNid(e.target.value)}
        />
      </label>
      <br />
      <label>
        Registration Number:
        <input
          type="text"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />
      </label>
      <br />
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit">Sign up</button>
    </form>
  );
}
