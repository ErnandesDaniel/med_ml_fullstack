'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { useParams } from 'next/navigation'

import { store } from './core/store'

import {
    LoadingWrapper,
    MessageWrapper,
    ModalWrapper,
    PageWrapper,
} from './common/wrappers'

import CytologyView from './CytologyView/CytologyView'

export default function Page() {
    const params = useParams()
    const cytologyId = params.id as string

    return (
        <Provider store={store}>
            <LoadingWrapper>
                <MessageWrapper>
                    <ModalWrapper>
                        <PageWrapper>
                            <CytologyView
                                generalCytologyId={Number(cytologyId)}
                            />
                        </PageWrapper>
                    </ModalWrapper>
                </MessageWrapper>
            </LoadingWrapper>
        </Provider>
    )
}
