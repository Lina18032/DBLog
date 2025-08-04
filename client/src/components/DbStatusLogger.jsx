import React, { useState ,useEffect} from "react";
import "./DbStatusLogger.css";
import { FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";
import { Link } from "react-router-dom";



function DbStatusLogger({ name, status, disconnectTime }) {
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


    useEffect(() => {
    fetch("http://localhost:5000/table-counts")
      .then((res) => res.json())
      .then((data) => {
        if (data[name]) {
          setTableCount(data[name]);
        }
      })
      .catch((err) => console.error("Error fetching table count:"));
  }, [name]);


  const cardContent = (
  <div
  className={`w-[100%] mr-[10px] ml-[10px] max-w-[500px] h-[30vh] mt-8 gap-4 rounded-[10px] flex flex-col justify-center items-center font-normal text-[1.25rem] transition-transform duration-200 ease-in-out hover:scale-103 overflow-hidden ${
    getStatusClass() === "error" ? "card-error" : "card-success"
  }`}
>


      <div className="db-text-[18px] font-bold text-[#0058a1] mt-3 break-words">{name}</div>
      <br />
      <div className="flex justify-between w-2/3 text-[16px] text-[#0058a1] mb-2">
    <div className="flex flex-col items-center">
      <span className="font-semibold">Tabs</span>
      <br />
      <span className="text-[#333] break-words">{tableCount}</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="font-semibold">stat</span>
      <br />
      <span className="text-[#333] break-words">5</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="font-semibold">Status</span>
      <br />
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


    <Link to={`/db/${name}`}   style={{textDecoration: 'none',color: 'inherit', display: 'block',  width: '100%',}}>
      {cardContent}
    </Link>
  );
}

export default DbStatusLogger;
