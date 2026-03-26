const DataFile = {

    Demo: true,
    
    // /Dashboard/GetATMsAgainstUserID
    DemoDashboardGetATMDataAgainstUser : [
    {
        "DeviceID": "ATM001",
        "BranchName": "Karachi",
        "DeviceBinState": "10000000000000",
        "IndicesOfOnes": "14",
        "Bit": 14,
        "Prio": 1,
        "MessageText": "Link Down",
        "HierName": "Karachi",
        "CategoryText": "Offline - Not Connected",
        "DisplayOrder": 1
    },
    {
        "DeviceID": "ATM002",
        "BranchName": "Lahore",
        "DeviceBinState": "10000000000000",
        "IndicesOfOnes": "14",
        "Bit": 14,
        "Prio": 1,
        "MessageText": "Link Down",
        "HierName": "Lahore",
        "CategoryText": "Offline - Not Connected",
        "DisplayOrder": 1
    },
    {
        "DeviceID": "ATM003",
        "BranchName": "Karachi",
        "DeviceBinState": null,
        "IndicesOfOnes": "0",
        "Bit": null,
        "Prio": null,
        "MessageText": "No Message Found                                                            ",
        "HierName": "Karachi",
        "CategoryText": "No Category Text",
        "DisplayOrder": 0
    },
    {
        "DeviceID": "ATM004",
        "BranchName": "Islamabad",
        "DeviceBinState": null,
        "IndicesOfOnes": "1",
        "Bit": 13,
        "Prio": null,
        "MessageText": "Supervisory Mode",
        "HierName": "Islamabad",
        "CategoryText": "No Category Text",
        "DisplayOrder": 0
    },
    {
        "DeviceID": "ATM005",
        "BranchName": "Karachi",
        "DeviceBinState": null,
        "IndicesOfOnes": "1",
        "Bit": 13,
        "Prio": null,
        "MessageText": "Supervisory Mode",
        "HierName": "Karachi",
        "CategoryText": "No Category Text",
        "DisplayOrder": 0
    },
    {
        "DeviceID": "ATM123456",
        "BranchName": "Karachi",
       "DeviceBinState": null,
        "IndicesOfOnes": "0",
        "Bit": null,
        "Prio": null,
        "MessageText": "No Message Found                                                                ",
        "HierName": "Karachi",
        "CategoryText": "No Category Text",
        "DisplayOrder": 0
    }, 
    {
        "DeviceID": "ATM006",
        "BranchName": "Karachi",
        "DeviceBinState": null,
        "IndicesOfOnes": "5",
        "Bit": 5,
        "Prio": null,
        "MessageText": "Out of Cash                                                                ",
        "HierName": "Karachi",
        "CategoryText": "No Category Text",
        "DisplayOrder": 0
    },
    {
        "DeviceID": "ATM007",
        "BranchName": "Lahore",
       "DeviceBinState": null,
        "IndicesOfOnes": "5",
        "Bit": 5,
        "Prio": null,
        "MessageText": "Out of Cash                                                                ",
        "HierName": "Lahore",
        "CategoryText": "No Category Text",
        "DisplayOrder": 0
    }
],

    DemoLogin : {
        username:"Mubashir",
        password:"admin"
    },

    ///Authentication/login
    DemologinResponse : {
        "IsMobileAppUser": "Y",
        "Password": "4NY08PI8s575lYrkExK5NA==",
        "ResponseCode": "00",
        "ResponseMessage": null,
        "DeviceID": "220e83df6e757bc0",
        "IsAccLocked": false,
        "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im1zb2hhaWwwMiIsImp0aSI6ImM4Njc3NTE4LTA3ZDUtNDVmYS05MWJjLWZlNzU1NTNkNTRmMCIsIm5iZiI6MTc0NTIyNDQ1OSwiZXhwIjoxNzQ1MjI2MjU5LCJpYXQiOjE3NDUyMjQ0NTksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0In0.4joLvoW7HCAI1QqC-TSmDl1eQFJukG0gNXKMYZ6cEgo",
        "UserID": "Mubashir",
        "FirstName": "Mubashir Khan",
        "LastName": "Khan",
        "PlayerID": null,
        "LastLogin": "2025-04-21T13:21:44.64",
        "IsDisabled": false,
        "IsAppLocked": false,
        "IsEditAllowed": true,
        "IsApproved": true,
        "AccountType": "Admin",
        "Ldap": true
    },

    ///IncidentController/GetIncidentsInfo
    DemoGetIncidentDetails : [
        {
            "UserID": null,
            "DeviceID": "ATM12345        ",
            "StartTime": "2026-03-21T15:07:46",
            "EndTime": null,
            "Classif": 1,
            "Pmid": "Outofcash                                    ",
            "Status": "Opened",
            "RepNumber": "205500"
        },
        {
            "UserID": null,
            "DeviceID": "ATM123456       ",
            "StartTime": "2026-03-25T15:17:06",
            "EndTime": "2026-04-15T11:45:44",
            "Classif": 1,
            "Pmid": "Journalprinter                               ",
            "Status": "Closed",
            "RepNumber": "205501"
        },
        {
            "UserID": null,
            "DeviceID": "ATM123456       ",
            "StartTime": "2025-04-15T16:39:08",
            "EndTime": "2025-04-15T16:41:09",
            "Classif": 1,
            "Pmid": "Outofcash                                    ",
            "Status": "Closed",
            "RepNumber": "205510"
        },
        {
            "UserID": null,
            "DeviceID": "ATM123456       ",
            "StartTime": "2026-03-26T13:32:06",
            "EndTime": null,
            "Classif": 1,
            "Pmid": "Receiptprinter                               ",
            "Status": "Opened",
            "RepNumber": "205504"
        }
    ],

    ///ATMDetailsController/GetATMDetails
    DemoGetATMDataAgainstUser:
    [
        [
            "Name: ATM123456",
            "Branch Name: Clifton",
            "Location: Karachi",
            "Model No: Details Not Found",
            "Status: Active",
            "Last Tnx Time: Details Not Found"
        ],
        [
            "Cash Remaining1: 48000",
            "Denomination1: 500",
            "Reject1: 1",
            "Filling Level1: 40.8",
            "Status1: Active",
            "Cash Remaining2: 55000",
            "Denomination2: 1000",
            "Reject2: 1",
            "Filling Level2: 20.75",
            "Status2: Active",
            "Cash Remaining3: 500000",
            "Denomination3: 5000",
            "Reject3: 0",
            "Filling Level3: 85",
            "Status3: Active",
            "Cash Remaining4: 100000",
            "Denomination4: 1000",
            "Reject4: 0",
            "Filling Level4: 50",
            "Status4: Active"
        ],
        [
            "Description: Intel64 Family 6 Model 94 Stepping 3",
            "Name: Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz",
            "No Of Cores: 4",
            "HDD Capacity: 500105249280",
            "Partitions: 4",
            "MAC Address: 00-01-2E-A7-57-64"
        ],
        [
            "Card Reader: 0 - Card Reader                                                                     ",
            "Cash Dispenser: 0 - Cash Dispenser                                                                  ",
            "Host Communication Error: 0 - Host Communication Error                                                        ",
            "Journal Printer: 1 - Journal Printer                                                                 ",
            "Out of Cash: 0 - Out of Cash                                                                     ",
            "Receipt Printer: 1 - Receipt Printer                                                                 ",
            "Supervisory Mode: 0 - Supervisory Mode                                                                "
        ]
    ],

    ///CommandExecutionController/GetSystemInfo
    DemoFetchSystemInfo : 
    {
        "ATMID": "ATM123456",
        "Name": "Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz",
        "Description": "Intel64 Family 6 Model 94 Stepping 3",
        "NoofCores": 4,
        "HDDsize": "500105249280",
        "SerialNo": null,
        "Partition": "4",
        "MACAddress": "00-01-2E-A7-57-64",
        "LastUpdated": "2025-02-27T16:58:37.23"
    },

    ///CommandExecutionController/GetCassetteCounters
    DemoGetLiveCassetteCounters:
    [
        "Cash Remaining1: 48000",
        "Denomination1: 500",
        "Reject1: 1",
        "Filling Level1: 40.8",
        "Status1: Active",
        "Cash Remaining2: 100000",
        "Denomination2: 1000",
        "Reject2: 0",
        "Filling Level2: 85",
        "Status2: Active",
        "Cash Remaining3: 55000",
        "Denomination3: 1000",
        "Reject3: 1",
        "Filling Level3: 20.75",
        "Status3: Active",
        "Cash Remaining4: 5000000",
        "Denomination4: 5000",
        "Reject4: 0",
        "Filling Level4: 50",
        "Status4: Active"
    ],

    ///JobController/GetJobsList
    DemoGetJobList:[
        {
            "rownum": 1,
            "UserID": null,
            "jobid": "Agent Update      ",
            "description": "Reboot Device",
            "commandno": "1",
            "deviceID": null,
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": null,
            "timestamp": null
        },
        {
            "rownum": 2,
            "UserID": null,
            "jobid": "Daily_EJ          ",
            "description": "c:\\proagent\\data\\jorunal.dat,$UPLOADDIR$Journal\\\\\\$ADDDEVICE$jorunal.dat",
            "commandno": "1",
            "deviceID": null,
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": null,
            "timestamp": null
        },
        {
            "rownum": 3,
            "UserID": null,
            "jobid": "Disable ADA       ",
            "description": "C:\\\\,$UPLOADDIR$C:\\\\\\$ADDDEVICE$$ADDDATE$",
            "commandno": "1",
            "deviceID": null,
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": null,
            "timestamp": null
        },
        {
            "rownum": 5,
            "UserID": null,
            "jobid": "iEngage Banner    ",
            "description": "RBM Password Execution",
            "commandno": "1",
            "deviceID": null,
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": null,
            "timestamp": null
        },
        {
            "rownum": 7,
            "UserID": null,
            "jobid": "iEngage Banner    ",
            "description": "Reboot Device",
            "commandno": "3",
            "deviceID": null,
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": null,
            "timestamp": null
        },
        {
            "rownum": 8,
            "UserID": null,
            "jobid": "iEngage Banner    ",
            "description": "restartbatch.bat",
            "commandno": "4",
            "deviceID": null,
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": null,
            "timestamp": null
        },
        {
            "rownum": 9,
            "UserID": null,
            "jobid": "iEngage Banner    ",
            "description": "$UpdateIMSAgent$Check.zip",
            "commandno": "5",
            "deviceID": null,
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": null,
            "timestamp": null
        },
        {
            "rownum": 10,
            "UserID": null,
            "jobid": "iEngage Banner    ",
            "description": "c:\\\\,$UPLOADDIR$abc\\",
            "commandno": "6",
            "deviceID": null,
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": null,
            "timestamp": null
        },
        {
            "rownum": 19,
            "UserID": null,
            "jobid": "Zakat screens     ",
            "description": "RBM Password Execution",
            "commandno": "1",
            "deviceID": null,
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": null,
            "timestamp": null
        }
    ],

    ///JobController/GetJobResults
    DemoGetJobResultsAgainstUser:[
        {
            "rownum": 0,
            "UserID": null,
            "jobid": "Agent Update      ",
            "description": null,
            "commandno": "1",
            "deviceID": "ATM0146                                              ",
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": "1",
            "timestamp": "2025-04-21T16:37:00"
        },
        {
            "rownum": 0,
            "UserID": null,
            "jobid": "Agent Update      ",
            "description": null,
            "commandno": "1",
            "deviceID": "ATM15185                                             ",
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": "1",
            "timestamp": "2025-04-21T16:37:00"
        },
        {
            "rownum": 0,
            "UserID": null,
            "jobid": "Agent Update      ",
            "description": null,
            "commandno": "1",
            "deviceID": "Abc123                                            ",
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": "2",
            "timestamp": "2025-04-21T16:37:00"
        },
        {
            "rownum": 0,
            "UserID": null,
            "jobid": "iEngage Bannar",
            "description": null,
            "commandno": "1",
            "deviceID": "ATM0001                                           ",
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": "1",
            "timestamp": "2025-04-21T16:37:00"
        },
        {
            "rownum": 0,
            "UserID": null,
            "jobid": "Daily_EJ",
            "description": null,
            "commandno": "1",
            "deviceID": "ATM00021                                          ",
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": "2",
            "timestamp": "2025-04-21T16:37:00"
        },
        {
            "rownum": 0,
            "UserID": null,
            "jobid": "Agent Update      ",
            "description": null,
            "commandno": "1",
            "deviceID": "ATM12345                                          ",
            "ResponseCode": null,
            "ResponseMessage": null,
            "Result": "0",
            "timestamp": "2025-04-21T16:37:00"
        }
    ],

    ///ATMDetailsController/GetReportDetails
    ReportData: [
        {
            "LOGINID": "abasit01",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2023-08-21 00:00:00",
            "LAST_PASSWORD_CHANGE": "2023-05-23 15:57:35",
            "LAST_ACTIVE_STATUS": "2024-07-10 15:16:29",
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "admin",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2024-04-16 15:38:37",
            "LAST_PASSWORD_CHANGE": "2024-01-17 15:38:37",
            "LAST_ACTIVE_STATUS": "2024-12-12 15:14:57",
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "Admin123",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2024-02-15 20:17:38",
            "LAST_PASSWORD_CHANGE": "2023-11-17 20:17:38",
            "LAST_ACTIVE_STATUS": null,
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "admin2",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2024-03-13 18:26:21",
            "LAST_PASSWORD_CHANGE": "2023-12-14 18:26:21",
            "LAST_ACTIVE_STATUS": "2023-12-15 12:36:23",
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "aed",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2024-05-01 15:50:14",
            "LAST_PASSWORD_CHANGE": "2024-02-01 15:50:14",
            "LAST_ACTIVE_STATUS": "2024-02-01 15:58:25",
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "aislam",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": null,
            "LAST_PASSWORD_CHANGE": "2024-07-25 14:21:04",
            "LAST_ACTIVE_STATUS": "2024-10-11 17:30:14",
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "Asultan",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2025-01-25 15:09:20",
            "LAST_PASSWORD_CHANGE": "2024-10-18 15:09:20",
            "LAST_ACTIVE_STATUS": null,
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "asurahio",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": null,
            "LAST_PASSWORD_CHANGE": "2023-12-13 17:11:46",
            "LAST_ACTIVE_STATUS": "2024-01-31 16:13:45",
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "awahid",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2023-12-25 00:00:00",
            "LAST_PASSWORD_CHANGE": "2023-10-18 12:53:07",
            "LAST_ACTIVE_STATUS": "2024-07-30 16:53:17",
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "DB",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2024-06-24 01:21:53",
            "LAST_PASSWORD_CHANGE": "2024-03-26 01:21:53",
            "LAST_ACTIVE_STATUS": "2024-03-26 01:21:58",
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "erf",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2024-08-24 18:43:09",
            "LAST_PASSWORD_CHANGE": "2024-07-24 18:43:09",
            "LAST_ACTIVE_STATUS": null,
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "ery",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2024-02-12 13:23:44",
            "LAST_PASSWORD_CHANGE": "2023-11-06 16:07:35",
            "LAST_ACTIVE_STATUS": null,
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "gfh",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2024-02-12 16:41:58",
            "LAST_PASSWORD_CHANGE": "2023-11-14 16:42:10",
            "LAST_ACTIVE_STATUS": null,
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "hakram",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2024-06-03 16:18:36",
            "LAST_PASSWORD_CHANGE": "2024-03-05 16:18:38",
            "LAST_ACTIVE_STATUS": "2024-03-05 16:23:32",
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "haroon",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2024-10-20 12:50:14",
            "LAST_PASSWORD_CHANGE": "2024-07-22 12:50:14",
            "LAST_ACTIVE_STATUS": "2024-08-01 18:51:32",
            "STATUS": "UnLocked"
        },
        {
            "LOGINID": "Hasnain",
            "GROUPED": "user                ",
            "PASSWORD_EXPIRE_DATE": "2024-02-12 13:23:44",
            "LAST_PASSWORD_CHANGE": "2023-11-04 22:20:50",
            "LAST_ACTIVE_STATUS": "2023-11-04 22:19:55",
            "STATUS": "UnLocked"
        },

    ],

    ///AlertsController/GetUserNotifications
    DemoGetUserNotifications:
    [
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Journal Printer Failed at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-18T15:33:21.86",
            "IsRead": false
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Cash Dispenser Operational at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-18T15:31:19.03",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "msohail02",
            "IssueSubject": "Testing",
            "IssueLocation": null,
            "Description": "Testing Settings Option",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-18T15:10:48.943",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "msohail02",
            "IssueSubject": "Testing",
            "IssueLocation": null,
            "Description": "Testing Settings Option",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-18T15:10:46.183",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "msohail02",
            "IssueSubject": "Testing",
            "IssueLocation": null,
            "Description": "Testing Settings Option",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-18T15:10:43.02",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "msohail02",
            "IssueSubject": "ExecuteJob",
            "IssueLocation": null,
            "Description": "Job Execution Successful: Daily_ej",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T12:15:16.76",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Card Reader Failed at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T12:10:01.79",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Cash Dispenser Operational at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T12:09:10.927",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Cash Dispenser Failed at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T12:08:40.317",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "msohail02",
            "IssueSubject": "ExecuteJob",
            "IssueLocation": null,
            "Description": "Job Execution Successful: Disable ADA",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T11:26:51.073",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Supervisory Mode Operational at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T11:25:30.29",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Out Of Cash Operational at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T11:25:19.89",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Out Of Cash Failed at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T11:24:19.157",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Supervisory Mode Failed at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T11:23:28.453",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Journal Printer Operational at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T11:22:57.847",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Journal Printer Failed at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T11:22:27.37",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Card Reader Operational at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T11:21:56.88",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Card Reader Failed at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T11:21:26.367",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Cash Dispenser Operational at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T11:19:55.503",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Cash Dispenser Failed at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-15T11:19:14.94",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Journal Printer Operational at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-14T18:03:09.653",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Journal Printer Failed at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-14T18:02:38.983",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Card Reader Operational at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-14T18:01:07.39",
            "IsRead": true
        },
        {
            "AlertID": 0,
            "AtmID": null,
            "UserID": "Msohail02",
            "IssueSubject": "ATM Status Update",
            "IssueLocation": null,
            "Description": "Card Reader Failed at ATM123456",
            "CreatedAt": "0001-01-01T00:00:00",
            "SentAt": "2025-04-14T18:00:25.743",
            "IsRead": true
        }
    ],

    DemoFetchLastTransaction:{
            "DeviceID": null,
            "UserID": null,
            "Trxn_type": "Withdrawal",
            "Trxn_date": "3/18/2026",
            "Trxn_time": "09:01:02 A.M.",
            "Status": "Completed",
        }
}
export default DataFile

