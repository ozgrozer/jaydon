import React, { useEffect, useContext } from 'react'
import { Form, Input } from 'rfv'

import { MainContext } from '~/src/frontend/js/context/MainContext'
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
  let formName = section === 'new' ? 'create' : 'edit'
  formName += ucFirst(component.id)
  const formEvent = section === 'new' ? 'create' : 'update'

  const { setState } = useContext(MainContext)

  useEffect(() => {
    document.title = sectionTitle + ' - ' + window.defaults.routes[`/${component.id}`].title
  }, [])

  const onSubmit = async res => {
    if (res.isFormValid) {
      const apiResults = await connectApi({
        meta: {
          category: component.id,
          event: formEvent
        },
        data: {
          domain: res.items.domain
        }
      })

      console.log(apiResults)
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
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditAndNewRecord
