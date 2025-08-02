import { useDispatch } from 'react-redux'

import type { AppDispatch } from '@/app/cytology/[id]/core/store'

const useAppDispatch = () => useDispatch<AppDispatch>()

export default useAppDispatch
