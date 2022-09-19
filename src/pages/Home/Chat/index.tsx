import { Input, Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import ChatBox from './ChatBox';
import { reqFriends } from '../../../api/user';
import { friend, friendsType } from '../../../models/user';
import { getCorrectTime } from '../../../utils/time';
import { reqChangeRead } from '../../../api/chat';
import socket from '../../../socket/index';

const { Search } = Input;
export default function Chat() {
    let [friends, setFriends] = useState<friend[]>([]);
    let [nowIndex, setNowIndex] = useState(-1);
    let [chatName, setChatName] = useState('');
    const userName: string = localStorage.getItem('name')!

    // 更改聊天对象
    function changeChat(index: number, friendname: string) {
        setChatName(friendname)
        setNowIndex(index)
        if (!friends[index].isread) {
            setFriends((friends) => {
                friends[index].isread = 1
                return friends
            })
            reqChangeRead({ fromname: userName, toname: friendname })
        }
    }



    useEffect(() => {
        // 获取全部好友
        socket.getSetFriends(setFriends)
        async function getfriends(name: string) {
            const { data } = await reqFriends<friendsType>(name)
            setFriends(data.friends)
        }
        getfriends(userName)
        return () => {
            socket.changeChatName('')
        }
    }, [userName])

    return (
        <div className="flex">
            <div className='h-full w-80 bg-gray-100 border-r'>
                <div className='w-full  h-20 bg-white flex  items-center'>
                    <Search placeholder="搜索联系人~" className=" m-auto w-56" size='middle' />
                </div>
                {
                    friends ? friends!.map((friend, index) => {
                        return <div className={index === nowIndex ? 'w-full h-20 bg-gray-300 flex items-center' : 'w-full h-20 flex items-center'} key={friend.id} onClick={() => { changeChat(index, friend.friend) }}>
                            <Badge dot={friend.isread === 0}  >
                                <Avatar size={40} shape='square' icon={<UserOutlined />} src={friend.avatar} className=' ml-4' />
                            </Badge>
                            <div className=' flex flex-col  ml-4 justify-between h-12 '>
                                <span className='w-44  text-lg font-medium truncate ...'>{friend.friend}</span>
                                <span className=' text-sm ' style={{ color: '#7C7484' }}>{friend.lastInfo}</span>
                            </div>
                            <div>
                                <span className=' text-sm ' style={{ color: '#7C7484' }}>
                                    {getCorrectTime(friend.time)}
                                </span>
                            </div>
                        </div>;
                    }) : <div></div>
                }
            </div >
            {chatName === '' ? <div></div> : <ChatBox setFriends={setFriends} chatName={chatName} index={nowIndex} setNowIndex={setNowIndex} friendImg={friends[nowIndex].avatar} />}

        </div>

    )
}
