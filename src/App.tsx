import "./App.css";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import Button from "./Components/Button/Button";
import { FaPlus, FaSearch } from "react-icons/fa";
import Input from "./Components/Input/Input";

function App() {
  return (
    <>
      <DashboardPage />
      {/* navbar */}

      {/* task Container */}
      {/* <Button title="Demo" leftIcon={<FaPlus />} />
      <Input type="serach" leftIcon={<FaSearch />} /> */}
    </>
  );
}

export default App;
