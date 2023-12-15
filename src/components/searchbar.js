import React from "react";

class SearchBar extends React.Component {
    render() {
        const { filterKeyword, handleInputChange, handleFilter, handleReset, handleSort, placeholderText, sort } = this.props;
        const containerStyle = {
            display: "flex",
            alignItems: "center",
          };
        const inputStyle = {
            flex: "1",
            padding: "5px",
            borderRadius: "4px",
            border: "2px solid #ccc",
        };
        const buttonStyle = {
            marginLeft: "5px",
            padding: "5px",
            borderRadius: "4px",
            border: "2px solid #ccc",
        }
  
      
        return (
          <>
            <div style={containerStyle}>
              <input type="text" value={filterKeyword} onChange={handleInputChange} placeholder={placeholderText} style={inputStyle} />
              <button style={buttonStyle} onClick={handleFilter}>
                Filter
              </button>
              <button style={buttonStyle} onClick={handleReset}>
                Reset
              </button>
              {sort !== "false" && (
                  <button style={buttonStyle} onClick={handleSort}>
                    Sort
                  </button>
                )}
            </div>
          </>
        );
        }
      }
      
export default SearchBar;