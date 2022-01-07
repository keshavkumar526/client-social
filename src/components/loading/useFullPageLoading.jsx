import React from 'react'
import { useState } from 'react'
import Loading from './loading'

export const UseFullPageLoading = () => {
    const [loading , setLoading] = useState(false)
    return [
        loading ? <Loading /> : null,
        loading,
        ()=> setLoading(true),
        ()=> setLoading(false)
    ]
}
