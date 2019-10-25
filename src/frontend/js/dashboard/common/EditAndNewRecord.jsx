import React, { useEffect, useState } from 'react'
import { Form, Input } from 'rfv'

import notification from '~/src/frontend/js/common/notification'
import connectApi from '~/src/frontend/js/dashboard/common/connectApi'
import validations from '~/src/common/validations'

const ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1)

const FormItem = props => {
  const { formItem, record, formName } = props

  const formItemId = `${formName}-${formItem.name}`

  if (formItem.element === 'input') {
    if (formItem.type === 'checkbox') {
      return (
        <div className='form-group'>
          <div className='custom-control custom-checkbox'>
            <Input
              id={formItemId}
              name={formItem.name}
              type={formItem.type}
              className='form-control custom-control-input'
              validations={validations[formName][formItem.name]}
            />
            <label
              htmlFor={formItemId}
              className='custom-control-label'
            >
              {formItem.label}
            </label>
          </div>
        </div>
      )
    } else {
      return (
        <div className='form-group'>
          <Input
            name={formItem.name}
            type={formItem.type}
            value={record[formItem.name]}
            placeholder={formItem.placeholder}
            className='form-control form-control-lg'
            validations={validations[formName][formItem.name]}
          />
        </div>
      )
    }
  }
}

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

  const [formIsSubmitting, setFormIsSubmitting] = useState(false)
  const onSubmit = async res => {
    if (res.isFormValid) {
      setFormIsSubmitting(true)

      const apiResults = await connectApi({
        meta: {
          category: component.id,
          event: formEvent
        },
        data: res.items
      })

      setFormIsSubmitting(false)

      if (apiResults.success) {
        props.history.push(`/${component.id}`)

        const message = section === 'new'
          ? 'Domain added'
          : 'Domain updated'

        notification({
          type: 'success',
          message
        })
      } else {
        notification({
          type: 'danger',
          message: apiResults.error
        })
      }
    }
  }

  const deleteRecord = async () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setFormIsSubmitting(true)

      const apiResults = await connectApi({
        meta: {
          category: component.id,
          event: 'delete'
        },
        data: {
          id: recordId
        }
      })

      setFormIsSubmitting(false)

      if (apiResults.success) {
        props.history.push(`/${component.id}`)

        notification({
          type: 'success',
          message: 'Domain deleted'
        })
      } else {
        notification({
          type: 'danger',
          message: apiResults.error
        })
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
            <Form className='form1' onSubmit={onSubmit}>
              <fieldset disabled={formIsSubmitting}>
                {component.form.items.map((formItem, key) => {
                  return (
                    <FormItem
                      key={key}
                      record={record}
                      formItem={formItem}
                      formName={formName}
                    />
                  )
                })}

                <button className='btn btn-primary btn-lg btn-block mt1'>
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
              </fieldset>
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
