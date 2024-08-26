// import React from "react";

// function Supersetreport() {
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-12">
//         <iframe
//           width="600"
//           height="400"
//           seamless
//           frameBorder="0"
//           scrolling="no"
//           src="http://3.110.17.48:8088/superset/explore/p/g79M3pz1O0X/?standalone=1&height=400"
//           >
//           </iframe>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Supersetreport;
import React from "react";

const Supersetreport = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
    <iframe
         title="Report Section" 
          width="100%" 
          height="550px" 
          src="http://127.0.0.1:8088/superset/explore/p/P3ZEjGX1KNq/?standalone=1" 
          frameborder="0" 
          allowFullScreen="true"
          >
          </iframe>
  </div>
  );
};

export default Supersetreport;
