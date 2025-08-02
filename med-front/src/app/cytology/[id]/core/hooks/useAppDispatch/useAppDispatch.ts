import { useDispatch } from "react-redux";

import type { AppDispatch } from "@cytology/core/store";

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
