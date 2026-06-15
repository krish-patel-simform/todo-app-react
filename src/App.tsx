import "./App.css";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AllTaskListProvider from "./Provider/AllTaskListProvider";

function App() {
  return (
    <>
      <AllTaskListProvider>
        <DashboardPage />
      </AllTaskListProvider>
    </>
  );
}

export default App;
