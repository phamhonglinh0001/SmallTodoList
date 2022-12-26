import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/login";
import HomeScreen from "./screens/home"
import RegisterScreen from "./screens/register/register";
import Screens from "./contants/screen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path={Screens.LOGIN} element={<LoginScreen />} />
        <Route path={Screens.HOME} element={<HomeScreen />} />
        <Route path={Screens.REGISTER} element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
