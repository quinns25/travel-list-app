import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

//  ✅ UPDATED Form (Activity 9d)
function Form({ handleAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    // use function from App (9d)
    handleAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item…"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

//  ✅ UPDATED PackingList (Activity 9b)
function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.quantity} × {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  const total = items.length;
  const packed = items.filter((item) => item.packed).length;
  const percentage = total === 0 ? 0 : Math.round((packed / total) * 100);

  return (
    <footer className="stats">
      <em>
        You have {total} items on your list, and you already packed {packed} (
        {percentage}%)
      </em>
    </footer>
  );
}

//  ✅ UPDATED App (Activities 9a & 9c)
function App() {
  // 9a: LIFT items state up to App
  const [items, setItems] = useState(initialItems);

  // 9c: Move handleAddItem to App
  function handleAddItem(item) {
    setItems((prevItems) => [item, ...prevItems]);
  }

  return (
    <div className="app">
      <Logo />

      {/* 9d: pass handleAddItem to Form */}
      <Form handleAddItem={handleAddItem} />

      {/* 9b: pass items to PackingList */}
      <PackingList items={items} />

      <Stats items={items} />
    </div>
  );
}

export default App;
