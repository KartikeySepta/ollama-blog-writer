"use client"
import { useState, useEffect } from "react"

const DashboardClassic = () => {
  const [title, setTitle] = useState("")
  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [topics, setTopics] = useState([])
  const [subreddit, setSubreddit] = useState("technology")
  const [postContent, setPostContent] = useState("")
  const [summary, setSummary] = useState([])
  const [comments, setComments] = useState("")
  const [images, setImages] = useState([])
  const [rssArticles, setRssArticles] = useState([])
  const [stats, setStats] = useState({})
  const [recentPosts, setRecentPosts] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [expandedPosts, setExpandedPosts] = useState({}) // New state for tracking expanded posts

  const apiBase = import.meta.env.VITE_API_URL

  const fetchTopics = async () => {
    try {
      const res = await fetch(`${apiBase}/api/topics?subreddit=${subreddit}`)
      const data = await res.json()
      setTopics(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("❌ Failed to load Reddit topics:", err)
      setTopics([])
    }
  }

  useEffect(() => {
    fetchRss()
    fetchStats()
  }, [])

  const fetchRss = async () => {
    try {
      const res = await fetch(`${apiBase}/api/rss`)
      const data = await res.json()
      setRssArticles(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("❌ RSS fetch failed:", err)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch(`${apiBase}/api/stats`)
      const data = await res.json()
      setStats(data.stats || {})
      setRecentPosts(data.recentPosts || [])
    } catch (err) {
      console.error("❌ Stats fetch failed:", err)
    }
  }

  const handlePost = async () => {
    if (!output || !title) {
      alert("⚠️ Missing title or content")
      return
    }

    console.log("🖼️ Publishing with image:", selectedImage)
    console.log("🖼️ Image URL:", selectedImage?.url)
    console.log("📝 Available images:", images)

    try {
      const res = await fetch(`${apiBase}/api/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          html: output,
          image: selectedImage?.url || null,
        }),
      })

      console.log("Data sent to backend:", {
        title,
        html: output,
        image: selectedImage?.url || null,
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || `Status ${res.status}`)
      }
      alert(`✅ Blog posted!\n📎 URL: ${data.url}`)
    } catch (err) {
      console.error("❌ Publish error:", err)
      alert("❌ Failed to publish: " + err.message)
    }
  }

  const handleGenerate = async () => {
    if (!title) {
      alert("⚠️ Please enter a title.")
      return
    }

    const selectedTopic = topics.find((t) => t.title === title)
    const finalPostContent = selectedTopic?.postContent || postContent
    const finalComments = selectedTopic?.topComments || comments

    setLoading(true)
    setOutput("")

    try {
      const res = await fetch(`${apiBase}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          postContent: finalPostContent,
          comments: finalComments,
          customPrompt: prompt,
          summary: summary,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Unknown error")
      }

      setOutput(data.html || "⚠️ No content generated.")
      setTitle(data.title || title)

      if (Array.isArray(data.images)) {
        setImages(data.images)
        console.log("🖼️ Images in frontend:", data.images)
      } else {
        setImages([])
        console.log("🖼️ No images received.")
      }

      setLoading(false)
    } catch (err) {
      console.error("❌ Generation Error:", err)
      setOutput(`❌ Failed to generate: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Function to toggle post expansion
  const togglePostExpansion = (index) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // Limit to only 3 recent posts
  const displayedPosts = recentPosts.slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Reddit-style Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Submit Form */}
            <div className="bg-gray-50 border border-gray-300 rounded mb-6">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h2 className="font-bold text-sm">Submit a new AI blog post</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="Enter blog title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Custom prompt (optional)</label>
                    <textarea
                      placeholder="Add additional instructions..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleGenerate}
                      disabled={loading || !title}
                      className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium"
                    >
                      {loading ? "generating..." : "generate"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reddit Topics */}
            <div className="bg-gray-50 border border-gray-300 rounded mb-6">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h3 className="font-bold text-sm">Browse r/{subreddit}</h3>
              </div>
              <div className="p-4">
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="subreddit name"
                    value={subreddit}
                    onChange={(e) => setSubreddit(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={fetchTopics}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm border border-gray-300"
                  >
                    load
                  </button>
                </div>
                {topics.length > 0 && (
                  <select
                    onChange={(e) => {
                      const selectedIndex = Number.parseInt(e.target.value)
                      const topic = topics[selectedIndex]
                      if (topic) {
                        setTitle(topic.title)
                        setPostContent(topic.postContent || "")
                        setComments(Array.isArray(topic.topComments) ? topic.topComments.join("\n") : "")
                        setSummary("")
                      }
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select a Reddit post</option>
                    {topics.map((t, i) => (
                      <option key={i} value={i}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* RSS Feed */}
            <div className="bg-gray-50 border border-gray-300 rounded mb-6">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h3 className="font-bold text-sm">RSS Feed Articles</h3>
              </div>
              <div className="p-4">
                <select
                  onChange={(e) => {
                    const index = Number.parseInt(e.target.value)
                    const article = rssArticles[index]
                    if (article) {
                      setTitle(article.title)
                      setPostContent(article.content || "")
                      setSummary(article.description || "")
                      setComments("")
                    }
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select an RSS article</option>
                  {rssArticles.map((item, i) => (
                    <option key={i} value={i}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Recent Posts - Limited to 3 with Collapsible */}
            <div className="bg-gray-50 border border-gray-300 rounded mb-6">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h3 className="font-bold text-sm">Recent Posts (Latest 3)</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {displayedPosts.length > 0 ? (
                    displayedPosts.map((post, index) => (
                      <div key={index} className="bg-white border border-gray-300 rounded">
                        <div className="flex">
                          {/* Vote arrows */}
                          <div className="flex flex-col items-center p-2 bg-gray-50 border-r border-gray-300 w-12">
                            <button className="text-gray-400 hover:text-orange-500 p-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <span className="text-xs font-bold text-gray-600 py-1">{index + 1}</span>
                            <button className="text-gray-400 hover:text-blue-500 p-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                          {/* Post content */}
                          <div className="flex-1 p-3">
                            <div className="flex items-center justify-between">
                              <h3 className="text-blue-600 hover:underline cursor-pointer font-medium mb-1">
                                {post.title}
                              </h3>
                              <button
                                onClick={() => togglePostExpansion(index)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                              >
                                <svg
                                  className={`w-4 h-4 transition-transform ${expandedPosts[index] ? "rotate-180" : ""}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="text-xs text-gray-500 space-x-1">
                              <span>submitted {post.time} by</span>
                              <a href="#" className="text-blue-600 hover:underline">
                                {post.author}
                              </a>
                            </div>

                            {/* Collapsible content */}
                            {expandedPosts[index] && (
                              <div className="mt-3 p-3 bg-gray-50 rounded border">s
                                <div className="text-sm text-gray-700">
                                  {post.content || "No additional content available."}
                                </div>
                              </div>
                            )}

                            <div className="text-xs text-gray-500 mt-1 space-x-2">
                            <a href="#" className="text-gray-600 hover:text-blue-600">
                                share
                              </a>
                              
                              {/* <a href="#" className="text-gray-600 hover:text-blue-600">
                                {post.comments} comments
                              </a>
                              <span>•</span>
                              
                              <span>•</span>
                              <a href="#" className="text-gray-600 hover:text-blue-600">
                                save
                              </a>
                              <span>•</span>
                              <a href="#" className="text-gray-600 hover:text-blue-600">
                                hide
                              </a> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400 text-sm py-4">
                      No posts yet. Generate your first post!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Generated Content Output */}
            {output && (
              <div className="mt-6 bg-white border border-gray-300 rounded">
                <div className="bg-gray-50 border-b border-gray-300 px-4 py-2 flex items-center justify-between">
                  <h3 className="font-bold text-sm">Generated Content</h3>
                  <button
                    onClick={handlePost}
                    disabled={!output}
                    className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-xs font-bold border border-orange-600 shadow-sm transition-colors"
                  >
                    publish
                  </button>
                </div>
                <div className="p-4">
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: output }} />
                </div>
                {/* Simplified action bar */}
                <div className="border-t border-gray-200 px-4 py-2 bg-gray-50">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <button className="text-gray-600 hover:text-blue-600 font-bold">edit</button>
                    <span>•</span>
                    <button className="text-gray-600 hover:text-blue-600">save draft</button>
                    <span>•</span>
                    <button className="text-gray-600 hover:text-blue-600">copy html</button>
                    <div className="ml-auto text-gray-400">ready to publish • {new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Images */}
            {Array.isArray(images) && images.length > 0 && (
              <div className="mt-4 bg-white border border-gray-300 rounded">
                <div className="bg-gray-50 border-b border-gray-300 px-4 py-2">
                  <h3 className="font-bold text-sm">Related Images</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          console.log("🖼️ Image selected:", img)
                          setSelectedImage(img)
                        }}
                        className={`cursor-pointer border rounded overflow-hidden ${
                          selectedImage?.url === img.url ? "ring-4 ring-blue-400" : "hover:ring-2 hover:ring-blue-200"
                        }`}
                      >
                        <img
                          src={img.url || "/placeholder.svg?height=128&width=192"}
                          alt={img.alt || `image-${i}`}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {selectedImage && (
                    <div className="text-sm text-blue-500 mt-3">
                      ✅ Selected image will be included when publishing.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80">
            {/* Subreddit Info */}
            <div className="bg-white border border-gray-300 rounded mb-4">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-t">
                <h3 className="font-bold text-sm">r/Sārathi</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">Where Insight Meets Automation</p>
                <div className="text-sm space-y-1 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscribers</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Users here now</span>
                    <span className="font-bold text-green-600">1</span>
                  </div>
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium">
                  + subscribe
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white border border-gray-300 rounded mb-4">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h3 className="font-bold text-sm">Today's Stats</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posts generated</span>
                    <span className="font-bold">{stats.postsGenerated || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Words created</span>
                    <span className="font-bold">{stats.wordsCreated || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Images found</span>
                    <span className="font-bold">{stats.imagesFound || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Published blogs</span>
                    <span className="font-bold">{stats.publishedBlogs || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-gray-300 rounded mb-4">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h3 className="font-bold text-sm">Quick Links</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-blue-600 hover:underline">
                    • Submit Bugs
                  </a>
                  <a href="#" className="block text-blue-600 line-through">
                    • Browse r/technology (UnderDevelopment)
                  </a>
                  <a href="#" className="block text-blue-600 line-through">
                    • RSS feed settings
                  </a>
                  <Link to="bug-report" className="text-gray-600 hover:text-blue-600">
                    • BugReport
                  </Link>  
              
                  <Link to="help-faq" className="text-gray-600 hover:text-blue-600">
                    • Yash
                  </Link>
                </div>
              </div>
            </div>

            {/* Trending Subreddits */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h3 className="font-bold text-sm">Trending Subreddits</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-blue-600 hover:underline">
                    r/MachineLearning
                  </a>
                  <a href="#" className="block text-blue-600 hover:underline">
                    r/artificial
                  </a>
                  <a href="#" className="block text-blue-600 hover:underline">
                    r/ChatGPT
                  </a>
                  <a href="#" className="block text-blue-600 hover:underline">
                    r/singularity
                  </a>
                  <a href="#" className="block text-blue-600 hover:underline">
                    r/OpenAI
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardClassic