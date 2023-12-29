'use client'

import Form from "@components/Form"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const CreatePrompt = () => {
  const { data: session }: any = useSession()
  const router = useRouter()

  const [sumbitting, setSumbitting] = useState(false)
  const [post, setPost] = useState(
    {
      prompt: '',
      tag: ''
    })

  const createPrompt = async (e: any) => {
    e.preventDefault()
    setSumbitting(true)

    try {
      const response = await fetch('/api/prompt/new',
        {
          method: 'POST',
          body: JSON.stringify(
            {
              prompt: post.prompt,
              userId: session?.user?.id,
              tag: post.tag
            })
        }
      )

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSumbitting(false)
    }

  }
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      sumbitting={sumbitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt