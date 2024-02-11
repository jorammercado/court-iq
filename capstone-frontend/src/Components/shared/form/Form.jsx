import React from "react";
import FormControlGroup from "./FormControlGroup";
import Pagination from "../../../utils/Pagination"
import { useState, useMemo } from "react";
import "./Form.css";
/* 
 `inputRef` prop is for extending search functionality in the future
  GoogleMaps API interacts dirrectly with DOM elements in many cases
 As a result we don't want to have this managed by React State
*/


const Form = ({ handleSubmit, inputRef }) => {
  const [searchButtons, setSearchButtons] = useState(["place holder"]);

  let PageSize = 5;
  const [currentPageV2, setCurrentPageV2] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPageV2 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return searchButtons.slice(firstPageIndex, lastPageIndex);
  }, [currentPageV2, searchButtons]);

  return (
    <div className="top">
      <form onSubmit={handleSubmit}>
        <FormControlGroup buttonList={currentTableData} handleClick={handleSubmit} />
        <Pagination
          className="pagination-bar"
          currentPage={currentPageV2}
          totalCount={searchButtons.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPageV2(page)}
        />
        <br />
        <label>
          <input ref={inputRef} className="input" name="input" />
        </label>
        <button className="btn btn-dark btn-md fixed" type="submit">Search</button>
      </form>
    </div>
  );
};

export default Form;
