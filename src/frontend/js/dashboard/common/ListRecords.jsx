import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ListRecords = props => {
  const { component } = props
  const { link, singularTitle, pluralTitle, newButton, listingTitleReference } = component
  const data = component.data = component.data || {}

  useEffect(() => {
    document.title = window.defaults.routes[`/${link}`].title
  }, [])

  return (
    <div id='listRecords'>
      <div className='header'>
        <h1>{pluralTitle}</h1>

        {newButton ? (
          <Link
            to={`/${link}/new`}
            className='btn btn-primary btn-lg'
          >
            New {singularTitle}
          </Link>
        ) : null}
      </div>

      <div className='content'>
        {Object.keys(data).length ? (
          Object.keys(data).map((key) => {
            const record = data[key]
            const recordTitle = record[listingTitleReference]

            return (
              <Link
                key={key}
                className='box1 list'
                to={{
                  state: { key },
                  pathname: `/${link}/${record.id}`
                }}
              >
                {recordTitle}
              </Link>
            )
          })
        ) : (
          <div className='alert alert-secondary'>
            No record.
          </div>
        )}
      </div>
    </div>
  )
}

export default ListRecords
