import React, { useEffect, useContext } from 'react'

import { MainContext } from '~/src/frontend/js/context/MainContext'
import connectApi from '~/src/frontend/js/dashboard/common/connectApi'
import Page from '~/src/frontend/js/dashboard/common/Page'

const CronJobs = props => {
  const category = 'cronJob'
  const link = 'cron-jobs'
  const listingTitleReference = 'command'
  const singularTitle = 'Cron Job'
  const pluralTitle = 'Cron Jobs'

  const { state, setState } = useContext(MainContext)

  const getRecords = async () => {
    const apiResults = await connectApi({
      meta: {
        category,
        event: 'read'
      },
      data: {}
    })

    setState({
      [category]: apiResults.data
    })
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
    data: state[category],
    form: {
      items: [
        {
          section: 'all',
          element: 'input',
          type: 'text',
          name: 'command',
          placeholder: 'Command'
        },
        {
          section: 'all',
          element: 'input',
          type: 'text',
          name: 'interval',
          placeholder: 'Interval'
        }
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

export default CronJobs
