import React, { useState, useEffect, useContext } from 'react'
import { Table } from 'antd'

import { ModalContext } from '@cytology/core/contexts'

import {
    ICytologyInfoCellCharacteristics,
    ICytologyInfoClusterCharacteristics,
} from '@cytology/core/types/cytology'

import { characteristicsDict, columns, TableItem } from './props'

import './CharacteristicsTable.css'

type CombinedCharacteristics = ICytologyInfoCellCharacteristics &
    ICytologyInfoClusterCharacteristics

interface CharacteristicsTableProps {
    characteristics: CombinedCharacteristics
}

const CharacteristicsTable: React.FC<CharacteristicsTableProps> = ({
    characteristics,
}) => {
    const [tableData, setTableData] = useState<TableItem[]>([])
    const { changeModalProps } = useContext(ModalContext)

    useEffect(() => {
        changeModalProps({
            title: 'Результаты исследования',
            footer: [],
            centered: true,
            width: '70%',
        })
    }, [])

    useEffect(() => {
        const fieldNames = Object.keys(characteristics) as Array<
            keyof CombinedCharacteristics
        >

        const tableData: TableItem[] = fieldNames.map((fieldName, id) => {
            const fieldValue = characteristics[fieldName]
            const fieldMeta = characteristicsDict[fieldName]

            const baseItem: Omit<TableItem, 'references' | 'status'> = {
                id,
                name: fieldMeta.name,
                result: fieldValue,
            }

            if (fieldMeta.ref) {
                const { normStart, normEnd } = fieldMeta
                const isNormal =
                    fieldValue >= normStart && fieldValue <= normEnd
                let status: 0 | 1 | 2 = isNormal ? 0 : 1

                if (!isNormal) {
                    const deviation =
                        fieldValue < normStart
                            ? normStart - fieldValue
                            : fieldValue - normEnd
                    status = deviation >= 40 ? 2 : 1
                }

                return {
                    ...baseItem,
                    references: [normStart, normEnd] as [number, number],
                    status,
                }
            }

            return {
                ...baseItem,
                references: [0, 0] as [number, number],
                status: 1,
            }
        })

        setTableData(tableData)
    }, [characteristics])

    const rowClassName = (record: TableItem) => {
        switch (record.status) {
            case 0:
                return 'row-normal'
            case 1:
                return 'row-warning'
            case 2:
                return 'row-error'
            default:
                return ''
        }
    }

    return (
        <Table
            className="characteristics-table"
            columns={columns}
            dataSource={tableData}
            rowClassName={rowClassName}
            pagination={false}
            rowHoverable={false}
            rowKey="id"
        />
    )
}

export default CharacteristicsTable
