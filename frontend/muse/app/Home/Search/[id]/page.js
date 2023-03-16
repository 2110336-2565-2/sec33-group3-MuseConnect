'use client'

import React from 'react'
import {usePathname} from 'next/navigation'

export default function page() {
  const id = usePathname().split("/").at(-1);

  return (
    <div>
      <p> this is my id: {id} </p>
    </div>
  )
}
