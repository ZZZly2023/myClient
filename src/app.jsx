import React from "react";
import './styles/app.less';
import Controls from "./components/common/Controls/controls";
export default function App() {
  return (
    <div>
      <Controls />
      <h1>{ 'hello react' }</h1>
    </div>
  );
}