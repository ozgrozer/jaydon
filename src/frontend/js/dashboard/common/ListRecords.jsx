import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ListRecords = props => {
  const { component } = props
  component.data = component.data || {}

  useEffect(() => {
    document.title = window.defaults.routes[`/${component.id}`].title
  }, [])

  return (
    <div id={component.id}>
      <div className='header'>
        <h1>{component.title}</h1>

        {component.button ? (
          <Link
            to={`/${component.id}/new`}
            className='btn btn-primary btn-lg'
          >
            {component.button}
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
                to={`/${component.id}/${record.id}`}
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
