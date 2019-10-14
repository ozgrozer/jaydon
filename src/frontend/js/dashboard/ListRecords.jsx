import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ListRecords = props => {
  let { data } = props
  data = data || {}

  useEffect(() => {
    document.title = window.defaults.routes[`/${props.id}`].title
  }, [])

  return (
    <div id={props.id}>
      <div className='header'>
        <h1>{props.title}</h1>

        {props.button ? (
          <Link
            to={`/${props.id}/new`}
            className='btn btn-primary btn-lg'
          >
            {props.button}
          </Link>
        ) : null}
      </div>

      <div className='content'>
        {Object.keys(data).length ? (
          Object.keys(data).map((key) => {
            const record = data[key]

            return (
              <Link
                key={key}
                className='list'
                to={`/${props.id}/${record.id}`}
              >
                {record.title}
              </Link>
            )
          })
        ) : (
          <div>No record.</div>
        )}
      </div>
    </div>
  )
}

export default ListRecords
