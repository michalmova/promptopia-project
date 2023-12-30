'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  let currentTimeOutId: any = null
  const delay: number = 750

  const filterPosts = (searchText: string) => {
    const lowerSearchText = searchText.toLowerCase()
    const filteredPosts = allPosts.filter((post: any) => {
      const isContain = post.creator.username.toLowerCase().includes(lowerSearchText)
        || post.prompt.toLowerCase().includes(lowerSearchText)
        || post.tag.toLowerCase().includes(lowerSearchText)

      return isContain
    })
    return filteredPosts
  }

  const handleSearchChange = (e: any) => {
    const newSearchText = e.target.value
    setSearchText(newSearchText)

    if (currentTimeOutId) clearTimeout(currentTimeOutId)

    currentTimeOutId = setTimeout(() => {
      const filteredPosts = filterPosts(newSearchText)
      setPosts(filteredPosts)
    }, delay)

  }

  const handleTagClick = (tag: any) => {
    setSearchText(tag)
    const filteredPosts = filterPosts(tag)
    setPosts(filteredPosts)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
      setAllPosts(data)
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
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed