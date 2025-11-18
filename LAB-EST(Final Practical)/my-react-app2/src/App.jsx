import React from "react";
import Parent from "./Parent";

export default function App() {
  const message = "Hello from the App component!";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">App Component</h1>
      <Parent message={message} />
    </div>
  );
}

