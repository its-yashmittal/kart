import React, { useEffect } from "react";

function Twitter() {

    useEffect(() => {
        window.location.href = "https://twitter.com/";  
    }, []);

  return (
    <div>
      <h2>Twitter</h2>
    </div>
  );
}

export default Twitter;