"use client"

const FounderPage = () => {
  const projects = [
    {
      name: "Online Grocery Store",
      description: "A fully functional e-commerce platform for grocery shopping with modern UI/UX",
      tech: "Next.js, React, Strapi, Tailwind CSS",
      type: "E-commerce",
    },
    {
      name: "Realtime Chat App",
      description: "React-based web application allowing users to chat in real time",
      tech: "React.js, Firebase, Bootstrap",
      type: "Social",
    },
    {
      name: "Covid-19 Tracker",
      description: "Daily and weekly updated statistics tracking COVID-19 cases worldwide",
      tech: "JavaScript, CSS, HTML, APIs",
      type: "Analytics",
    },
    {
      name: "ExploreDay Blog",
      description: "Personal blog focused on gaming and tech news with monetization",
      tech: "Blogger, HTML, CSS, Affiliate Marketing",
      type: "Content",
    },
  ]

  const skills = [
    { category: "Languages", items: ["C/C++", "JavaScript", "HTML", "CSS"] },
    { category: "Frontend", items: ["React.js", "React Native", "Next.js"] },
    { category: "Backend", items: ["Node.js", "REST APIs", "Strapi CMS"] },
    { category: "Database", items: ["MySQL",  "Firebase", "Cloud Firestore"] },
    { category: "Tools", items: [ "GitHub", "Docker", "Ant Design"] },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Header */}
            <div className="bg-white border border-gray-300 rounded mb-6">
  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-8 rounded-t">
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden">
        {/* Replace with your actual image path */}
        <img 
          src="/kartikey.jpg" 
          alt="Kartikey Septa"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="font-bold text-3xl mb-2">Yash Kag</h1>
        <p className="text-blue-100 text-lg">Frontend Developer</p>
        <p className="text-blue-200 text-sm">Supporter of Sārathi AI Blog Generator</p>
      </div>
    </div>
  </div>
  <div className="p-6">
    <p className="text-gray-700 leading-relaxed">
      Passionate software engineer with expertise in full-stack development, specializing in React.js and
      React Native applications. Currently working at EMeelan Private Limited while building innovative
      AI-powered tools like Sārathi to democratize content creation.
    </p>
  </div>
</div>

            {/* Experience */}
            <div className="bg-white border border-gray-300 rounded mb-6">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h2 className="font-bold text-sm">Professional Experience</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">Software Engineer | React Developer</h3>
                        <p className="text-blue-600 font-medium">EMeelan Private Limited</p>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Dec 2023 – Present</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 mt-3">
                      <li>
                        • Developed cross-platform applications using React.js for web and React Native for mobile
                      </li>
                      <li>• Ensured seamless navigation with React Navigation (mobile) and React Router (web)</li>
                      <li>• Integrated RESTful APIs, user authentication, and third-party libraries</li>
                      <li>• Focused on security, performance optimization, and reducing load times</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">Full-Stack Web Developer</h3>
                        <p className="text-green-600 font-medium">Community Business Platform</p>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Core Team Member</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 mt-3">
                      <li>• Built custom REST API for business analytics with PostgreSQL integration</li>
                      <li>• Optimized Dashboard component reducing landing page load times significantly</li>
                      <li>• Implemented pagination system for enhanced data retrieval efficiency</li>
                      <li>• Created pincode data import service for streamlined geographic access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white border border-gray-300 rounded mb-6">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h2 className="font-bold text-sm">Notable Projects</h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded p-4 hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-sm text-blue-600">{project.name}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{project.type}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      <div className="text-xs text-gray-500">
                        <strong>Tech:</strong> {project.tech}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h2 className="font-bold text-sm">Education</h2>
              </div>
              <div className="p-6">
                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">Bachelor of Technology in Information Technology</h3>
                      <p className="text-purple-600 font-medium">Jawaharlal Institute of Technology, Borawan</p>
                      <p className="text-sm text-gray-600 mt-1">CGPA: 7.96</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">2019-2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            {/* Contact Info */}
            <div className="bg-white border border-gray-300 rounded mb-4">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h3 className="font-bold text-sm">Contact Information</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">📧</span>
                    <a href="mailto:kartikeysepta@gmail.com" className="text-blue-600 hover:underline">
                      kartikeysepta@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">📱</span>
                    <a href="tel:+919144116511" className="text-blue-600 hover:underline">
                      +91-9144116511
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">💼</span>
                    <a href="#" className="text-blue-600 hover:underline">
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">🐙</span>
                    <a href="#" className="text-blue-600 hover:underline">
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="bg-white border border-gray-300 rounded mb-4">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h3 className="font-bold text-sm">Technical Skills</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {skills.map((skillGroup, index) => (
                    <div key={index}>
                      <h4 className="font-bold text-xs text-gray-700 mb-2">{skillGroup.category}</h4>
                      <div className="flex flex-wrap gap-1">
                        {skillGroup.items.map((skill, i) => (
                          <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Focus */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
                <h3 className="font-bold text-sm">Current Focus</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <h4 className="font-bold text-blue-800 mb-1">🚀 Building Sārathi</h4>
                    <p className="text-blue-700">Developing AI-powered content generation tools</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <h4 className="font-bold text-green-800 mb-1">💼 Professional Growth</h4>
                    <p className="text-green-700">Expanding expertise in React ecosystem</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded p-3">
                    <h4 className="font-bold text-purple-800 mb-1">📝 Content Creation</h4>
                    <p className="text-purple-700">Running ExploreDay tech blog</p>
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

export default FounderPage
