import React, { useEffect, useContext } from 'react'

import { MainContext } from '~/src/frontend/js/context/MainContext'
import connectApi from '~/src/frontend/js/dashboard/common/connectApi'
import Page from '~/src/frontend/js/dashboard/common/Page'

const Domains = props => {
  const { state, setState } = useContext(MainContext)

  const getDomains = async () => {
    const apiResults = await connectApi({
      meta: {
        category: 'domains',
        event: 'read'
      },
      data: {}
    })

    const domains = {}
    Object.keys(apiResults.data).map((key) => {
      const data = apiResults.data[key]
      domains[key] = data
      domains[key].title = domains[key].domain
      delete domains[key].domain
    })

    setState({ domains })
  }

  useEffect(() => {
    if (props.location.pathname === '/domains') getDomains()
  }, [props.location.pathname])

  const component = {
    id: 'domains',
    singularTitle: 'Domain',
    pluralTitle: 'Domains',
    newButton: true,
    data: state.domains,
    form: {
      items: [
        { element: 'input', type: 'text', name: 'domain', placeholder: 'Domain (example.com)' },
        { element: 'input', type: 'checkbox', name: 'gitSupport', label: 'Git support' },
        { section: 'edit', element: 'box', type: 'secondary', name: 'gitSupportDetails' }
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
