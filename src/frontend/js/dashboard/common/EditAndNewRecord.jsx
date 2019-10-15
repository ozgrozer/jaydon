import React, { useEffect } from 'react'

const EditAndNewRecord = props => {
  const { component } = props
  const recordId = props.match.params.recordId
  const section = recordId === 'new' ? 'new' : 'edit'
  const sectionTitle = section === 'new' ? 'New' : 'Edit'

  useEffect(() => {
    document.title = sectionTitle + ' - ' + window.defaults.routes[`/${component.pluralId}`].title
  }, [])

  return (
    <div id='newRecord'>
      <div className='header'>
        <h1>{sectionTitle} {component.singularTitle}</h1>
      </div>

      <div className='content'>
        <div className='box1'>
          test
        </div>
      </div>
    </div>
  )
}

export default EditAndNewRecord
