import React, { useState } from "react";
import SegmentPopup from "./SegmentPopup";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="App">
      <h1>Segment Manager</h1>
      <button onClick={() => setShowPopup(true)}>Save Segment</button>

      {showPopup && <SegmentPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default App;
