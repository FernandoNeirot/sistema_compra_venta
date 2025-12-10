import React from 'react'
interface Props {
  children?: React.ReactNode
}
const WrapperMaxWidth1200 = ({ children }: Props) => {
  return (
    <div className='relative max-w-[1200px] w-full mx-auto px-4 md:px-8'>
      {children}
    </div>
  )
}

export default WrapperMaxWidth1200