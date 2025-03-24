import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./pages/recipe/Home";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
