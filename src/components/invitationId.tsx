/*
 * @Author:
 * @Date: 2024-01-09 10:00:30
 * @LastEditors:
 * @LastEditTime: 2024-01-15 19:05:44
 * @FilePath: /wallet-base-website/src/components/invitationId.tsx
 */
import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Message from './message'

const InvitationId = props => {
  const { isInvitation, handleInvitationChange, submitInviteCode, title } = props
  const [inviteCode, setInviteCode] = useState('')

  const onInviteCodeChange = e => {
    setInviteCode(e.target.value)
  }

  const closeModal = () => {
    submitInviteCode(inviteCode)
    // handleInvitationChange(false)
  }

  const closeModalBox = () => {
    handleInvitationChange(false)
    setInviteCode('')
  }

  const openModal = () => {
    handleInvitationChange(true)
  }

  return (
    <>
      <Transition appear show={isInvitation} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModalBox}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="invitation fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="wrap">
                  <Dialog.Title as="h3">Invitation of Tasting</Dialog.Title>
                  <div className="mt-2">
                    <p className="text-center text-base text-white md:text-xl">Please bind your referral UID</p>
                  </div>
                  <div className="content">
                    <input
                      type="text"
                      placeholder="Enter referral UID"
                      onChange={onInviteCodeChange}
                      value={inviteCode}
                      required
                    />
                    <p className="mb-2 text-xs text-redFF">{title}</p>
                    <button onClick={closeModal}>Bind to Activate</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default InvitationId
