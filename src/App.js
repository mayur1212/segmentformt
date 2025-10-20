import React, { useState } from "react";
import SegmentModal from "./components/SegmentModal";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <button className="save-segment-btn" onClick={() => setShowModal(true)}>
        Save segment
      </button>

      {showModal && <SegmentModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;
