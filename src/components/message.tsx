import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const Message = ({ title, isMessage, imgMessage, closePop }) => {
  // useEffect(() => {
  //   setInterval(() => {
  //     closePop()
  //   }, 2000)
  // }, [])

  const closeModal = () => {
    closePop()
  }

  return (
    <>
      <Transition appear show={isMessage} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                  <div className="mx-auto mb-5 h-[100px] w-[100px] md:mb-7">
                    <img className="h-full w-full" src={imgMessage} alt="icon" />
                  </div>
                  <div className="mt-2">
                    <p className="mb-4 text-center text-base text-white md:mb-5 md:text-xl">{title}</p>
                  </div>
                  <div className="content">
                    <button onClick={closeModal}>Close</button>
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

export default Message
