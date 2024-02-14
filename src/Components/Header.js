import React from "react";

const Header = () => {
  return (
    <>
      <div style={{ height: "30%", padding: "10px" }}>
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <img
              src="logo2.png"
              width={"40px"}
              height={"35px"}
              style={{ borderRadius: "50%" }}
            />
            <span
              style={{
                fontFamily: "sans-serif",
                fontStyle: "italic",
                fontWeight: 600,
                marginLeft: "10px",
              }}
            >
              INTERVIEW BLITZ
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button style={{background: "#ff1a75", border: "none", borderRadius: "10px", padding: "5px 10px" , fontFamily: "sans-serif", fontWeight: "600"}}  >login</button>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Header;
