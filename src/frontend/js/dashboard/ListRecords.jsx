import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ListRecords = props => {
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
        {[1, 2, 3, 4, 5].map((key) => (
          <Link
            key={key}
            to={`/${props.id}/${key}`}
            className='button white list'
          >
            {props.id} {key}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ListRecords
