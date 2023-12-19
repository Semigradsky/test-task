import { FC, useMemo } from 'react'
import { observer } from 'mobx-react'
import { action } from 'mobx';
import { Button, Table, TableColumnType } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { formatCurrency } from 'shared/formatters'

import { Person, PersonsStore } from './personsStore'

const Bio = styled.p({
  whiteSpace: 'pre-line',
})

type Props = {
  store: PersonsStore;
}

export const PersonsTable: FC<Props> = observer(({ store }) => {
  const columns = useMemo<TableColumnType<Person>[]>(() => [
    ...baseColumns,
    {
      width: 10,
      render: (_value, record) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={action((event) => {
            event.stopPropagation() // Prevent of toggling row
            store.removePerson(record)
          })}
        />
      ),
    },
  ], [store])

  const dataSource = store.filteredPersons.map((person) => person.toJSON())

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey='id'
      expandable={{
        showExpandColumn: false,
        expandRowByClick: true,
        expandedRowRender({ bio }) {
          return (
            <Bio>
              <b>Bio:</b> {bio}
            </Bio>
          )
        },
      }}
    />
  )
})

const baseColumns: TableColumnType<Person>[] = [
  {
    dataIndex: 'sex',
    width: 10,
    render: (value) => value === 'male' ? '👨': '👩',
  },
  {
    title: 'Full name',
    dataIndex: 'fullName',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    render: (value) => formatCurrency(value),
    sorter: (a, b) => a.salary - b.salary,
    showSorterTooltip: true
  },
]
