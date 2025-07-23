"use client"

const HelpFAQ = () => {
  const faqs = [
    {
      question: "How do I generate a blog post?",
      answer:
        "Enter a title in the submission form, optionally add custom instructions, then click 'generate'. The AI will create content based on your input and any selected Reddit posts or RSS articles.",
    },
    {
      question: "Can I use Reddit posts as source material?",
      answer:
        "Yes! Enter a subreddit name, click 'load' to fetch recent posts, then select one from the dropdown. The post content and top comments will be used to generate your blog.",
    },
    {
      question: "How do I publish my generated content?",
      answer:
        "After generating content, review it in the preview section. If satisfied, click the orange 'publish' button in the content preview header. Make sure to select an image if you want one included.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "The tool automatically finds related images during generation. Click on any image in the 'Related Images' section to select it for publishing. Selected images will be included with your blog post.",
    },
    {
      question: "Can I edit the generated content before publishing?",
      answer:
        "Currently, you can review the generated content in the preview. For major edits, you can regenerate with different prompts or source material. Direct editing features are planned for future updates.",
    },
    {
      question: "How do RSS feeds work?",
      answer:
        "The tool fetches articles from configured RSS feeds. Select an article from the dropdown to use its title and content as source material for blog generation.",
    },
    {
      question: "What happens to my published posts?",
      answer:
        "Published posts are sent to your configured publishing platform. You'll receive a confirmation with the post URL. Recent posts appear in your dashboard feed.",
    },
    {
      question: "Is there a limit on post generation?",
      answer:
        "Usage limits depend on your account type and API quotas. Check the sidebar stats to monitor your daily usage including posts generated, words created, and images found.",
    },
  ]

  const helpTopics = [
    {
      title: "Getting Started",
      items: [
        "Creating your first blog post",
        "Understanding the interface",
        "Setting up RSS feeds",
        "Connecting to Reddit",
      ],
    },
    {
      title: "Content Generation",
      items: [
        "Writing effective prompts",
        "Using Reddit as source material",
        "Incorporating RSS articles",
        "Image selection and usage",
      ],
    },
    {
      title: "Publishing",
      items: ["Review and edit workflow", "Publishing platforms", "SEO optimization", "Content management"],
    },
    {
      title: "Troubleshooting",
      items: ["Generation failures", "Publishing errors", "API connection issues", "Performance optimization"],
    },
  ]

  return (
    <div className="min-h-screen bg-white  ">
      {/* Header */}

      <div className="w-full px-2 sm:px-4 py-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 w-full">
            {/* Page Header */}
            
              <div className="bg-white border border-gray-300 rounded mb-6 w-full">
                <div className="bg-blue-500 text-white px-4 py-3 rounded-t ">
                  <h1 className="font-bold text-lg">Help & FAQ</h1>
                  <p className="text-blue-100 text-sm">Get help with Sārathi AI Blog Generator</p>
                </div>
              </div>
            

            {/* Help Topics */}
            
              <div className="bg-white border border-gray-300 rounded mb-6 w-full ">
                <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                  <h2 className="font-bold text-sm">Help Topics</h2>
                </div>
                <div className="p-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {helpTopics.map((topic, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-bold text-blue-600 text-sm">{topic.title}</h3>
                        <ul className="space-y-1">
                          {topic.items.map((item, i) => (
                            <li key={i} className="text-sm">
                              <a href="#" className="text-blue-600 hover:underline">
                                • {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            

            {/* FAQ Section */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h2 className="font-bold text-sm">Frequently Asked Questions</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h3 className="font-bold text-sm text-gray-800 mb-2">{faq.question}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            {/* Quick Help */}
            <div className="hidden md:block">
              <div className="bg-white border border-gray-300 rounded mb-4">
                <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                  <h3 className="font-bold text-sm">Quick Help</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3 text-sm">
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <h4 className="font-bold text-blue-800 mb-1">Need immediate help?</h4>
                      <p className="text-blue-700">Submit a bug report or feature request using our feedback form.</p>
                    </div>
                    <div className="space-y-2">
                      <a href="#" className="block text-blue-600 hover:underline">
                        📧 Contact Support
                      </a>
                      <a href="#" className="block text-blue-600 hover:underline">
                        🐛 Report Bug
                      </a>
                      <a href="#" className="block text-blue-600 hover:underline">
                        💡 Feature Request
                      </a>
                      <a href="#" className="block text-blue-600 hover:underline">
                        📖 Documentation
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="hidden md:block">
              <div className="bg-white border border-gray-300 rounded">
                <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                  <h3 className="font-bold text-sm">Contact Information</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-2 text-blue-600">support@sarathi.ai</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Response Time:</span>
                      <span className="ml-2">24-48 hours</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className="ml-2 text-green-600">All systems operational</span>
                    </div>
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

export default HelpFAQ
