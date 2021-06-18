import React, { useEffect } from "react";

function Youtube() {

    useEffect(() => {
        window.location.href = "https://youtube.com/";  
    }, []);

  return (
    <div>
      <h2>Youtube</h2>
    </div>
  );
}

export default Youtube;