import React from "react";
import ChatRooms from "./ChatRooms";
import DirectMessages from "./DirectMessages";
import Favorited from "./Favorited";
import UserPanel from "./UserPanel";

function SidePanel() {
  return (
    <div
      style={{
        backgroundColor: "#7b83eb",
        padding: "2rem",
        minHeight: "100vh",
        color: "white",
        minWidth: "275px",
      }}
    >
      <UserPanel />
      <Favorited />
      <ChatRooms />
      <DirectMessages />
    </div>
  );
}

export default SidePanel;
