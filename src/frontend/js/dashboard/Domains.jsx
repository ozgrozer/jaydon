import React, { useEffect, useContext } from 'react'

import { MainContext } from '~/src/frontend/js/context/MainContext'
import connectApi from '~/src/frontend/js/dashboard/common/connectApi'
import Page from '~/src/frontend/js/dashboard/common/Page'

const Domains = props => {
  const { state, setState } = useContext(MainContext)

  const getRecords = async () => {
    const apiResults = await connectApi({
      meta: {
        category: 'domains',
        event: 'read'
      },
      data: {}
    })

    const domains = apiResults.data
    setState({ domains })
  }

  useEffect(() => {
    if (props.location.pathname === '/domains') getRecords()
  }, [props.location.pathname])

  const component = {
    id: 'domains',
    singularTitle: 'Domain',
    pluralTitle: 'Domains',
    newButton: true,
    listTitleReference: 'domain',
    data: state.domains,
    form: {
      items: [
        {
          section: 'all',
          element: 'input',
          type: 'text',
          name: 'domain',
          placeholder: 'Domain (example.com)'
        },
        {
          section: 'all',
          element: 'input',
          type: 'checkbox',
          name: 'gitSupport',
          label: 'Git support',
          helpButtonTargetReference: 'gitSupportDetails'
        }/* ,
        {
          section: 'all',
          element: 'input',
          type: 'checkbox',
          name: 'sslSupport',
          label: 'SSL support'
        } */
      ]
    }
  }

  return (
    <Page
      {...props}
      component={component}
    />
  )
}

export default Domains
