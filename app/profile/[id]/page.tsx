'use client'

import Profile from "@components/Profile"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

const UserProfile = ({ params }: any) => {
  const [posts, setPosts] = useState([])

  const searchParams = useSearchParams()
  const name = searchParams.get('name') || ''

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }

    if (params?.id) {
      fetchPosts()
    }

  }, [])

  return (
    <Profile
      name={name}
      desc={`See ${name} profile`}
      data={posts}
    />
  )
}

export default UserProfile