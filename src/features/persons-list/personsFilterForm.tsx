import { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { observer } from 'mobx-react';

import { PersonsStore } from './personsStore';

type Props = {
  store: PersonsStore;
}

export const PersonsFilterForm: FC<Props> = observer(({ store }) => {
  const [form] = Form.useForm<{ filterString: string | undefined }>()
  const filterString = Form.useWatch('filterString', form)

  useEffect(() => {
    if (filterString !== undefined) {
      store.filterBy(filterString)
    }
  }, [store, filterString])

  return (
    <Form form={form}>
      <Form.Item name="filterString" label="Filter">
        <Input />
      </Form.Item>
    </Form>
  )
})
