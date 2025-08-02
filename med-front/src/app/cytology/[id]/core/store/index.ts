import { type RootState, type AppDispatch, store } from './store'
import { setToken } from './slices/auth.slice'
import {
    setCytologyInfo,
    setCytologyId,
    setEditedCytologyInfo,
} from './slices/cytology.slice'
import { setToolPanelHeight } from './slices/ref.slice'
import {
    setCurrentSegment,
    setSegmentsStack,
    addNewSegmentToStack,
    editPointSegment,
    setInitSegments,
    addNewGroupedType,
    markAsUnDeleted,
    markAsDeleted,
} from './slices/segment.slice'
import {
    setError,
    addLoading,
    removeLoading,
    removeAllLoadings,
} from './slices/context.slice'

export { RootState, AppDispatch, store }

export { setToken }
export { setCytologyInfo, setCytologyId, setEditedCytologyInfo }
export { setToolPanelHeight }
export {
    setCurrentSegment,
    setSegmentsStack,
    addNewSegmentToStack,
    editPointSegment,
    setInitSegments,
    markAsDeleted,
    markAsUnDeleted,
    addNewGroupedType,
}
export { setError, addLoading, removeLoading, removeAllLoadings }
