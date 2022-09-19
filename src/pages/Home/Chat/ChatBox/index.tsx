import React, { useEffect, useRef, useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Input, Spin } from 'antd';
import { reqPriInfo } from '../../../../api/chat'
import './index.css'
import { information, informations } from '../../../../models/chat';
import socket from '../../../../socket/index';
import { getNowTime } from '../../../../utils/time';
import { friend } from '../../../../models/user';


export default function ChatBox(props: { friendImg: string, chatName: string, setFriends: any, index: number, setNowIndex: any }) {
    const { TextArea } = Input;
    const [inputValue, setinputValue] = useState('')
    const [infos, setinfos] = useState<information[]>([])
    const info = useRef<any>(null)
    const chatBox = useRef<any>(null)
    let userimg: string = JSON.parse(localStorage.getItem('userInfo')!).avatar

    let username = localStorage.getItem('name')!
    useEffect(() => {
        // 传入setState
        socket.getSetinfos(setinfos)
    }, [])
    useEffect(() => {
        // 当聊天对象改变时
        setinfos([])
        // 传入聊天名字
        socket.changeChatName(props.chatName)
        getinfos(props.chatName)

        // 获取聊天信息 
        async function getinfos(name: string) {
            const result = await reqPriInfo<informations>({ fromname: username, toname: name })
            setinfos(result.data.informations)
        }

    }, [props.chatName, username])
    useEffect(() => {
        chatBox.current.scrollTop = chatBox.current.scrollHeight - chatBox.current.offsetHeight
    }, [infos])

    function changeInfo(e: any) {
        setinputValue(e.target.value)
    }
    // 回车确定
    function handleEnter(e: any) {
        if (e.key === 'Enter') {
            sendInfo();
        }
    }

    function sendInfo() {
        // // 发送信息
        let nowTime = getNowTime()
        socket.emitPrivateChat(inputValue)
        setinfos((infos) => {
            infos.push({
                fromname: username,
                toname: props.chatName,
                time: nowTime,
                message: inputValue
            })
            return infos.slice()
        })
        info.current.focus()
        setinputValue('')//设置输入框为空 
        // 将该聊天置顶
        props.setFriends((friends: friend[]) => {
            if (props.index !== 0) {
                friends.unshift(friends.splice(props.index, 1)[0])
            }
            friends[0].lastInfo = inputValue
            friends[0].time = nowTime
            return friends.slice()
        })
        props.setNowIndex(0)
    }

    return (
        <div className="w-144">
            <div className="h-20 w-full  border-b flex items-center pl-8 font-medium  ">
                <span className=" text-2xl ">{props.chatName}</span>
            </div>
            <div ref={chatBox} className="flex flex-col w-full  h-132  pl-9 pr-9 border-b overflow-y-auto  ">
                {

                    infos!.length > 0 ? infos!.map((info, index) => {
                        if (info.fromname === props.chatName) {
                            return <div className='flex mb-4' key={index}>
                                <Avatar shape='square' icon={<UserOutlined />} src={props.friendImg} className=" h-12 w-12" />
                                <p className=" max-w-xs ml-4  p-3  break-all ...  text-xl bg-gray-100 chatBefore relative ">{info.message}</p>
                            </div>
                        } else {
                            return <div className="flex ml-auto  mb-4" key={index}>
                                <p className=" max-w-xs mr-4  p-3  break-all ...  text-xl bg-blue-200 chatAfter relative ">{info.message}</p>
                                <Avatar shape='square' icon={<UserOutlined />} src={userimg} className=" h-12 w-12" />
                            </div>
                        }


                    })
                        : <Spin size='large' />
                }

            </div>
            <div className="w-full h-40">
                <TextArea onPressEnter={sendInfo} onChange={(e) => { changeInfo(e) }} ref={info} value={inputValue} rows={4} placeholder="输入你想说的话吧~" allowClear bordered={false} className="resize-none text-lg" />
                <div onKeyDown={e => handleEnter(e)} onClick={sendInfo} className=" float-right px-8 py-1 bg-blue-300 rounded mr-10 hover:bg-blue-400 active:bg-blue-500 select-none"> 发送</div>
            </div>
        </div>
    )
}
