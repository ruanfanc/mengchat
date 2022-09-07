import React, { useEffect } from 'react'
import { Avatar } from 'antd';
import { UserOutlined, CommentOutlined, TeamOutlined } from '@ant-design/icons'
import { NavLink, Outlet } from 'react-router-dom';
import { navStyle } from '../../models/user';
import { reqDirectLogin, reqlogout } from '../../api/user';
import socket from '../../socket/index';

export default function Home() {


    let defaultStyle: navStyle = {
        fontSize: '20px', color: '#ccc'
    }
    let activeStyle: navStyle = {
        fontSize: '20px', color: 'skyblue'
    }
    // 登出方法
    let logoutListener = () => {
        reqlogout()
    }
    async function directLogin() {
        const name = localStorage.getItem('name')!
        await reqDirectLogin(name)
        socket.connect()
    }
    useEffect(() => {
        // 已经登录有cookie直接登录
        directLogin()
        // 浏览器关闭时退出登录状态
        window.addEventListener('beforeunload', logoutListener);
        return () => {
            reqlogout()
            window.removeEventListener('beforeunload', logoutListener)
        }
    }, [])
    return (
        <>
            <div className=" h-full w-16 bg-gray-800 flex flex-col items-center">
                <Avatar size={40} shape='square' icon={<UserOutlined />} className=' mt-12 mb-8' />
                <NavLink to='chat' style={({ isActive }) => isActive ? activeStyle : defaultStyle}>
                    <CommentOutlined className=' text-2xl mb-5' />
                </NavLink>
                <NavLink to='address' style={({ isActive }) => isActive ? activeStyle : defaultStyle}>
                    <TeamOutlined className=' text-2xl' />
                </NavLink>
            </div>

            <Outlet></Outlet>

        </>
    )
}
