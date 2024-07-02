/*
 * @Author:
 * @Date: 2022-10-12 19:08:34
 * @LastEditors:
 * @LastEditTime: 2024-02-29 20:07:08
 * @FilePath: /wallet-base-website/src/pages/index.tsx
 */

import React from 'react'
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'

export default Home

function Home() {
  let pageModel = new PageModel('Wallet Base sdk', 'wallet base', '')
  return <>{NormalLayout(Main(), pageModel)}</>
}

function Main() {
  return (
    <div className="main p-20">
      <p className='p-4'>Wallet base </p>
      <p>Wallet base 是一个为去中心化应用服务的项目。主要为中心化应用向去中心化迁移提供解决方案。</p>
      <p className='p-4'>解决什么问题?</p>
      <p>当前去中心化应用大多集中在 web 端,telegram 端，移动端体验很差。中心化程序迁移到去中心化开发成本很高，提供的 sdk 专门解决这个问题，包括用户体系，账户体系，定制提供 sdk</p>
      <p className='p-4'>愿景:</p>
      <p>wallet base 供任意想迁移到 web3 的应用程序提供便利,替换 web2 的用户体系</p>
      <p className='p-4'>用户故事:</p>
      <p>中心化的游戏程序，迁移到去中心化，需要开发钱包系统，有一定的开发成本。如果不自己开发，在移动端只能使用 deepLink 方式连接钱包，需要在多个 app 之间来回跳转，用户体验极差。如果游戏程序集成一个sdk，就可以实现钱包创建，管理，发送等去中心化功能，会极大提升用户体验。</p>
      <p className='p-4'>讨论:</p>
      <p><a href='https://t.me/walletsdk'>telegram</a>: https://t.me/walletsdk</p>
    </div>
  )
}
