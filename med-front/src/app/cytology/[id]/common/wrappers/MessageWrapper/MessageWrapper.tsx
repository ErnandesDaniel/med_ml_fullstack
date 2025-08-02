import { message } from 'antd'
import { useEffect, type ReactNode } from 'react'

import { MessageContext } from '@/app/cytology/[id]/core/contexts'
import { useAppDispatch, useAppSelector } from '@/app/cytology/[id]/core/hooks'
import { setError } from '@/app/cytology/[id]/core/store'

interface MessageWrapperProps {
    children: ReactNode
}

const MessageWrapper: React.FC<MessageWrapperProps> = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage()
    const error = useAppSelector((state) => state.context.error)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (error) {
            messageApi.error(error)
            dispatch(setError(undefined))
        }
    }, [error, messageApi])

    return (
        <MessageContext.Provider value={{ messageApi }}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    )
}

export default MessageWrapper
