import { FC } from 'react'
import { observer } from 'mobx-react'

import { PersonsStore } from './personsStore'
import { PersonsTable } from './personsTable'
import { PersonsFilterForm } from './personsFilterForm'
import { PersonsCharts } from './personsCharts'

const store = new PersonsStore()

export const PersonsList: FC = observer(() => {
  if (store.isLoading) {
    return 'Loading...'
  }

  // TODO: We passing `store` to all components via props.
  // It might be better to pass `store` through the React context.
  return (
    <>
      <h1>Persons</h1>
      <PersonsFilterForm store={store} />
      <PersonsTable store={store} />
      <PersonsCharts store={store} />
    </>
  )
})
