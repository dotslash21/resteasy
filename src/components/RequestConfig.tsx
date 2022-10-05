import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Request,
  RequestMethod,
  updateRequest,
} from "../features/requests/requestsSlice";
import tabA11yProps from "../utils/a11yProps";
import TabPanel from "./TabPanel";

interface RequestPanelProps {
  index: number;
  request: Request;
}

const RequestConfig = (props: RequestPanelProps) => {
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <section className="flex gap-1">
        <FormControl sx={{ minWidth: "fit-content" }}>
          <Select
            value={props.request.method}
            onChange={(event: SelectChangeEvent) =>
              dispatch(
                updateRequest({
                  index: props.index,
                  request: {
                    ...props.request,
                    method: event.target.value as RequestMethod,
                  },
                })
              )
            }
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
            <MenuItem value="PUT">PUT</MenuItem>
            <MenuItem value="DELETE">DELETE</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Enter request URL"
          variant="outlined"
          value={props.request.url}
          onChange={(event) =>
            dispatch(
              updateRequest({
                index: props.index,
                request: {
                  ...props.request,
                  url: event.target.value,
                },
              })
            )
          }
        />
        <Button variant="contained">Send</Button>
      </section>

      <section>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Headers" {...tabA11yProps(0)} />
              <Tab label="Params" {...tabA11yProps(1)} />
              <Tab label="Body" {...tabA11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={selectedTab} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </section>
    </>
  );
};

export default RequestConfig;
