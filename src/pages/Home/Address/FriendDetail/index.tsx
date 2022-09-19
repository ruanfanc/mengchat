import React, { useEffect, useState } from 'react'
import { Image } from 'antd';
import { SkinTwoTone } from '@ant-design/icons';
import { friend, Info } from '../../../../models/user';
import { reqFriendInfo } from '../../../../api/user';

export default function FriendDetail(props: { friend: friend }) {
    let friend = props.friend
    let [friendInfo, setFriendInfo] = useState<Info>()
    useEffect(() => {
        async function getFriendInfo(friend: string) {
            let Info = await reqFriendInfo<Info>({ friend })
            setFriendInfo(Info.data)
        }
        getFriendInfo(friend.friend)
    }, [props.friend, friend.friend])



    return (
        <div className='w-144' >
            <div className='w-full  mt-32  flex flex-col items-center'>
                <div className='h-24 w-3/4 border-b flex items-center'>
                    <Image
                        width={80}
                        src={friend.avatar}
                    />
                    <div className='flex flex-col ml-4'>
                        <div className='flex items-center'>
                            <span className=' text-xl'>{friend.friend}</span>
                            <SkinTwoTone className=' text-base ml-1 mb-1' twoToneColor='#eb2f96' />
                        </div>
                        <span className=" text-sm" style={{ color: '#7C7484' }}>聊天号：{friendInfo?.chat}</span>
                        <span className="text-sm" style={{ color: '#7C7484' }}>地区：{friendInfo?.region}</span>
                    </div>
                </div >
                <div className='h-28 w-3/4 border-b flex pt-1 pb-1' >
                    <div className='flex flex-col justify-around mr-8'>
                        <p className='text-lg text-gray-400'>备注名</p>
                        <p className='text-lg text-gray-400'>标签</p>
                        <p className='text-lg text-gray-400'>来源</p>
                    </div>
                    <div className='flex flex-col justify-around'>
                        <p className='text-lg '>甜佳</p>
                        <p className='text-lg '>甜佳</p>
                        <p className='text-lg '>甜佳</p>
                    </div>
                </div>
                <div className=' h-16 w-full flex items-center justify-center'>
                    <div className=' bg-bili  w-40 h-12  leading-12 rounded-lg text-center text-lg text-white hover:bg-biho cursor-pointer'>发消息</div>
                </div>
            </div>
        </div>
    )
}
