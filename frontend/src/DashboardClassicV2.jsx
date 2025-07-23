"use client"
import { useState, useEffect } from "react"
import DOMPurify from "dompurify"
import { Link,} from "react-router-dom"

const DashboardClassic = () => {
  const [title, setTitle] = useState("")
  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [topics, setTopics] = useState([])
  const [subreddit, setSubreddit] = useState("gaming")
  const [postContent, setPostContent] = useState("")
  const [summary, setSummary] = useState([])
  const [comments, setComments] = useState("")
  const [images, setImages] = useState([])
  const [rssArticles, setRssArticles] = useState([])
  const [stats, setStats] = useState({})
  const [recentPosts, setRecentPosts] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [expandedPosts, setExpandedPosts] = useState({})
  const [copyStatus, setCopyStatus] = useState("")
  const [rateLimitMsg, setRateLimitMsg] = useState("")


  const apiBase = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetchRss()
    fetchStats()
  }, [])

  const fetchTopics = async () => {
    try {
      const res = await fetch(`${apiBase}/api/topics?subreddit=${subreddit}`)
      const data = await res.json()
      setTopics(Array.isArray(data) ? data : [])
    } catch {
      setTopics([])
    }
  }

  const fetchRss = async () => {
    try {
      const res = await fetch(`${apiBase}/api/rss`)
      const data = await res.json()
      setRssArticles(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err); }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch(`${apiBase}/api/stats`)
      const data = await res.json()
      console.log("stats",data);
      
      setStats(data.stats || {})
      setRecentPosts(data.recentPosts || [])
    } catch (err) { console.error(err); }
  }

  const handleCopyHtml = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(output)
        setCopyStatus("HTML copied!")
        setTimeout(() => setCopyStatus(""), 2000)
        return
      }

      const textArea = document.createElement("textarea")
      textArea.value = output
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)

      if (successful) {
        setCopyStatus("HTML copied!")
        setTimeout(() => setCopyStatus(""), 2000)
      } else {
        throw new Error()
      }
    } catch {
      const textArea = document.createElement("textarea")
      textArea.value = output
      textArea.style.position = "absolute"
      textArea.style.width = "100%"
      textArea.style.height = "200px"
      textArea.style.zIndex = "1000"
      textArea.style.backgroundColor = "white"
      textArea.style.border = "2px solid blue"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      setCopyStatus("Please press Ctrl+C to copy")

      setTimeout(() => {
        if (document.body.contains(textArea)) {
          document.body.removeChild(textArea)
        }
        setCopyStatus("")
      }, 5000)
    }
  }

  const handleCopyPlainText = async () => {
    try {
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = output
      const plainText = tempDiv.textContent || tempDiv.innerText || ""

      if (!plainText.trim()) {
        setCopyStatus("No text content to copy!")
        setTimeout(() => setCopyStatus(""), 2000)
        return
      }

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(plainText)
        setCopyStatus("Plain text copied!")
        setTimeout(() => setCopyStatus(""), 2000)
        return
      }

      const textArea = document.createElement("textarea")
      textArea.value = plainText
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)

      if (successful) {
        setCopyStatus("Plain text copied!")
        setTimeout(() => setCopyStatus(""), 2000)
      } else {
        throw new Error()
      }
    } catch {
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = output
      const plainText = tempDiv.textContent || tempDiv.innerText || ""

      const textArea = document.createElement("textarea")
      textArea.value = plainText
      textArea.style.position = "absolute"
      textArea.style.width = "100%"
      textArea.style.height = "200px"
      textArea.style.zIndex = "1000"
      textArea.style.backgroundColor = "white"
      textArea.style.border = "2px solid green"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      setCopyStatus("Please press Ctrl+C to copy")

      setTimeout(() => {
        if (document.body.contains(textArea)) {
          document.body.removeChild(textArea)
        }
        setCopyStatus("")
      }, 5000)
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
  setCopyStatus("") // Clear any previous copy status

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
    

    // ✅ Detect 429 IP Rate Limit Error
    if (res.status === 429) {
      setRateLimitMsg(data.error || "❌ You've reached your daily generation limit.")
      setLoading(false)
      return
    }
    

    if (!res.ok) {
      throw new Error(data.error || "Unknown error")
    }

    setOutput(DOMPurify.sanitize(data.html || "⚠️ No content generated."))
    setTitle(data.title || title)

    if (Array.isArray(data.images)) {
      setImages(data.images)
    } else {
      setImages([])
    }
  } catch (err) {
    console.error("❌ Generation Error:", err)
    setOutput(`❌ Failed to generate: ${err.message}`)
  } finally {
    setLoading(false)
  }
}


  const togglePostExpansion = (index) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }


   const toggleMobileMenu = () => {
    // Get the Mobile Menu Element
    const mobileMenu = document.getElementById("mobileMenu");
    //Id it has the hidden class ,remove it. otherwise , add it
    if (mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
    }
  };

  const displayedPosts = recentPosts.slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Reddit-style Header */}
      <div className="w-full px-2 sm:px-4 py-4 md:max-w-7xl md:mx-auto">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Main Content */}
          <div className="flex-1 w-full">
            {/* Submit Form */}
            <div className="bg-gray-50 border border-gray-3 rounded mb-6 w-full">
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
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleGenerate}
                      disabled={loading || !title}
                      className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium"
                    >
                      {loading ? "generating..." : "generate"}
                    </button>
                    {rateLimitMsg && (
                      <div className="text-red-500 text-sm">{rateLimitMsg}</div>
                    )}
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
                              <h3 className="text-sm text-blue-600 hover:underline cursor-pointer font-medium mb-1">
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
                            {/* Collapsible content */}
                            {expandedPosts[index] && (
                              <div className="mt-3 p-3 bg-gray-50 rounded border">
                                <div className="text-sm text-gray-700">
                                  {post.content || "No additional content available."}
                                </div>
                              </div>
                            )}
                            <div className="text-xs text-gray-500 mt-1 space-x-2">
                              <a href="#" className="text-gray-600 hover:text-blue-600">
                                share
                              </a>
                            </div>
                            <div className="text-xs text-gray-500 space-x-1">
                              <span>generated {post.time || "moments ago"} •</span>
                              <span className="text-blue-600">AI Generated Content</span>
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
                  <div className="flex items-center gap-3 text-xs">
                    {copyStatus && <span className="text-gray-600">{copyStatus}</span>}
                    <button
                       onClick={handleCopyPlainText}
                      disabled={!output}
                      className="text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed underline"
                    >
                      copy text
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                      onClick={handleCopyHtml}
                      disabled={!output}
                      className="text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed underline"
                    >
                      copy html
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(output) }}
                  />
                </div>
                {/* Simplified action bar */}
                <div className="border-t border-gray-200 px-4 py-2 bg-gray-50">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <button className="text-gray-600 hover:text-blue-600 underline">edit</button>
                    <button className="text-gray-600 hover:text-blue-600 underline">save draft</button>
                    <button onClick={handleCopyHtml} className="text-gray-600 hover:text-blue-600 underline">
                      copy html
                    </button>
                    <div className="ml-auto text-gray-400">ready to copy • {new Date().toLocaleTimeString()}</div>
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
                  {selectedImage && <div className="text-sm text-blue-500 mt-3">✅ Selected image for reference.</div>}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          
          <div className="w-80">
            {/* Subreddit Info */}
            <div className="hidden md:block">
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
            </div>

            {/* Stats */}
            <div className="hidden md:block">
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
                      <span className="text-gray-600">Content copied</span>
                      <span className="font-bold">{stats.contentCopied || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="hidden md:block">
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
                    <Link to ="/bug-report" className="block text-blue-600 hover:underline">
                      • Bug Report
                    </Link>
                    <Link to="/help-faq" className="block text-blue-600 hover:underline">
                      • Help & FAQ
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Subreddits */}
            <div className="hidden md:block">
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
    </div>
  )
}

export default DashboardClassic
