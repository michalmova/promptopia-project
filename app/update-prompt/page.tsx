'use client'

import Form from "@components/Form"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const EditPrompt = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [post, setPost] = useState(
    {
      prompt: '',
      tag: ''
    })

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if (promptId) getPromptDetails()
  },
    [promptId]
  )

  const [sumbitting, setSumbitting] = useState(false)

  const updatePrompt = async (e: any) => {
    e.preventDefault()
    setSumbitting(true)

    if (!promptId) alert('Prompt ID not found!')

    try {
      const response = await fetch(`/api/prompt/${promptId}`,
        {
          method: 'PATCH',
          body: JSON.stringify(
            {
              prompt: post.prompt,
              tag: post.tag
            })
        }
      )

      if (response.ok) {
        router.push('/profile')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSumbitting(false)
    }

  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      sumbitting={sumbitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt