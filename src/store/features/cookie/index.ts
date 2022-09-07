import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from '../../../utils/cookie'

export const cookieSlice = createSlice({
  name: 'cookie',
  initialState: {
    value: getCookie('connect.sid')
  },
  reducers: {
    changeCookie: (state) => {
      state.value = getCookie('connect.sid')
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { changeCookie } = cookieSlice.actions

export default cookieSlice.reducer