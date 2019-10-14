import React, { useEffect, useContext } from 'react'

import { MainContext } from './../context/MainContext'
import connectApi from './common/connectApi'
import ListRecords from './common/ListRecords'

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
    getDomains()
  }, [])

  const component = {
    id: 'domains',
    title: 'Domains',
    data: state.domains,
    button: 'New Domain'
  }

  return (
    <ListRecords
      {...props}
      component={component}
    />
  )
}

export default Domains
