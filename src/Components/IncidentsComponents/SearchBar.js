import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

function SearchBar() {
  return (
    <div style={{ margin: "20px", display: "flex", justifyContent: "center" }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          style: {
            borderRadius: "25px",
            padding: "5px",
            width: "100%",
            maxWidth: "400px",
          },
        }}
      />
    </div>
  );
}

export default SearchBar;
