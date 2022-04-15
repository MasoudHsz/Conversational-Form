import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import config from "./prepared/config";
import ConversationBox from "./components/UI/ConversationBox";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  function dispatchData(res) {
    dispatch({ type: "FETCH_DATA", response: res });
  }

  useEffect(() => {
    axios(
      config(
        "get",
        "https://api.formaloo.net/v3.1/form-displays/address/uhg2r/"
      )
    )
      .then(function (response) {
        dispatchData(response.data);
      })
      .catch(function (error) {
      });
  }, []);

  return (
    <div className="App">
      <ConversationBox />
    </div>
  );
}

export default App;
