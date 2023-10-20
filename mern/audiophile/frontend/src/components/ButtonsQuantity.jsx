import React from 'react';
import { useState, useRef } from 'react';

function QtyGroup() {
  const [qty, setQty] = useState(1);
  const qtyRef = useRef();

  // Handle quantity change from buttons
  const handleQty = (operation) => {
    if (operation === 'add') {
      setQty((qty) => qty + 1);
      qtyRef.current.textContent = qty + 1;
    } else if (operation === 'sub') {
      // Minimum of 0
      if (qty === 1) {
        return;
      }

      setQty((qty) => qty - 1);
      qtyRef.current.textContent = qty - 1;
    }
  };

  return (
    <div className="quantity-group">
      <button onClick={() => handleQty('sub')} className="qty qty-sub">
        <div>-</div>
      </button>
      <div className="qty qty-value">
        <div ref={qtyRef}>1</div>
      </div>
      <button onClick={() => handleQty('add')} className="qty qty-add">
        <div>+</div>
      </button>
    </div>
  );
}

export default QtyGroup;
