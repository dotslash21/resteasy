import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Request } from "../features/requests/requestsSlice";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface RequestTabsProps {
  requests: Request[];
}

const RequestTabs = (props: RequestTabsProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Request tabs"
        >
          {props.requests.map((request, index) => (
            <Tab
              label={`[${request.method}] ${
                request.url.length > 0 ? request.url : "New Request"
              }`}
              {...a11yProps(index + 3)}
            />
          ))}
        </Tabs>
      </Box>

      {props.requests.map((request, index) => (
        <TabPanel value={value} index={index}>
          {request.method} {request.url}
        </TabPanel>
      ))}
    </Box>
  );
};

export default RequestTabs;
