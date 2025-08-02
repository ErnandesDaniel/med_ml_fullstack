import { Spin } from 'antd'
import { useEffect, useState, type ReactNode } from 'react'

import { LoadingContext } from '@cytology/core/contexts'
import { useAppDispatch, useAppSelector } from '@cytology/core/hooks'
import {
    addLoading,
    removeAllLoadings,
    removeLoading,
} from '@cytology/core/store'

import './LoadingWrapper.css'

interface LoadingWrapperProps {
    children: ReactNode
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const loadingStack = useAppSelector((state) => state.context.isLoading)
    const dispatch = useAppDispatch()

    useEffect(() => {}, [loadingStack])

    const start = (action: string) => {
        dispatch(addLoading(action))
    }

    const stop = (action: string) => {
        dispatch(removeLoading(action))
    }

    const stopAll = () => {
        dispatch(removeAllLoadings())
    }

    useEffect(() => {
        if (Object.keys(loadingStack).length > 0) {
            setLoading(true)
        } else {
            setTimeout(() => setLoading(false), 250)
        }
    }, [loadingStack])

    return (
        <LoadingContext.Provider value={{ start, stop, stopAll }}>
            <Spin fullscreen spinning={loading} rootClassName="spinner" />
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingWrapper
