import React, { useEffect, useState } from 'react'

import connectApi from './common/connectApi'
import ListRecords from './common/ListRecords'

const Domains = () => {
  const [domains, setDomains] = useState({})

  const getDomains = async () => {
    const apiResults = await connectApi({
      meta: {
        category: 'domains',
        event: 'read'
      },
      data: {}
    })

    const _domains = {}
    Object.keys(apiResults.data).map((key) => {
      const data = apiResults.data[key]
      _domains[key] = data
      _domains[key].title = _domains[key].domain
      delete _domains[key].domain
    })
    setDomains(_domains)
  }

  useEffect(() => {
    getDomains()
  }, [])

  return (
    <ListRecords
      id='domains'
      data={domains}
      title='Domains'
      button='New Domain'
    />
  )
}

export default Domains
