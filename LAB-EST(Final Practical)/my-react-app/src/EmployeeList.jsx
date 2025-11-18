import React, { useState } from "react";

export default function EmployeeList() {
  const employees = [
    
    "Gagnesh Kakkar",
    "Jaidev Kakkar",
    "Abhay Bhardwaj",
    "Saksham",
    "Anshul",
    "Karan Rathore",
    "Bhavuk Sahu",
    "Vaibhav Garg",
    "Sahil Mehra"
  ];

  const [filter, setFilter] = useState("");

  const filteredEmployees = employees.filter((name) =>
    name.toLowerCase().startsWith(filter.toLowerCase())
  );

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Employee List</h1>
      <input
        type="text"
        placeholder="Filter by name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 rounded-xl border shadow"
      />
      <ul className="space-y-2">
        {filteredEmployees.map((name) => (
          <li key={name} className="p-2 bg-gray-100 rounded-xl shadow-sm">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

