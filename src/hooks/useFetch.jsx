import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/api'

const useFetch = (url) => {
const [loading, setLading] = useState(true)
const [data, setData] = useState(null)
const [error, setError] = useState(null)



useEffect(()=>{
    setLading(true)
    setData(null)
    setError(null)

    fetchDataFromApi(url).then(res=>{
        setLading(false)
        setData(res)
    }).catch(error=>{
        setLading(false)
        setError(error.message)
    })

},[url])


return {data , loading , error}

}

export default useFetch