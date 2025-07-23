"use client"

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Section */}
            <div className="bg-white border border-gray-300 rounded mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-8 rounded-t">
                <h1 className="font-bold text-3xl mb-2">Sārathi</h1>
                <p className="text-blue-100 text-lg">Where Insight Meets Automation</p>
                <p className="text-blue-200 text-sm mt-2">AI-Powered Content Generation Platform</p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white border border-gray-300 rounded mb-6">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h2 className="font-bold text-sm">Our Mission</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sārathi is designed to bridge the gap between raw information and meaningful content. In today's
                  information-rich world, we believe that everyone should have access to tools that can transform
                  scattered data into coherent, engaging narratives.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our platform leverages the power of artificial intelligence to help content creators, bloggers, and
                  businesses generate high-quality blog posts from various sources including Reddit discussions, RSS
                  feeds, and custom prompts.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white border border-gray-300 rounded mb-6">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h2 className="font-bold text-sm">Key Features</h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 text-blue-600 rounded p-2 text-sm">🤖</div>
                      <div>
                        <h3 className="font-bold text-sm mb-1">AI-Powered Generation</h3>
                        <p className="text-gray-600 text-sm">
                          Advanced AI algorithms create engaging content from your inputs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 text-orange-600 rounded p-2 text-sm">📱</div>
                      <div>
                        <h3 className="font-bold text-sm mb-1">Reddit Integration</h3>
                        <p className="text-gray-600 text-sm">
                          Transform Reddit discussions into comprehensive blog posts
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 text-green-600 rounded p-2 text-sm">📡</div>
                      <div>
                        <h3 className="font-bold text-sm mb-1">RSS Feed Support</h3>
                        <p className="text-gray-600 text-sm">Aggregate and repurpose content from RSS feeds</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 text-purple-600 rounded p-2 text-sm">🖼️</div>
                      <div>
                        <h3 className="font-bold text-sm mb-1">Image Integration</h3>
                        <p className="text-gray-600 text-sm">Automatically find and include relevant images</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-100 text-yellow-600 rounded p-2 text-sm">⚡</div>
                      <div>
                        <h3 className="font-bold text-sm mb-1">One-Click Publishing</h3>
                        <p className="text-gray-600 text-sm">Seamlessly publish to your preferred platforms</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 text-gray-600 rounded p-2 text-sm">📊</div>
                      <div>
                        <h3 className="font-bold text-sm mb-1">Analytics Dashboard</h3>
                        <p className="text-gray-600 text-sm">Track your content generation and publishing metrics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h2 className="font-bold text-sm">Technology Stack</h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-bold text-sm mb-3 text-blue-600">Frontend</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• React.js</li>
                      <li>• Next.js</li>
                      <li>• Tailwind CSS</li>
                      <li>• TypeScript</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-3 text-green-600">Backend</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Node.js</li>
                      <li>• REST APIs</li>
                      <li>• OpenAI Integration</li>
                      <li>• Reddit API</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-3 text-purple-600">Infrastructure</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Cloud Hosting</li>
                      <li>• Database Storage</li>
                      <li>• CDN Integration</li>
                      <li>• API Management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 hidden md:block">
            {/* Quick Stats */}
            <div className="bg-white border border-gray-300 rounded mb-4">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h3 className="font-bold text-sm">Platform Stats</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version</span>
                    <span className="font-bold">v1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Launch Date</span>
                    <span className="font-bold">2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="font-bold text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Updates</span>
                    <span className="font-bold">Regular</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white border border-gray-300 rounded mb-4">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h3 className="font-bold text-sm">Get in Touch</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-blue-600 hover:underline">
                    📧 Contact Support
                  </a>
                  <a href="#" className="block text-blue-600 hover:underline">
                    💬 Join Community
                  </a>
                  <a href="#" className="block text-blue-600 hover:underline">
                    📖 Documentation
                  </a>
                  <a href="#" className="block text-blue-600 hover:underline">
                    🐛 Report Issues
                  </a>
                </div>
              </div>
            </div>

            {/* Open Source */}
            <div className="hidden md:block">
              <div className="bg-white border border-gray-300 rounded">
                <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                  <h3 className="font-bold text-sm">Open Source</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Sārathi is built with transparency and community collaboration in mind.
                  </p>
                  <div className="space-y-2 text-sm">
                    <a href="#" className="block text-blue-600 hover:underline">
                      🔗 GitHub Repository
                    </a>
                    <a href="#" className="block text-blue-600 hover:underline">
                      📋 Contribute
                    </a>
                    <a href="#" className="block text-blue-600 hover:underline">
                      📄 License
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

export default AboutPage
