import { Input, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'

import React from 'react'
import ChatBox from './ChatBox';
const { Search } = Input;
export default function Address() {
    return (
        <div className="flex">
            <div className='h-full w-80 bg-gray-100 border-r'>
                <div className='w-full  h-20 bg-white flex  items-center'>
                    <Search placeholder="搜索联系人~" className=" m-auto w-56" size='middle' />

                </div>
                <div className='w-full h-20 bg-gray-300 flex items-center'>
                    <Avatar size={40} shape='square' icon={<UserOutlined />} className=' ml-4' />
                    <span className='ml-4 text-lg w-44 font-medium truncate ...'>佳佳</span>
                </div>

            </div >
            <ChatBox></ChatBox>
        </div>

    )
}
