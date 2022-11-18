import { useEffect, useState } from 'react'
import { HeaderLeft } from './HeaderLeft/HeaderLeft'
import { HeaderLight } from './HeaderLight/HeaderLight'

export const Header = () => {
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth)
  useEffect(() => {
    // 576
    window.addEventListener('resize', (e) => {
      e.preventDefault()
      setDisplayWidth(window.innerWidth)
    })
  }, [displayWidth])
  return (
    <div className=' sticky top-0 left-0 z-10 m-0 flex h-16 w-full items-center bg-sky-100'>
      <div className=' container mx-auto grid grid-cols-12 px-10 lg:px-0'>
        <HeaderLeft />
        <HeaderLight displayWidth={displayWidth} />
      </div>
    </div>
  )
}
