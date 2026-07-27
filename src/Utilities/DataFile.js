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
    // Keyed by DeviceID so each ATM shows its own details instead of one shared static record.
    DemoGetATMDataAgainstUser:
    {
        "ATM001": [
            [
                "Name: ATM001",
                "Branch Name: Karachi",
                "Location: Karachi",
                "Model No: NCR SelfServ 22",
                "Status: Link Down",
                "Last Tnx Time: 2026-03-18 09:01:02"
            ],
            [
                "Cash Remaining1: 12000",
                "Denomination1: 500",
                "Reject1: 0",
                "Filling Level1: 15.2",
                "Status1: Active",
                "Cash Remaining2: 8000",
                "Denomination2: 1000",
                "Reject2: 0",
                "Filling Level2: 9.4",
                "Status2: Active",
                "Cash Remaining3: 250000",
                "Denomination3: 5000",
                "Reject3: 1",
                "Filling Level3: 42",
                "Status3: Active",
                "Cash Remaining4: 60000",
                "Denomination4: 1000",
                "Reject4: 0",
                "Filling Level4: 30",
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
                "Host Communication Error: 1 - Host Communication Error                                                        ",
                "Journal Printer: 0 - Journal Printer                                                                 ",
                "Out of Cash: 0 - Out of Cash                                                                     ",
                "Receipt Printer: 0 - Receipt Printer                                                                 ",
                "Supervisory Mode: 0 - Supervisory Mode                                                                "
            ]
        ],
        "ATM002": [
            [
                "Name: ATM002",
                "Branch Name: Lahore",
                "Location: Lahore",
                "Model No: Wincor Nixdorf ProCash 280",
                "Status: Link Down",
                "Last Tnx Time: 2026-03-17 18:22:41"
            ],
            [
                "Cash Remaining1: 30000",
                "Denomination1: 500",
                "Reject1: 0",
                "Filling Level1: 28.5",
                "Status1: Active",
                "Cash Remaining2: 45000",
                "Denomination2: 1000",
                "Reject2: 0",
                "Filling Level2: 33.1",
                "Status2: Active",
                "Cash Remaining3: 400000",
                "Denomination3: 5000",
                "Reject3: 0",
                "Filling Level3: 70",
                "Status3: Active",
                "Cash Remaining4: 80000",
                "Denomination4: 1000",
                "Reject4: 1",
                "Filling Level4: 40",
                "Status4: Active"
            ],
            [
                "Description: Intel64 Family 6 Model 158 Stepping 10",
                "Name: Intel(R) Core(TM) i5-8500 CPU @ 3.00GHz",
                "No Of Cores: 6",
                "HDD Capacity: 250058792448",
                "Partitions: 3",
                "MAC Address: 00-14-22-01-23-45"
            ],
            [
                "Card Reader: 0 - Card Reader                                                                     ",
                "Cash Dispenser: 0 - Cash Dispenser                                                                  ",
                "Host Communication Error: 1 - Host Communication Error                                                        ",
                "Journal Printer: 0 - Journal Printer                                                                 ",
                "Out of Cash: 0 - Out of Cash                                                                     ",
                "Receipt Printer: 0 - Receipt Printer                                                                 ",
                "Supervisory Mode: 0 - Supervisory Mode                                                                "
            ]
        ],
        "ATM003": [
            [
                "Name: ATM003",
                "Branch Name: Karachi",
                "Location: Karachi",
                "Model No: NCR SelfServ 22",
                "Status: Active",
                "Last Tnx Time: 2026-03-21 14:05:12"
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
                "Journal Printer: 0 - Journal Printer                                                                 ",
                "Out of Cash: 0 - Out of Cash                                                                     ",
                "Receipt Printer: 0 - Receipt Printer                                                                 ",
                "Supervisory Mode: 0 - Supervisory Mode                                                                "
            ]
        ],
        "ATM004": [
            [
                "Name: ATM004",
                "Branch Name: Islamabad",
                "Location: Islamabad",
                "Model No: Diebold Opteva 522",
                "Status: Supervisory Mode",
                "Last Tnx Time: 2026-03-20 11:47:03"
            ],
            [
                "Cash Remaining1: 20000",
                "Denomination1: 500",
                "Reject1: 0",
                "Filling Level1: 18.0",
                "Status1: Active",
                "Cash Remaining2: 15000",
                "Denomination2: 1000",
                "Reject2: 0",
                "Filling Level2: 11.2",
                "Status2: Active",
                "Cash Remaining3: 350000",
                "Denomination3: 5000",
                "Reject3: 0",
                "Filling Level3: 60",
                "Status3: Active",
                "Cash Remaining4: 40000",
                "Denomination4: 1000",
                "Reject4: 0",
                "Filling Level4: 22",
                "Status4: Active"
            ],
            [
                "Description: Intel64 Family 6 Model 165 Stepping 5",
                "Name: Intel(R) Core(TM) i7-10700 CPU @ 2.90GHz",
                "No Of Cores: 8",
                "HDD Capacity: 1000204886016",
                "Partitions: 4",
                "MAC Address: 00-1B-44-11-3A-B7"
            ],
            [
                "Card Reader: 0 - Card Reader                                                                     ",
                "Cash Dispenser: 0 - Cash Dispenser                                                                  ",
                "Host Communication Error: 0 - Host Communication Error                                                        ",
                "Journal Printer: 0 - Journal Printer                                                                 ",
                "Out of Cash: 0 - Out of Cash                                                                     ",
                "Receipt Printer: 0 - Receipt Printer                                                                 ",
                "Supervisory Mode: 1 - Supervisory Mode                                                                "
            ]
        ],
        "ATM005": [
            [
                "Name: ATM005",
                "Branch Name: Karachi",
                "Location: Karachi",
                "Model No: NCR SelfServ 34",
                "Status: Supervisory Mode",
                "Last Tnx Time: 2026-03-19 16:30:55"
            ],
            [
                "Cash Remaining1: 5000",
                "Denomination1: 500",
                "Reject1: 2",
                "Filling Level1: 4.1",
                "Status1: Active",
                "Cash Remaining2: 10000",
                "Denomination2: 1000",
                "Reject2: 0",
                "Filling Level2: 7.6",
                "Status2: Active",
                "Cash Remaining3: 150000",
                "Denomination3: 5000",
                "Reject3: 0",
                "Filling Level3: 25",
                "Status3: Active",
                "Cash Remaining4: 20000",
                "Denomination4: 1000",
                "Reject4: 0",
                "Filling Level4: 12",
                "Status4: Active"
            ],
            [
                "Description: Intel64 Family 6 Model 94 Stepping 3",
                "Name: Intel(R) Core(TM) i5-7500 CPU @ 3.40GHz",
                "No Of Cores: 4",
                "HDD Capacity: 500105249280",
                "Partitions: 4",
                "MAC Address: 00-1A-2B-3C-4D-5E"
            ],
            [
                "Card Reader: 0 - Card Reader                                                                     ",
                "Cash Dispenser: 0 - Cash Dispenser                                                                  ",
                "Host Communication Error: 0 - Host Communication Error                                                        ",
                "Journal Printer: 0 - Journal Printer                                                                 ",
                "Out of Cash: 0 - Out of Cash                                                                     ",
                "Receipt Printer: 0 - Receipt Printer                                                                 ",
                "Supervisory Mode: 1 - Supervisory Mode                                                                "
            ]
        ],
        "ATM006": [
            [
                "Name: ATM006",
                "Branch Name: Karachi",
                "Location: Karachi",
                "Model No: NCR SelfServ 22",
                "Status: Out of Cash",
                "Last Tnx Time: 2026-03-21 08:12:47"
            ],
            [
                "Cash Remaining1: 0",
                "Denomination1: 500",
                "Reject1: 0",
                "Filling Level1: 0",
                "Status1: Empty",
                "Cash Remaining2: 0",
                "Denomination2: 1000",
                "Reject2: 0",
                "Filling Level2: 0",
                "Status2: Empty",
                "Cash Remaining3: 100000",
                "Denomination3: 5000",
                "Reject3: 0",
                "Filling Level3: 20",
                "Status3: Active",
                "Cash Remaining4: 10000",
                "Denomination4: 1000",
                "Reject4: 0",
                "Filling Level4: 5",
                "Status4: Active"
            ],
            [
                "Description: Intel64 Family 6 Model 94 Stepping 3",
                "Name: Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz",
                "No Of Cores: 4",
                "HDD Capacity: 500105249280",
                "Partitions: 4",
                "MAC Address: 00-2C-3D-4E-5F-60"
            ],
            [
                "Card Reader: 0 - Card Reader                                                                     ",
                "Cash Dispenser: 0 - Cash Dispenser                                                                  ",
                "Host Communication Error: 0 - Host Communication Error                                                        ",
                "Journal Printer: 0 - Journal Printer                                                                 ",
                "Out of Cash: 1 - Out of Cash                                                                     ",
                "Receipt Printer: 0 - Receipt Printer                                                                 ",
                "Supervisory Mode: 0 - Supervisory Mode                                                                "
            ]
        ],
        "ATM007": [
            [
                "Name: ATM007",
                "Branch Name: Lahore",
                "Location: Lahore",
                "Model No: Wincor Nixdorf ProCash 280",
                "Status: Out of Cash",
                "Last Tnx Time: 2026-03-20 22:03:19"
            ],
            [
                "Cash Remaining1: 0",
                "Denomination1: 500",
                "Reject1: 0",
                "Filling Level1: 0",
                "Status1: Empty",
                "Cash Remaining2: 3000",
                "Denomination2: 1000",
                "Reject2: 0",
                "Filling Level2: 2.2",
                "Status2: Active",
                "Cash Remaining3: 200000",
                "Denomination3: 5000",
                "Reject3: 0",
                "Filling Level3: 35",
                "Status3: Active",
                "Cash Remaining4: 0",
                "Denomination4: 1000",
                "Reject4: 0",
                "Filling Level4: 0",
                "Status4: Empty"
            ],
            [
                "Description: Intel64 Family 6 Model 158 Stepping 10",
                "Name: Intel(R) Core(TM) i5-8500 CPU @ 3.00GHz",
                "No Of Cores: 6",
                "HDD Capacity: 250058792448",
                "Partitions: 3",
                "MAC Address: 00-71-82-93-A4-B5"
            ],
            [
                "Card Reader: 0 - Card Reader                                                                     ",
                "Cash Dispenser: 0 - Cash Dispenser                                                                  ",
                "Host Communication Error: 0 - Host Communication Error                                                        ",
                "Journal Printer: 0 - Journal Printer                                                                 ",
                "Out of Cash: 1 - Out of Cash                                                                     ",
                "Receipt Printer: 0 - Receipt Printer                                                                 ",
                "Supervisory Mode: 0 - Supervisory Mode                                                                "
            ]
        ],
        "ATM123456": [
            [
                "Name: ATM123456",
                "Branch Name: Clifton",
                "Location: Karachi",
                "Model No: NCR SelfServ 84",
                "Status: Active",
                "Last Tnx Time: 2026-03-21 15:07:46"
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
        ]
    },

    ///CommandExecutionController/GetSystemInfo
    // Keyed by DeviceID so System Info matches the selected ATM instead of always showing ATM123456.
    DemoFetchSystemInfo :
    {
        "ATM001": { "ATMID": "ATM001", "Name": "Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz", "Description": "Intel64 Family 6 Model 94 Stepping 3", "NoofCores": 4, "HDDsize": "500105249280", "SerialNo": null, "Partition": "4", "MACAddress": "00-01-2E-A7-57-64", "LastUpdated": "2026-03-18T09:05:00.00" },
        "ATM002": { "ATMID": "ATM002", "Name": "Intel(R) Core(TM) i5-8500 CPU @ 3.00GHz", "Description": "Intel64 Family 6 Model 158 Stepping 10", "NoofCores": 6, "HDDsize": "250058792448", "SerialNo": null, "Partition": "3", "MACAddress": "00-14-22-01-23-45", "LastUpdated": "2026-03-17T18:25:00.00" },
        "ATM003": { "ATMID": "ATM003", "Name": "Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz", "Description": "Intel64 Family 6 Model 94 Stepping 3", "NoofCores": 4, "HDDsize": "500105249280", "SerialNo": null, "Partition": "4", "MACAddress": "00-01-2E-A7-57-64", "LastUpdated": "2026-03-21T14:10:00.00" },
        "ATM004": { "ATMID": "ATM004", "Name": "Intel(R) Core(TM) i7-10700 CPU @ 2.90GHz", "Description": "Intel64 Family 6 Model 165 Stepping 5", "NoofCores": 8, "HDDsize": "1000204886016", "SerialNo": null, "Partition": "4", "MACAddress": "00-1B-44-11-3A-B7", "LastUpdated": "2026-03-20T11:50:00.00" },
        "ATM005": { "ATMID": "ATM005", "Name": "Intel(R) Core(TM) i5-7500 CPU @ 3.40GHz", "Description": "Intel64 Family 6 Model 94 Stepping 3", "NoofCores": 4, "HDDsize": "500105249280", "SerialNo": null, "Partition": "4", "MACAddress": "00-1A-2B-3C-4D-5E", "LastUpdated": "2026-03-19T16:35:00.00" },
        "ATM006": { "ATMID": "ATM006", "Name": "Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz", "Description": "Intel64 Family 6 Model 94 Stepping 3", "NoofCores": 4, "HDDsize": "500105249280", "SerialNo": null, "Partition": "4", "MACAddress": "00-2C-3D-4E-5F-60", "LastUpdated": "2026-03-21T08:15:00.00" },
        "ATM007": { "ATMID": "ATM007", "Name": "Intel(R) Core(TM) i5-8500 CPU @ 3.00GHz", "Description": "Intel64 Family 6 Model 158 Stepping 10", "NoofCores": 6, "HDDsize": "250058792448", "SerialNo": null, "Partition": "3", "MACAddress": "00-71-82-93-A4-B5", "LastUpdated": "2026-03-20T22:05:00.00" },
        "ATM123456": { "ATMID": "ATM123456", "Name": "Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz", "Description": "Intel64 Family 6 Model 94 Stepping 3", "NoofCores": 4, "HDDsize": "500105249280", "SerialNo": null, "Partition": "4", "MACAddress": "00-01-2E-A7-57-64", "LastUpdated": "2025-02-27T16:58:37.23" }
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

    // Keyed by DeviceID so Last Transaction matches the selected ATM.
    DemoFetchLastTransaction:{
        "ATM001": { "DeviceID": "ATM001", "UserID": null, "Trxn_type": "Withdrawal", "Trxn_date": "3/18/2026", "Trxn_time": "09:01:02 A.M.", "Status": "Completed" },
        "ATM002": { "DeviceID": "ATM002", "UserID": null, "Trxn_type": "Balance Inquiry", "Trxn_date": "3/17/2026", "Trxn_time": "06:22:41 P.M.", "Status": "Completed" },
        "ATM003": { "DeviceID": "ATM003", "UserID": null, "Trxn_type": "Withdrawal", "Trxn_date": "3/21/2026", "Trxn_time": "02:05:12 P.M.", "Status": "Completed" },
        "ATM004": { "DeviceID": "ATM004", "UserID": null, "Trxn_type": "Deposit", "Trxn_date": "3/20/2026", "Trxn_time": "11:47:03 A.M.", "Status": "Failed" },
        "ATM005": { "DeviceID": "ATM005", "UserID": null, "Trxn_type": "Withdrawal", "Trxn_date": "3/19/2026", "Trxn_time": "04:30:55 P.M.", "Status": "Completed" },
        "ATM006": { "DeviceID": "ATM006", "UserID": null, "Trxn_type": "Withdrawal", "Trxn_date": "3/21/2026", "Trxn_time": "08:12:47 A.M.", "Status": "Failed" },
        "ATM007": { "DeviceID": "ATM007", "UserID": null, "Trxn_type": "Withdrawal", "Trxn_date": "3/20/2026", "Trxn_time": "10:03:19 P.M.", "Status": "Failed" },
        "ATM123456": { "DeviceID": "ATM123456", "UserID": null, "Trxn_type": "Withdrawal", "Trxn_date": "3/18/2026", "Trxn_time": "09:01:02 A.M.", "Status": "Completed" }
    },

    ///ReportsController/GetReportDetails (per report-type demo data, keyed by report title)
    // Each key matches a card title in pages/Reports.js so a report actually shows data/columns relevant to its own title.
    DemoReportDataByTitle: {
        "Cash Outage": [
            { "DeviceID": "ATM006", "BranchName": "Karachi", "OutageStart": "2026-03-21 08:12:47", "OutageEnd": null, "DurationMinutes": null, "Reason": "Cassette Empty" },
            { "DeviceID": "ATM007", "BranchName": "Lahore", "OutageStart": "2026-03-20 22:03:19", "OutageEnd": "2026-03-21 06:15:00", "DurationMinutes": 491, "Reason": "Cassette Empty" },
            { "DeviceID": "ATM005", "BranchName": "Karachi", "OutageStart": "2026-03-19 16:30:55", "OutageEnd": "2026-03-19 18:02:10", "DurationMinutes": 91, "Reason": "Low Cash Reject" }
        ],
        "Downtime": [
            { "DeviceID": "ATM001", "BranchName": "Karachi", "DownStart": "2026-03-18 09:01:02", "DownEnd": null, "DurationMinutes": null, "Cause": "Link Down" },
            { "DeviceID": "ATM002", "BranchName": "Lahore", "DownStart": "2026-03-17 18:22:41", "DownEnd": "2026-03-17 20:05:00", "DurationMinutes": 102, "Cause": "Link Down" }
        ],
        "Dispenser Outage": [
            { "DeviceID": "ATM006", "BranchName": "Karachi", "OutageStart": "2026-03-21 08:12:47", "ErrorCode": "E-05", "Status": "Open" },
            { "DeviceID": "ATM007", "BranchName": "Lahore", "OutageStart": "2026-03-20 22:03:19", "ErrorCode": "E-05", "Status": "Resolved" }
        ],
        "Power Outage": [
            { "DeviceID": "ATM004", "BranchName": "Islamabad", "PowerFailTime": "2026-03-20 11:40:00", "PowerRestoreTime": "2026-03-20 12:15:00", "DurationMinutes": 35 },
            { "DeviceID": "ATM003", "BranchName": "Karachi", "PowerFailTime": "2026-03-15 03:20:00", "PowerRestoreTime": "2026-03-15 03:52:00", "DurationMinutes": 32 }
        ],
        "Supervisory Mode": [
            { "DeviceID": "ATM004", "BranchName": "Islamabad", "EnteredAt": "2026-03-20 11:47:03", "ExitedAt": null, "DurationMinutes": null },
            { "DeviceID": "ATM005", "BranchName": "Karachi", "EnteredAt": "2026-03-19 16:30:55", "ExitedAt": "2026-03-19 17:10:00", "DurationMinutes": 39 }
        ],
        "Incident Escalation": [
            { "DeviceID": "ATM123456", "IncidentID": "205500", "Classification": "Out of Cash", "EscalatedTo": "Field Engineer", "EscalatedAt": "2026-03-21T15:20:00", "Status": "Opened" },
            { "DeviceID": "ATM123456", "IncidentID": "205504", "Classification": "Receipt Printer", "EscalatedTo": "Vendor Support", "EscalatedAt": "2026-03-26T13:45:00", "Status": "Opened" }
        ],
        "User Status": [
            { "LOGINID": "abasit01", "GROUPED": "user", "PASSWORD_EXPIRE_DATE": "2023-08-21 00:00:00", "LAST_PASSWORD_CHANGE": "2023-05-23 15:57:35", "LAST_ACTIVE_STATUS": "2024-07-10 15:16:29", "STATUS": "UnLocked" },
            { "LOGINID": "admin", "GROUPED": "user", "PASSWORD_EXPIRE_DATE": "2024-04-16 15:38:37", "LAST_PASSWORD_CHANGE": "2024-01-17 15:38:37", "LAST_ACTIVE_STATUS": "2024-12-12 15:14:57", "STATUS": "UnLocked" }
        ],
        "Last Transaction": [
            { "DeviceID": "ATM001", "TrxnType": "Withdrawal", "TrxnDate": "3/18/2026", "TrxnTime": "09:01:02 A.M.", "Status": "Completed" },
            { "DeviceID": "ATM003", "TrxnType": "Withdrawal", "TrxnDate": "3/21/2026", "TrxnTime": "02:05:12 P.M.", "Status": "Completed" },
            { "DeviceID": "ATM004", "TrxnType": "Deposit", "TrxnDate": "3/20/2026", "TrxnTime": "11:47:03 A.M.", "Status": "Failed" }
        ]
    }
}
export default DataFile

