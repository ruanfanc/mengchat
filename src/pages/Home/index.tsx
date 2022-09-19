import React, { useEffect, useState } from 'react'
import { Avatar, Popover, Modal, Image, Upload, message, Select, Input, Cascader } from 'antd';
import type { UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { SkinTwoTone, RightOutlined } from '@ant-design/icons';
import { UserOutlined, CommentOutlined, TeamOutlined } from '@ant-design/icons'
import { NavLink, Outlet } from 'react-router-dom';
import { Info, navStyle } from '../../models/user';
import { reqDirectLogin, reqEditInfo, reqlogout } from '../../api/user';
import socket from '../../socket/index';
import citys from '../../utils/citys';



export default function Home() {
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [userInfo, setuserInfo] = useState<Info>(JSON.parse(localStorage.getItem('userInfo')!));
    const [Info, setInfo] = useState<Info>(JSON.parse(localStorage.getItem('userInfo')!));
    const props: UploadProps = {
        name: 'file',
        action: 'http://127.0.0.1:4000/user/avatar',
        onChange(info) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                setInfo((Info) => {
                    console.log(info.file.response.data.url)
                    Info.avatar = info.file.response.data.url
                    let newInfo = Object.assign({}, Info)
                    return newInfo
                })
                message.success(`图片上传成功`);
            } else if (info.file.status === 'error') {
                message.error(`图片上传失败`);
            }
        },
    };
    const { Option } = Select;
    let defaultStyle: navStyle = {
        fontSize: '20px', color: '#ccc'
    }
    let activeStyle: navStyle = {
        fontSize: '20px', color: 'skyblue'
    }
    function show() {
        setVisible(false);
        setOpen(true);
    }
    function handleVisibleChange() {
        setVisible(!visible);
    }
    function changeInfo(e: any, target: any) {
        if (e.target.value) {
            Info[target] = e.target.value

        }
    }
    function editInfo() {
        setOpen(false)
        setuserInfo(Info)
        reqEditInfo(Info)
    }
    const content = (
        <div className=' w-72 h-40 flex flex-col'>
            <div className='h-24 w-full flex items-center border-b-2' >
                <Image
                    width={70}
                    src={userInfo.avatar}
                />
                <div className='flex flex-col ml-4'>
                    <div className='flex items-center'>
                        <span className=' text-lg'>{userInfo.name}</span>
                        <SkinTwoTone className=' text-base ml-1 mb-1' twoToneColor={userInfo.sex ? '' : '#eb2f96'} />
                    </div>
                    <span className=" " style={{ color: '#7C7484' }}>聊天号：{userInfo.chat}</span>
                    <span style={{ color: '#7C7484' }}>地区：{userInfo.region}</span>
                </div>
            </div >
            <div className=' h-16 w-full flex items-center justify-center'>
                <div onClick={show} className=' bg-bili  w-40 h-8  leading-8 rounded-lg text-center text-base text-white hover:bg-biho cursor-pointer'>编辑信息</div>
            </div>
        </div>
    );
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
                {/* 编辑信息弹出层 */}
                <Modal
                    title="编辑信息"
                    centered
                    visible={open}
                    onOk={editInfo}
                    onCancel={() => setOpen(false)}
                    width={400}
                >
                    <div className=' border-b-2 h-16 flex items-center text-lg'>头像
                        <div className='ml-auto'>
                            <ImgCrop rotate>
                                <Upload {...props}>
                                    <Avatar size={50} shape='square' src={Info.avatar} icon={<UserOutlined />} className=' mr-2' />
                                    <RightOutlined className='text-lg' />
                                </Upload>
                            </ImgCrop>
                        </div>
                    </div>

                    <div className=' border-b-2 h-12 flex items-center text-lg'>名字
                        <div className='ml-auto'>
                            <Input placeholder={userInfo.name} onBlur={(e) => changeInfo(e, 'name')} />
                        </div>
                    </div>
                    <div className=' border-b-2 h-12 flex items-center text-lg'>聊天号
                        <div className='ml-auto' onBlur={(e) => changeInfo(e, 'chat')} >
                            <Input placeholder={userInfo.chat} />
                        </div>
                    </div>
                    <div className=' border-b-2 h-12 flex items-center text-lg'>性别
                        <div className='ml-auto'>
                            <Select onChange={(value) => { Info.sex = value === '男' ? 1 : 0 }} defaultValue={Info.sex ? '男' : '女'} style={{ width: 120 }}>
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>
                        </div>
                    </div>
                    <div className=' border-b-2 h-12 flex items-center text-lg'>地区
                        <div className='ml-auto' >
                            <Cascader onChange={(value) => Info.region = value.join('-')} options={citys} placeholder="Please select" />
                        </div>
                    </div>
                    <div className=' border-b-2 h-12 flex items-center text-lg'>个性签名
                        <div className='ml-auto' onBlur={(e) => changeInfo(e, 'sign')} >
                            <Input placeholder={userInfo.sign} />
                        </div>
                    </div>
                </Modal>
                <Popover onVisibleChange={handleVisibleChange} visible={visible} placement="rightTop" content={content} trigger="click">
                    <Avatar src={userInfo.avatar} size={40} shape='square' icon={<UserOutlined />} className=' mt-12 mb-8' />
                </Popover>

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
