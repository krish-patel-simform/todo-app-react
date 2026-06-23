import "./App.css";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AllTaskListProvider from "./Provider/AllTaskListProvider";
import ThemeProvider from "./Provider/ThemeProvider";

function App() {
  return (
    <>
      <AllTaskListProvider>
        <ThemeProvider>
          <DashboardPage />
        </ThemeProvider>
      </AllTaskListProvider>
    </>
  );
}

export default App;
