import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./pages/SearchBar";
import Results from "./pages/Results";

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="App"> 
      <SearchBar />
      <Results setData={setData} data={data} />
    </div>
  );
}

export default App;
