"""
All the text content of the portfolio lives here.

To update your portfolio (new project, new internship, new certificate...)
just edit this file - no HTML needed. Restart/refresh the page to see changes.
"""

PROFILE = {
    "name": "Sri Abirami S",
    "first_name": "Sri Abirami",
    "headline": "AI Full-Stack Developer in the making",
    "roles": [
        "AI Full-Stack Developer",
        "Agentic AI Builder",
        "Python & JavaScript Developer",
        "Curious Problem Solver",
    ],
    "objective": (
        "Curious and motivated Computer Application graduate with interest in AI, "
        "seeking a role to explore new technologies and build real-world applications."
    ),
    "about": [
        "I'm a BCA student at M.I.E.T Arts and Science College, Trichy, graduating in 2026. "
        "I enjoy turning ideas into working software, especially applications powered by AI.",
        "Recently I built an AI voice-based tour booking assistant that listens to a "
        "traveller, understands the request and saves the booking to a database. "
        "As an AI Full-Stack intern at Akilam Technology I worked on APIs and chatbot "
        "modules for AI-based web applications.",
        "I'm looking for a role where I can keep learning new technologies and ship "
        "real-world products.",
    ],
    "location": "Trichy, Tamil Nadu, India",
    "email": "sriabirami168@gmail.com",
    "phone": "+91 63745 35855",
    "phone_href": "+916374535855",
    "linkedin": "https://www.linkedin.com/in/sri-abirami-807765382",
    "github": "",  # e.g. "https://github.com/your-username" - shown only if filled in
    "photo": "portfolio/img/profile.jpg",
}

STATS = [
    {"value": "2", "label": "Internships"},
    {"value": "3", "label": "Certifications"},
    {"value": "2", "label": "Projects"},
    {"value": "2026", "label": "BCA graduate"},
]

SKILL_GROUPS = [
    {"title": "Languages", "icon": "code", "items": ["Python", "JavaScript", "HTML", "CSS"]},
    {"title": "Frameworks", "icon": "layers", "items": ["FastAPI", "React.js", "Node.js", "Agentic AI"]},
    {"title": "AI Skills", "icon": "spark", "items": ["Agentic AI Development", "Prompt Engineering", "Automation"]},
    {"title": "Tools & Database", "icon": "tool", "items": ["GitHub", "VS Code", "Antigravity", "SQL"]},
    {"title": "Soft Skills", "icon": "people", "items": ["Better Communication", "Leadership", "Teamwork"]},
]

PROJECTS = [
    {
        "title": "AI Voice-Based Tour Booking Assistant",
        "kind": "Featured project",
        "summary": "A conversational AI agent that books tours through voice input.",
        "points": [
            "Designed an AI based conversational agent to handle tour booking through voice input.",
            "Processed audio streams and converted speech into structured user requests.",
            "Implemented entity extraction for destination, travel dates, number of participants and constraints.",
            "Integrated the AI layer with a database (persistence layer) to store and finalize bookings.",
        ],
        "tags": ["Agentic AI", "Speech to text", "Entity extraction", "SQL"],
        "link": "",  # add a GitHub / demo link here if you have one
    },
    {
        "title": "Portfolio Website",
        "kind": "Personal project",
        "summary": "This site - first built with HTML, CSS and JavaScript, now powered by Django.",
        "points": [
            "Created a personal portfolio using HTML, CSS, and JavaScript.",
            "Extended it with Python and Django: content-driven pages and a contact form that saves messages to a database.",
        ],
        "tags": ["HTML", "CSS", "JavaScript", "Django"],
        "link": "",
    },
]

EXPERIENCE = [
    {
        "role": "AI Full Stack Intern",
        "org": "Akilam Technology",
        "period": "January 2026",
        "description": "Worked on AI-based web applications. Developed APIs and chatbot modules.",
    },
    {
        "role": "IT & Frontend Intern",
        "org": "Shasaa Groups",
        "period": "July 2025",
        "description": "Worked on IT support, frontend assistance, documentation, and soft skill development.",
    },
]

EDUCATION = [
    {
        "title": "BCA (Bachelor of Computer Application)",
        "school": "M.I.E.T Arts and Science College, Trichy-7",
        "period": "2023 - 2026",
    },
    {
        "title": "HSC",
        "school": "Seventh Day Adventist Group Of School, Trichy",
        "period": "2022 - 2023",
    },
    {
        "title": "SSLC",
        "school": "The British Matriculation School, Trichy",
        "period": "2020 - 2021",
    },
]

CERTIFICATIONS = [
    {"title": "Front End Web Development", "issuer": "Infosys Springboard", "date": "Dec 2025"},
    {"title": "AI Workshop", "issuer": "Akilam Technology", "date": ""},
    {"title": "Internship on AI Full Stack Development", "issuer": "Akilam Technology", "date": ""},
]
