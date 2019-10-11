import React, { useEffect } from 'react'

import connectApi from './connectApi'
import ListRecords from './ListRecords'

const Domains = () => {
  const getDomains = async () => {
    const apiResults = await connectApi({
      meta: {
        category: 'domains',
        event: 'read'
      },
      data: {}
    })
    console.log(apiResults)
  }

  useEffect(() => {
    getDomains()
  }, [])

  return (
    <ListRecords
      id='domains'
      title='Domains'
      button='New Domain'
    />
  )
}

export default Domains
