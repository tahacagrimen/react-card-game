import "./App.css";
import Card from "./components/Card";
import CardContainer from "./components/CardContainer";
import Header from "./components/Header";

function App() {
  return (
    <div className="App h-screen w-screen flex items-center justify-center flex-col">
      <Header />
      <CardContainer />
    </div>
  );
}

export default App;
