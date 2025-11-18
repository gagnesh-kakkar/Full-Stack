import React from "react";
import Child from "./Child";

export default function Parent({ message }) {
  return (
    <div className="p-4 border rounded-xl shadow mb-4">
      <h2 className="text-xl font-semibold">Parent Component</h2>
      <Child message={message} />
    </div>
  );
}