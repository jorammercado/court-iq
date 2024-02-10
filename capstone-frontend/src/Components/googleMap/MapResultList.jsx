import React from "react";
import Table from "react-bootstrap/Table"
import Place from "../../Components/Place"
import { useState, useMemo } from "react";
import Pagination from "../../utils/Pagination";
import { Button } from "bootstrap";

const MapResultList = ( props) => {
  const {places,handleSortPlaces}=props
  console.log(props)
  
  //const [items, setItems] = useState(places)
  // console.log(places)
  let PageSize = 3
  const [currentPageV2, setCurrentPageV2] = useState(1)
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPageV2 - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return places.slice(firstPageIndex, lastPageIndex)
  }, [currentPageV2, places])
  const [placesOrder, setPlacesOrder] = useState(false);

  const changePlaceOrder = () => {
    if (placesOrder === false) {
      setPlacesOrder(true)
      const newPlacesOrder = places.sort((a, b) => {
        if (Number(a.rating) < Number(b.rating))
          return -1
        else if (Number(a.rating) > Number(b.rating))
          return 1
        else
          return 0
      })
      handleSortPlaces(newPlacesOrder)
    }
    else {
      setPlacesOrder(false)
      const newPlacesOrder = places.sort((b, a) => {
        if (Number(a.rating) > Number(b.rating))
          return -1
        else if (Number(a.rating) < Number(b.rating))
          return 1
        else
          return 0
      })
      handleSortPlaces(newPlacesOrder)
    }
  }

  const handleSortPlacesFunc = event => {
    event.preventDefault()
    changePlaceOrder()
  }

  return (
    <div>
      <section className="table-top">
        <Table className="table table-striped table-hover table-responsive table-bordered table-light " >
          <thead>
            <tr className="table-row">
              <th >
                Name:
              </th>
              <th >
                Address:
              </th>
              <th >
                <button className="btn btn-secondary btn-sm" onClick={handleSortPlacesFunc}>
                  {` \u21f3`}Rating
                </button>
              </th>
              <th >
                Currenty Open:
              </th>
              <th >
                Provided Icon:
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((place, index) => {

              return (
                <Place
                  key={index}
                  place={place}
                />
              )
            })}
          </tbody>
        </Table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPageV2}
          totalCount={places.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPageV2(page)}
        />
      </section>
    </div>
  );
};

export default MapResultList;
