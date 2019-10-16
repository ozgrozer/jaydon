import React, { useEffect, useState } from 'react'
import { Form, Input } from 'rfv'

import connectApi from '~/src/frontend/js/dashboard/common/connectApi'
import validations from '~/src/common/validations'

const ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1)

const EditAndNewRecord = props => {
  const { component } = props
  const recordId = props.match.params.recordId
  const section = recordId === 'new' ? 'new' : 'edit'
  const sectionTitle = section === 'new' ? 'New' : 'Edit'
  let buttonTitle = section === 'new' ? 'Add' : 'Update'
  buttonTitle += ` ${component.singularTitle}`
  const formEvent = section === 'new' ? 'create' : 'update'
  const formName = formEvent + ucFirst(component.id)

  const [record, setRecord] = useState({})
  const readApi = async () => {
    const apiResults = await connectApi({
      meta: {
        category: component.id,
        event: 'read'
      },
      data: {
        id: recordId
      }
    })

    setRecord(apiResults.data)
  }

  useEffect(() => {
    document.title = sectionTitle + ' - ' + window.defaults.routes[`/${component.id}`].title

    if (section === 'edit') readApi()
  }, [])

  const onSubmit = async res => {
    if (res.isFormValid) {
      const apiResults = await connectApi({
        meta: {
          category: component.id,
          event: formEvent
        },
        data: res.items
      })

      if (apiResults.success) {
        props.history.push(`/${component.id}`)
      }
    }
  }

  const deleteRecord = async () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const apiResults = await connectApi({
        meta: {
          category: component.id,
          event: 'delete'
        },
        data: {
          id: recordId
        }
      })

      if (apiResults.success) {
        props.history.push(`/${component.id}`)
      }
    }
  }

  return (
    <div id='newRecord'>
      <div className='header'>
        <h1>{sectionTitle} {component.singularTitle}</h1>
      </div>

      <div className='content'>
        <div className='box1'>
          <div className='container1'>
            <Form onSubmit={onSubmit}>
              {component.form.items.map((formItem, key) => {
                return (
                  <div key={key} className='form-group'>
                    <Input
                      type='text'
                      name={formItem.name}
                      value={record[formItem.name]}
                      placeholder={formItem.placeholder}
                      className='form-control form-control-lg'
                      validations={validations[formName][formItem.name]}
                    />
                  </div>
                )
              })}

              <button className='btn btn-primary btn-lg btn-block'>
                {buttonTitle}
              </button>

              {section === 'edit' && (
                <Input
                  name='id'
                  type='hidden'
                  value={recordId}
                  validations={validations[formName].id}
                />
              )}
            </Form>

            {section === 'edit' && (
              <a
                onClick={deleteRecord}
                className='link text-danger mt1 d-inline-block'
              >
                Delete {component.singularTitle}?
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditAndNewRecord
