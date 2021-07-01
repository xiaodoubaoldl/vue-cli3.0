// 应用之间通信
import { initGlobalState } from 'qiankun'

const initialState = { actions: null, data: null }
const actions = initGlobalState(initialState)

export default actions
