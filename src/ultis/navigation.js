import {
     AiOutlineLogin,
     AiOutlineUserAdd,
     AiOutlineUser,
     AiOutlineHome,
     AiFillSetting
} from 'react-icons/ai'
export const DASHBOARD_SIDEBAR_LINKS = [
     {
          key: "home",
          label: "HOME",
          path: '/',
          icon: <AiOutlineHome />
     },
     {
          key: "login",
          label: "LOGIN",
          path: '/login',
          icon: <AiOutlineLogin />
     },
     {
          key: "register",
          label: "REGISTER",
          path: '/register',
          icon: <AiOutlineUserAdd />
     },
     {
          key: "user",
          label: "USER",
          path: '/dashboard',
          icon: <AiOutlineUser />
     },
]
export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
     {
          key: "setting",
          label: "SETTING",
          path: '/setting',
          icon: <AiFillSetting />
     },
]