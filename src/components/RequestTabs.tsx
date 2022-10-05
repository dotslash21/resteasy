import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Request } from "../features/requests/requestsSlice";
import RequestConfig from "./RequestConfig";
import truncate from "../utils/truncate";
import tabA11yProps from "../utils/a11yProps";
import TabPanel from "./TabPanel";

interface RequestTabsProps {
  requests: Request[];
}

const RequestTabs = (props: RequestTabsProps) => {
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
              label={`[${request.method}] ${
                request.url.length > 0
                  ? truncate(request.url, 10)
                  : "New Request"
              }`}
              {...tabA11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>

      {props.requests.map((request, index) => (
        <TabPanel value={selectedTab} index={index} key={index}>
          <RequestConfig index={index} request={request} />
        </TabPanel>
      ))}
    </Box>
  );
};

export default RequestTabs;
