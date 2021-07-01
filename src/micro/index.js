import { registerMicroApps, start } from 'qiankun'
import { apps } from './app'

// 注册子应用函数，包装成高阶函数，方便后期如果有参数注入修改app配置
export const registerApp = () => registerMicroApps(apps)

// 导出 qiankun 的启动函数
export default start
