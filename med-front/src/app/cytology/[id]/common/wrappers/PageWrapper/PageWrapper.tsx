import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'

import { useAppDispatch } from '@/app/cytology/[id]/core/hooks'
import { setToken } from '@/app/cytology/[id]/core/store'

interface PageWrapperProps {
    children: ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    const dispatch = useAppDispatch()

    const { data }: { data: (Session & { accessToken?: string }) | null } =
        useSession()
    // const data: { accessToken?: string } = {
    //     accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    // };

    useEffect(() => {
        dispatch(setToken(data?.accessToken))
    }, [data])

    return children
}

export default PageWrapper
