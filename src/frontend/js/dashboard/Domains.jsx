import React, { useEffect, useContext } from 'react'

import { MainContext } from '~/src/frontend/js/context/MainContext'
import connectApi from '~/src/frontend/js/dashboard/common/connectApi'
import Page from '~/src/frontend/js/dashboard/common/Page'

const Domains = props => {
  const category = 'domain'
  const link = 'domains'
  const listingTitleReference = 'domain'
  const singularTitle = 'Domain'
  const pluralTitle = 'Domains'

  const { state, setState } = useContext(MainContext)

  const getRecords = async () => {
    const apiResults = await connectApi({
      meta: {
        category,
        event: 'read'
      },
      data: {}
    })

    const domain = apiResults.data
    setState({ domain })
  }

  useEffect(() => {
    if (props.location.pathname === `/${link}`) getRecords()
  }, [props.location.pathname])

  const component = {
    category,
    link,
    singularTitle,
    pluralTitle,
    newButton: true,
    listingTitleReference,
    data: state.domain,
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
