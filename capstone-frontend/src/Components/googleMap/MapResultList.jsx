import React from 'react'
import Table from 'react-bootstrap/Table'
import Place from '../../Components/Place'
import { useState, useMemo } from 'react'
import Pagination from '../../utils/Pagination'

const MapResultList = (props) => {
  const { places } = props

  let PageSize = 3
  const [currentPageV2, setCurrentPageV2] = useState(1)
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPageV2 - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return places.slice(firstPageIndex, lastPageIndex)
  }, [currentPageV2, places])

  return (
    <div>
      <section className="table-top">
        <Table className="table table-striped table-hover table-responsive table-bordered table-light ">
          <thead>
            <tr className="table-row">
              <th>Name:</th>
              <th>Address:</th>
              <th>Rating:</th>
              <th>Currenty Open:</th>
              <th>Provided Icon:</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((place, index) => {
              return <Place key={index} place={place} />
            })}
          </tbody>
        </Table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPageV2}
          totalCount={places.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPageV2(page)}
        />
      </section>
    </div>
  )
}

export default MapResultList
