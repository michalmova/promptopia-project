'use client'

import Profile from "@components/Profile"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const MyProfile = () => {
  const { data: session }: any = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])

  const handleEdit = (post: any) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

    if (!hasConfirmed) return

    try {
      await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      })

      const filteredPosts = posts.filter((p: any) => p._id !== post._id)
      setPosts(filteredPosts)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user?.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }

    if (session?.user?.id) {
      fetchPosts()
    }

  }, [session])

  return (
    <Profile
      name={'My'}
      desc={'Welcome to your profile'}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile