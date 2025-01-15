import React from "react";
import './styles/app.less';
import Controls from "./components/common/controls/Controls";
import Login from "./components/login/Login";
export default function App() {
  return (
    <div>
        <Controls />
        <Login />
    </div>
  );
}