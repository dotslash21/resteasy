import * as React from "react";
import * as ReactDOM from "react-dom";
import { store, RootState } from "./app/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { addRequest, removeRequest } from "./features/requests/requestsSlice";
import Button from "@mui/material/Button";
import RequestTabs from "./components/RequestTabs";

const App = () => {
  const requests = useSelector((state: RootState) => state.requests);
  const dispatch = useDispatch();

  if (requests.length === 0) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
        <p>Things are looking empty right now, add your first request now!</p>
        <Button
          variant="contained"
          onClick={() =>
            dispatch(
              addRequest({
                method: "GET",
                url: "",
                body: "",
                headers: [],
              })
            )
          }
        >
          Add Request
        </Button>
      </div>
    );
  } else {
    return <RequestTabs requests={requests} />;
  }
};

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body
  );
}

render();
