import React, { useState ,useEffect} from "react";
import "./DbStatusLogger.css";
import { FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";
import { Link } from "react-router-dom";



function ServerCard({  name, status, disconnectTime, pingTime, role, ip ,location }) {
  const [showInput, setShowInput] = useState(false);
  const [query, setQuery] = useState("");
  const [localStatus, setLocalStatus] = useState("unknown");
  const [tableCount, setTableCount] = useState(null);
const getStatusClass = () => {
  if (localStatus === "success") return "success";
  if (localStatus === "error") return "error";
  if (localStatus === "unknown") return "unknown";
  return status === "connected" ? "success" : "error";
};
const getStatusIcon = () => {
  return status === "connected" ? (
    <FaAngleDoubleUp className="icon-up" />
  ) : (
    <FaAngleDoubleDown className="icon-down" />
  );
};

useEffect(() => {
  if (status === "connected") {
    setLocalStatus("success");
  } else {
    setLocalStatus("error");
  }
}, [status]);


  const cardContent = (
  <div
  className={`w-[100%] mr-[10px] ml-[10px] max-w-[500px] h-[35vh] mt-4 gap-4 rounded-[10px] flex flex-col justify-center items-center font-normal text-[1.25rem] transition-transform duration-200 ease-in-out hover:scale-103 overflow-hidden ${
    getStatusClass() === "error" ? "card-error" : "card-success"
  }`}
>


      <div className="db-text-[18px] font-bold text-[#0058a1] mt-1 break-words">{name}</div>
      <br />
      <div className="flex justify-between w-3/4 text-[16px] text-[#0058a1] mb-1">
  <div className="flex flex-col items-center">
    <span className="font-semibold">Ping</span>
    <span className="text-[#333] break-words">{pingTime || '---'} ms</span>
  </div>
  <div className="flex flex-col items-center">
    <span className="font-semibold">Role</span>
    <span className="text-[#333] break-words">{role || '---'}</span>
  </div>
  <div className="flex flex-col items-center">
    <span className="font-semibold">Location</span>
    <span className="text-[#333] break-words">{location || '---'}</span>
  </div>
  <div className="flex flex-col items-center">
    <span className="font-semibold">Status</span>
    <span className="status-icon text-xl">{getStatusIcon()}</span> 
  </div>
</div>

  <br /><br />
      <div  className="text">
  {status !== "connected" && (
    <span>Last disconnected at: {disconnectTime || "Unknown"}</span>
  )}
</div>

    </div>
  )
  return (


    <Link to={`/server/${name}`}   style={{textDecoration: 'none',color: 'inherit', display: 'block',  width: '100%',}}>
      {cardContent}
    </Link>
  );
}

export default ServerCard;
