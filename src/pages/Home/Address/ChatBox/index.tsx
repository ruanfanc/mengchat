import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd';
export default function ChatBox() {

    return (
        <div className="w-144">
            <div className="h-20 w-full  border-b flex items-center pl-8 font-medium  ">
                <span className=" text-2xl ">新的朋友</span>
            </div>
            <div className="flex flex-col w-full  h-172  pl-28 pr-28 border-b overflow-y-auto  ">
                <div className='pt-4 pb-4 border-b flex items-center'>
                    <Avatar size={50} shape='square' icon={<UserOutlined />} />
                    <div className='flex flex-col  ml-4 justify-between h-12 '>
                        <span className='text-xl w-52 font-medium truncate ...'>佳佳</span>
                        <span className=' text-xs ' style={{ color: '#7C7484' }}>3121312</span>
                    </div>
                    <div>
                        <Button type="primary" size='middle'>接受</Button>
                    </div>
                </div>
                <div className='pt-4 pb-4 border-b flex items-center'>
                    <Avatar size={50} shape='square' icon={<UserOutlined />} />
                    <div className='flex flex-col  ml-4 justify-between h-12 '>
                        <span className=' text-xl w-52 font-medium truncate ...'>佳佳</span>
                        <span className=' text-xs ' style={{ color: '#7C7484' }}>3121312</span>
                    </div>
                    <div>
                        <span className=' text-gray-400'>已添加</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
