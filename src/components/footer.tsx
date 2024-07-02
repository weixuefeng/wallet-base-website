/*
 * @Author:
 * @Date: 2022-10-13 11:26:10
 * @LastEditors:
 * @LastEditTime: 2024-03-02 10:38:51
 * @FilePath: /wallet-base-website/src/components/footer.tsx
 */

import React, { useEffect, useState } from 'react'

const Footer = () => {
  const [launchName, setLaunchName] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      const launchName = currentPath.split('/')[1]
      setLaunchName(launchName)
    }
  }, [])

  return (
    <>
      {launchName == 'community' || launchName == 'communitys' ? (
        ''
      ) : (
        <div className={`footer-wrap ${['taste', 'bridge'].includes(launchName) ? 'footer-launch' : ''}`}>
          <div className="footer">
            <p>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Footer
