import React, { useEffect } from "react";

function Facebook() {

    useEffect(() => {
        window.location.href = "https://facebook.com/";  
    }, []);

  return (
    <div>
      <h2>Facebook</h2>
    </div>
  );
}

export default Facebook;