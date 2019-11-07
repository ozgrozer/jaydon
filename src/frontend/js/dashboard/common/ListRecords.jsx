import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ListRecords = props => {
  const { component } = props
  component.data = component.data || {}
  const componentLink = component.link

  useEffect(() => {
    document.title = window.defaults.routes[`/${componentLink}`].title
  }, [])

  return (
    <div id='listRecords'>
      <div className='header'>
        <h1>{component.pluralTitle}</h1>

        {component.newButton ? (
          <Link
            to={`/${componentLink}/new`}
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
            const recordTitle = record[component.listTitleReference]

            return (
              <Link
                key={key}
                className='box1 list'
                to={{
                  state: { key },
                  pathname: `/${componentLink}/${record.id}`
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
