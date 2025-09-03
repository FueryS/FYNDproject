import React, { useRef, useState, useEffect } from "react";
import './scheduleMain.css';

function ScheduleMain() {
    const [showDrawer, setShowDrawer] = useState(true);
    const drawerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const drawer = drawerRef.current;

        if (!drawer) return;

        const handleMouseOver = () => {
            drawer.style.background = "linear-gradient(135deg, #b6e2d3 0%, #e8f47e 100%)";
            drawer.style.boxShadow = "0 4px 16px rgba(0,0,0,0.18)";
            drawer.style.transform = "scale(1.21)";
        };

        const handleMouseLeave = () => {
            drawer.style.background = ""; // resets to CSS
            drawer.style.boxShadow = "";
            drawer.style.transform = "";
        };

        drawer.addEventListener("mouseover", handleMouseOver);
        drawer.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            drawer.removeEventListener("mouseover", handleMouseOver);
            drawer.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []); 


    const handleClick = () => {
            setShowDrawer(!showDrawer);
            console.log(showDrawer)
            if (showDrawer) {
                canvasRef.current.classList.add('closed');
                console.log("Drawer closed");
            } else {
                canvasRef.current.classList.remove('closed');
                console.log("Drawer opened");
            }
    }

    return (
        <div className="wrapper">
            <button
                className="drawer"
                onClick={() => setShowDrawer(()=>{handleClick()})}
                ref={drawerRef}
            >
                ⦙
            </button>
            <div ref={canvasRef} className="canvas" >
                <div className="schedule-content">
                <span>
                      <p>
                <strong>Monday - Friday:</strong> 6:00 AM - 10:00 PM<br/>
                <strong>Saturday:</strong> 8:00 AM - 8:00 PM<br/>
                <strong>Sunday:</strong> 8:00 AM - 6:00 PM<br/>
                <br/>
                <strong>Peak Hours:</strong> 6:00 AM - 9:00 AM, 5:00 PM - 8:00 PM<br/>
                <strong>Personal Training:</strong> By Appointment<br/>
                <strong>Group Classes:</strong> 7:00 AM, 12:00 PM, 6:00 PM (Mon-Fri)
            </p>
            <p>
                <strong>Monday - Friday:</strong> 6:00 AM - 10:00 PM<br/>
                <strong>Saturday:</strong> 8:00 AM - 8:00 PM<br/>
                <strong>Sunday:</strong> 8:00 AM - 6:00 PM<br/>
                <br/>
                <strong>Peak Hours:</strong> 6:00 AM - 9:00 AM, 5:00 PM - 8:00 PM<br/>
                <strong>Personal Training:</strong> By Appointment<br/>
                <strong>Group Classes:</strong> 7:00 AM, 12:00 PM, 6:00 PM (Mon-Fri)
            </p>
            <p>
                <strong>Monday - Friday:</strong> 6:00 AM - 10:00 PM<br/>
                <strong>Saturday:</strong> 8:00 AM - 8:00 PM<br/>
                <strong>Sunday:</strong> 8:00 AM - 6:00 PM<br/>
                <br/>
                <strong>Peak Hours:</strong> 6:00 AM - 9:00 AM, 5:00 PM - 8:00 PM<br/>
                <strong>Personal Training:</strong> By Appointment<br/>
                <strong>Group Classes:</strong> 7:00 AM, 12:00 PM, 6:00 PM (Mon-Fri)
            </p>
            <p>
                <strong>Monday - Friday:</strong> 6:00 AM - 10:00 PM<br/>
                <strong>Saturday:</strong> 8:00 AM - 8:00 PM<br/>
                <strong>Sunday:</strong> 8:00 AM - 6:00 PM<br/>
                <br/>
                <strong>Peak Hours:</strong> 6:00 AM - 9:00 AM, 5:00 PM - 8:00 PM<br/>
                <strong>Personal Training:</strong> By Appointment<br/>
                <strong>Group Classes:</strong> 7:00 AM, 12:00 PM, 6:00 PM (Mon-Fri)
            </p>

            <p>
                <strong>Monday - Friday:</strong> 6:00 AM - 10:00 PM<br/>
                <strong>Saturday:</strong> 8:00 AM - 8:00 PM<br/>
                <strong>Sunday:</strong> 8:00 AM - 6:00 PM<br/>
                <br/>
                <strong>Peak Hours:</strong> 6:00 AM - 9:00 AM, 5:00 PM - 8:00 PM<br/>
                <strong>Personal Training:</strong> By Appointment<br/>
                <strong>Group Classes:</strong> 7:00 AM, 12:00 PM, 6:00 PM (Mon-Fri)
            </p>
            </span>
                </div>
            </div>
        </div>
    );
}


export default ScheduleMain
