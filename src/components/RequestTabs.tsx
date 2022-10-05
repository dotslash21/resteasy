import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  Request,
  addRequest,
  removeRequest,
} from "../features/requests/requestsSlice";
import RequestConfig from "./RequestConfig";
import truncate from "../utils/truncate";
import tabA11yProps from "../utils/a11yProps";
import TabPanel from "./TabPanel";

interface RequestTabsProps {
  requests: Request[];
}

const RequestTabs = (props: RequestTabsProps) => {
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Request tabs"
        >
          {props.requests.map((request, index) => (
            <Tab
              key={index}
              label={
                <span>
                  {`[${request.method}] ${
                    request.url.length > 0
                      ? truncate(request.url, 10)
                      : "New Request"
                  }
                  `}
                  <IconButton
                    component="div"
                    size="small"
                    onClick={() => {
                      dispatch(removeRequest(index));
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </span>
              }
              {...tabA11yProps(index)}
            />
          ))}

          <Button
            variant="text"
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
            <AddIcon />
          </Button>
        </Tabs>
      </Box>

      {props.requests.map((request, index) => (
        <TabPanel key={index} value={selectedTab} index={index}>
          <RequestConfig index={index} request={request} />
        </TabPanel>
      ))}
    </Box>
  );
};

export default RequestTabs;
