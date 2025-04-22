import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect, useContext } from "react";
import apiRequest from "../Utilities/apiUtility";
import { AppContext } from "../context.js";
import TopBar from "../Components/TopBar";
import swal from "sweetalert";
import { Button, Box } from "@mui/material";
import Footer from "../Components/Footer.js";
import { useLocation, useNavigate } from "react-router-dom";
import DataFile from "../Utilities/DataFile.js";

const ExecuteJobMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, setUser } = useContext(AppContext);
  const [assignedATMs, setAssignedATMs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobCommands, setJobCommands] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log("ATM List:", state.ATMList);
    console.log("Current User ID:", state.currentUserID);

    const userAssignedATMs = state.ATMList.filter(
      (atm) => atm.assignedTo === state.currentUserID
    );

    console.log("Filtered Assigned ATMs:", userAssignedATMs);

    setAssignedATMs(userAssignedATMs);
  }, [state.ATMList, state.currentUserID]);

  useEffect(() => {
    if (assignedATMs.length > 0) {
      if(DataFile.Demo){
        DemoGetJobList();
      }else{
        getJobList();
      }
    }
  }, [assignedATMs]);

  const handleOpenDialog = (jobid) => {
    const commands = jobList
      .filter((job) => job.jobid.trim() === jobid.trim())
      .sort((a, b) => parseInt(a.commandno) - parseInt(b.commandno));

    setSelectedJob(jobid);
    setJobCommands(commands);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
    setJobCommands([]);
  };

  const executeJob = (JobID, deviceid) => {
    setLoading(true); // Set loading state to true when executing job
    const body = {
      jobid: JobID,
      UserID: state.user.UserID,
    };
    if (deviceid !== "null") {
      body.deviceID = deviceid;
    }

    apiRequest("POST", `${apiURL}/JobController/ExecuteJob`, {
      body,
      headers: {
        Authorization: "Bearer " + state?.user?.Token,
      },
    })
      .then((response) => {
        setLoading(false); // Set loading to false when request finishes

        // Handle unauthorized error (401 status)
        if (response.error === "HTTP error! Status: 401") {
          swal("Session Expired! Please login again.", {
            buttons: {
              Okay: true,
            },
          }).then((value) => {
            switch (value) {
              case "Okay":
                setUser(null);
                sessionStorage.removeItem("IsLoggedIn");
                navigate("/"); // Navigate to login screen
                break;
            }
          });
          return;
        }

        // Handle other server-related errors
        if (response.error) {
          swal("Server stopped responding, Please try again later.", {
            buttons: {
              Okay: true,
            },
          }).then((value) => {
            switch (value) {
              case "Okay":
                navigate("/dashboard");
                break;
            }
          });
          return;
        }

        // Handle successful response
        if (response !== null) {
          if (response.ResponseCode === "00") {
            let message;
            if (deviceid !== "null") {
              message = `Your Job ${String(
                JobID
              )} has been successfully sent for execution on all underlying assigned devices.`;
            } else {
              message = `Your Job ${String(
                JobID
              )} has been successfully sent for execution on all underlying assigned devices.`;
            }

            navigate("/SuccessScreen", {
              state: {
                message,
                heading: "Job Execution",
              },
            });
          } else if (response.ResponseCode === "38") {
            swal("Job execution failed.", {
              buttons: {
                Okay: true,
              },
            }).then((value) => {
              switch (value) {
                case "Okay":
                  navigate("/dashboard");
                  break;
              }
            });
            return;
          } else if (
            response.ResponseCode === "36" ||
            response.ResponseCode === "37"
          ) {
            swal("Exception Occurred during job execution. Try again later", {
              buttons: {
                Okay: true,
              },
            }).then((value) => {
              switch (value) {
                case "Okay":
                  navigate("/dashboard");
                  break;
              }
            });
            return;
          }
        }
      })
      .catch((error) => {
        setLoading(false); // Set loading to false on error
        console.error("Failed to execute job:", error);

        // Handle network or other unexpected errors
        swal(
          "An error occurred while executing the job. Please try again later.",
          {
            buttons: {
              Okay: true,
            },
          }
        ).then((value) => {
          switch (value) {
            case "Okay":
              navigate("/dashboard");
              break;
          }
        });
      });
  };

  const DemoGetJobList = () => {
    setLoading(true);
    const data = DataFile.DemoGetJobList;
    setJobList(data);
    setLoading(false);
  }

  const getJobList = () => {
    setLoading(true);
    apiRequest("POST", `${apiURL}/JobController/GetJobsList`, {
      body: {
        assignedATMs: assignedATMs.map((atm) => atm.DeviceID), // Only DeviceID,
        UserID: state.user.UserID,
      },
      headers: {
        Authorization: "Bearer " + state?.user?.Token,
      },
    })
      .then((response) => {
        setLoading(false);

        if (response.error === "HTTP error! Status: 401") {
          swal("Session Expired! Please login again.", {
            buttons: { Okay: true },
          }).then(() => {
            sessionStorage.removeItem("IsLoggedIn");
            setUser(null);
            navigate("/");
          });
          return;
        }

        if (response.error) {
          swal("Server stopped responding. Please try again later.", {
            buttons: { Okay: true },
          });
          navigate("/dashboard");
          return;
        }

        if (response.ResponseCode === "00") {
          console.log(response.Data)
          setJobList(response.Data);
        } else {
          swal("Error received while fetching data, Please try again later.", {
            buttons: { Okay: true },
          }).then(() => {
            setJobList([]);
            navigate("/ActionCenter");
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Failed to fetch job list:", error);
        swal(
          "An error occurred while fetching the job list. Please try again later.",
          { buttons: { Okay: true } }
        );
      });
  };

  return (
    <>
      <TopBar heading={"Job Execution"} />
      <Paper sx={{ width: "100%", maxWidth: "100%", height: "100vh" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              overflowY: "auto",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <MenuList
          sx={{
            //display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 170px)",
            overflowY: "auto",
          }}
          >
            {jobList
              .filter((job) => parseInt(job.commandno) === 1)
              .map((job, index) => (
                <React.Fragment key={index}>
                  <MenuItem
                    sx={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      padding: "20px",
                    }}
                    disableRipple
                    onClick={() => handleOpenDialog(job.jobid.trim())}
                  >
                    <div style={{ flex: 1, color: "#838383" }}>
                      {`${job.jobid.trim()}`}
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        executeJob(job.jobid.trim());
                      }}
                      sx={{
                        backgroundColor: "#4197CB",
                        textTransform: "none",
                      }}
                      variant="contained"
                      size="small"
                    >
                      Execute
                    </Button>
                  </MenuItem>
                  {index < jobList.length - 1 && <Divider sx={{ my: 0.5 }} />}
                </React.Fragment>
              ))}
          </MenuList>
        )}
      </Paper>
      <Footer />
    </>
  );
};

export default ExecuteJobMenu;
