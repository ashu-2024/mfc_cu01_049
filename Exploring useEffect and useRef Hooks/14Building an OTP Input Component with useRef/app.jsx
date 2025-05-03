import React, { useRef } from "react";

function OTPInput() {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      inputs.current[index].value = value;
      if (index < 3) {
        inputs.current[index + 1].focus();
      }
    } else if (value === "") {
      inputs.current[index].value = "";
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (inputs.current[index].value === "") {
        if (index > 0) {
          inputs.current[index - 1].focus();
        }
      } else {
        inputs.current[index].value = "";
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            ref={(el) => (inputs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              width: "40px",
              height: "40px",
              fontSize: "24px",
              textAlign: "center",
            }}
          />
        ))}
    </div>
  );
}

export default OTPInput;
