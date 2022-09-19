import React, { useRef, useState } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, InputRef, message } from 'antd';
import { useNavigate } from 'react-router';
import { reqLogin, reqRegister } from '../../api/user';
import { useDispatch } from 'react-redux'
import { changeCookie } from '../../store/features/cookie';
import { loginType } from '../../models/user';
export default function Login() {

  const dispatch = useDispatch()

  // 改变登录和注册控制开关
  const [ifshow, setifshow] = useState(true);
  const password = useRef<InputRef>(null)
  const userName = useRef<InputRef>(null)
  // 路由跳转hook

  // 路由hook
  let navigate = useNavigate()

  // 登录方法
  async function Login() {
    try {
      const result = await reqLogin<loginType>({
        password: password.current!.input!.value,
        name: userName.current!.input!.value,
      })
      if (result.status) {
        localStorage.setItem("name", result.data.userName!)
        localStorage.setItem('userInfo', JSON.stringify(result.data.Info))
        // 动态路由切换
        dispatch(changeCookie())
        navigate("../home/chat", { replace: true })
        message.success('登录成功');
      }
    } catch (error) {
      message.error('用户名或密码错误');
    }
  }
  // 回车确定
  function handleEnter(e: any) {
    if (e.key === 'Enter') {
      Login();
    }

  }
  // 注册方法
  async function Register() {
    const result = await reqRegister({
      password: password.current!.input!.value,
      name: userName.current!.input!.value,
    })
    if (result.status) {
      setifshow(true)
      message.success('注册成功');

    } else {
      message.error('该用户名已被使用');
    }
  }

  return (
    <div className=" flex flex-col w-3/5 m-auto  " >
      <div className=" flex m-auto mb-8 select-none">
        <div className="text-3xl pr-5 border-r-2" style={{ color: ifshow ? '#33b4de' : '#000' }} onClick={() => setifshow(true)}>登录</div>
        <div className="text-3xl ml-5" style={{ color: ifshow ? '#000' : '#33b4de' }} onClick={() => { setifshow(false) }}>注册</div>
      </div>
      {
        ifshow ? (
          <div>
            <div className=" mb-8">
              <Input ref={userName} size="large" placeholder="请输入账号" prefix={<UserOutlined />} />
              <Input.Password ref={password} size="large" onKeyDown={e => handleEnter(e)} placeholder="请输入密码" prefix={<LockOutlined />} />
            </div>
            <div className=" w-full flex justify-around select-none">
              <div onClick={Login} className=' bg-bili  w-56 h-12  rounded-lg text-center leading-12 text-xl text-white hover:bg-biho cursor-pointer'>登录</div>

              <div className=' bg-while border  w-56 h-12  rounded-lg text-center leading-12 text-xl hover:border-biho cursor-pointer'>忘记密码</div>

            </div>
          </div>) : (
          <div>
            <div className=" mb-8">
              <Input ref={userName} size="large" placeholder="请输入用户名" prefix={<UserOutlined />} />
              <Input.Password ref={password} size="large" placeholder="请输入密码" prefix={<LockOutlined />} />
            </div>
            <div className=" w-full flex justify-around select-none">
              <div onClick={Register} className=' bg-bili  w-56 h-12  rounded-lg text-center leading-12 text-xl text-white hover:bg-biho cursor-pointer'>注册</div>

            </div>
          </div>
        )
      }

    </div >
  )
}
