import { useState } from "react";
import { getXataClient } from "../utils/xata.codegen";
// require('dotenv').config()
import * as dotenv from "dotenv";
import { send } from "process";
dotenv.config();
// import fetch from "node-fetch";

export const TestForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [occupation, setOccupation] = useState("");

  const send = () => {
    fetch("api/submit-rec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        name: name,
        occupation: occupation,
      }),
    }).then(() => window.location.reload());
  };

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        //   console.log(name, description, title, occupation);
          send();
          //   console.log(process.env)
        }}
        action=""
      >
        Used Our Services? Rate us!
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="name"
        />
        <input
          type="text"
          name="occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          required
          placeholder="occupation"
        />
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="recommendation title"
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="description"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
