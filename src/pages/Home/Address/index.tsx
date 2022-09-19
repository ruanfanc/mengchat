import { Input, Avatar } from 'antd';
import { UserOutlined, } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import ChatBox from './ChatBox';
import FriendDetail from './FriendDetail';
import { reqFriends } from '../../../api/user';
import { friend, friendsType } from '../../../models/user';


const { Search } = Input;
export default function Address() {
    let userName = localStorage.getItem('name')!
    let [friends, setFriends] = useState<friend[]>([]);
    let [select, setSelect] = useState(9999);
    function changeSelect(select: number) {
        setSelect(select)
    }
    useEffect(() => {
        // 获取全部好友
        async function getfriends(name: string) {
            const { data } = await reqFriends<friendsType>(name)
            setFriends(data.friends)
        }
        getfriends(userName)
        return () => {
        }
    }, [userName])


    return (
        <div className="flex">
            <div className='h-full w-80 bg-gray-100 border-r'>
                <div className='w-full  h-20 bg-white flex  items-center'>
                    <Search placeholder="搜索联系人~" className=" m-auto w-56" size='middle' />

                </div>
                <div >
                    <p className='ml-4 mt-4 text-base text-gray-400'>新的朋友</p>
                    <div onClick={() => { changeSelect(9999) }} className={`w-full h-20 flex items-center ${select === 9999 ? 'bg-gray-300' : ''}`} >
                        <Avatar size={40} shape='square' className=' ml-4' />
                        <span className='ml-4 text-lg w-44 font-medium truncate ...'>新的朋友</span>
                    </div>
                </div>
                {
                    friends.map((friend, index) => {
                        return <div key={index} onClick={() => { changeSelect(index) }} className={`w-full h-20 flex items-center ${select === index ? 'bg-gray-300' : ''}`}>
                            <Avatar size={40} src={friend.avatar} shape='square' icon={<UserOutlined />} className=' ml-4' />
                            <span className='ml-4 text-lg w-44 font-medium truncate ...'>{friend.friend}</span>
                        </div>
                    })
                }

            </div >
            {
                select === 9999 ? <ChatBox /> : <FriendDetail friend={friends[select]} />
            }
        </div>

    )
} 
