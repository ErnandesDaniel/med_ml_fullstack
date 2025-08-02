import { Form, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useContext, useEffect } from 'react'
import { ModalContext } from '@/app/cytology/[id]/core/contexts'
import { useAppDispatch } from '@/app/cytology/[id]/core/hooks'
import { addNewGroupedType } from '@/app/cytology/[id]/core/store'
import { segmentsTranslated, SegmentType } from '@/app/cytology/[id]/core/types/segments'

type AddSegmentForm = {
    type: SegmentType
}

interface AddSegmentProps {
    options: SegmentType[]
}

const AddSegment: React.FC<AddSegmentProps> = ({ options }) => {
    const [form] = useForm<AddSegmentForm>()
    const { close, changeModalProps } = useContext(ModalContext)
    const dispatch = useAppDispatch()

    useEffect(() => {
        changeModalProps({
            title: 'Добавление нового типа сегментов',
            cancelText: 'Отменить',
            okText: 'Добавить',
            centered: true,
            onOk: form.submit,
        })
    }, [])

    const onSubmit = (values: AddSegmentForm) => {
        dispatch(addNewGroupedType(values.type))
        close()
    }

    return (
        <Form form={form} layout="horizontal" onFinish={onSubmit}>
            <Form.Item required name="type">
                <Select
                    placeholder="Выберите тип сегмента"
                    options={options.map((segType) => ({
                        value: segType,
                        label: `${segmentsTranslated[segType]} ${segType}`,
                    }))}
                ></Select>
            </Form.Item>
        </Form>
    )
}

export default AddSegment
