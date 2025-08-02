import { TypedUseSelectorHook, useSelector } from 'react-redux'

import type { RootState } from '@/app/cytology/[id]/core/store'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector
