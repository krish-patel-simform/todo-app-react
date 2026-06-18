import { Provider } from "react-redux";
import "./App.css";
import DashboardPage from "./pages/Dashboard/DashboardPage";
// import AllTaskListProvider from "./Provider/AllTaskListProvider";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    </>
  );
}

export default App;
