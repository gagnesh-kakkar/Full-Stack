import React from "react";

export default function Child({ message }) {
  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow">
      <h3 className="text-lg font-medium">Child Component</h3>
      <p className="mt-2">Message from App: {message}</p>
    </div>
  );
}
