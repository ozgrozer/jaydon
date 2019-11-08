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
          label: 'Command',
          element: 'input',
          type: 'text',
          name: 'command',
          placeholder: '/usr/bin/node ~/script.js'
        },
        {
          section: 'all',
          label: 'Schedule',
          element: 'input',
          type: 'text',
          name: 'schedule',
          placeholder: '* * * * * (m h d m d)'
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
