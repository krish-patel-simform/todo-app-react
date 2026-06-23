import { Provider } from "react-redux";
import "./App.css";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import store from "./redux/store";
import ThemeProvider from "./Provider/ThemeProvider";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <DashboardPage />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
