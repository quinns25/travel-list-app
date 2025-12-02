import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

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

function Item({ item, handleUpdateItem, handleDeleteItem }) {   // ⭐ NEW (Activity 10)
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => handleUpdateItem(item.id)}
      />

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} × {item.description}
      </span>

      {/* ⭐ NEW delete button */}
      <button
        onClick={() => handleDeleteItem(item.id)}    // ⭐ NEW
        style={{ marginLeft: "10px" }}
      >
        ❌
      </button>
    </li>
  );
}

function PackingList({ items, handleUpdateItem, handleDeleteItem }) {  // ⭐ NEW
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleUpdateItem={handleUpdateItem}
            handleDeleteItem={handleDeleteItem}    // ⭐ NEW
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage =
    totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 && totalItems > 0
          ? "You got everything! 🎉"
          : `You have ${totalItems} items, ${packedItems} packed (${percentage}%).`}
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(item) {
    setItems((prevItems) => [item, ...prevItems]);
  }

  function handleUpdateItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // ⭐ NEW (Activity 10a) delete item using filter
  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />

      {/* ⭐ NEW pass delete function */}
      <PackingList
        items={items}
        handleUpdateItem={handleUpdateItem}
        handleDeleteItem={handleDeleteItem}
      />

      <Stats items={items} />
    </div>
  );
}

export default App;
