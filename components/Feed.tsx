'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt', { cache: 'no-store' })
      const data = await response.json()
      setPosts(data)
    }

    fetchPosts()
  }, [])

  interface PromptCardListProps {
    data: any,
    handleTagClick: any
  }

  const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post: any) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleEdit={() => { }}
            handleDelete={() => { }}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search for a prompt, tag or user"
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => { }} />
    </section>
  )
}

export default Feed