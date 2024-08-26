import { useEffect } from "react";
import "./slider.css";

const RightSlider = ({ setIsExpandedFull, isExpandedFull, onclick, active }) => {
  useEffect(() => {
    const resizer = document.querySelector("#rightresizer");
    const sidebar = document.querySelector("#dasboard-right-container");

    resizer.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", resize, false);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", resize, false);
        },
        false
      );
    });

function resize(e) {
  // Calculate the change in mouse position
  const deltaX = e.movementX;
  
  // Calculate the new width of the sidebar based on mouse movement
  let newWidth = sidebar.offsetWidth - deltaX;
  
  // Limit the minimum width of the sidebar
  // newWidth = Math.max(newWidth, 10);

      newWidth = Math.max(Math.min(newWidth,885), 10);

      // newWidth = active === 'FG Mapping' ? Math.max(Math.min(newWidth, 785), 10) : Math.max(Math.min(newWidth, 385), 10);

      // Update the sidebar width
      const size = `${newWidth}px`;
      sidebar.style.width = size;
      console.log(size,"llll")
      onclick(size)
      // Update the isExpandedFull state based on the new width
      if (size > 100 && !isExpandedFull) {
        setIsExpandedFull(true);
      } else if (size <= 100 && isExpandedFull) {
        setIsExpandedFull(false);
      }
    }
        
  }, [isExpandedFull, onclick, setIsExpandedFull]);

  return <div id="rightresizer"></div>;
};

export default RightSlider;
