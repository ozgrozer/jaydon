import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ListRecords = props => {
  const { component } = props
  component.data = component.data || {}

  useEffect(() => {
    document.title = window.defaults.routes[`/${component.pluralId}`].title
  }, [])

  return (
    <div id='listRecords'>
      <div className='header'>
        <h1>{component.pluralTitle}</h1>

        {component.newButton ? (
          <Link
            to={`/${component.pluralId}/new`}
            className='btn btn-primary btn-lg'
          >
            New {component.singularTitle}
          </Link>
        ) : null}
      </div>

      <div className='content'>
        {Object.keys(component.data).length ? (
          Object.keys(component.data).map((key) => {
            const record = component.data[key]

            return (
              <Link
                key={key}
                className='list'
                to={`/${component.pluralId}/${record.id}`}
              >
                {record.title}
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
