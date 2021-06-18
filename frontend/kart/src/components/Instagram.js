import React, { useEffect } from "react";

function Instagram() {

    useEffect(() => {
        window.location.href = "https://instagram.com/";  
    }, []);

  return (
    <div>
      <h2> Instagram </h2>
    </div>
  );
}

export default Instagram;