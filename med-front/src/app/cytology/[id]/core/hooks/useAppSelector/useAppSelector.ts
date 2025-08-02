import { TypedUseSelectorHook, useSelector } from 'react-redux'

import type { RootState } from '@cytology/core/store'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector
