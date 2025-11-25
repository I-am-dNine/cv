import avatarImage from "../images/d9.jpeg";  // Using relative path


export const RESUME_DATA = {
  name: "Baron Chong",
  initials: "D9",
  location: "Johor, Malaysia",
  locationLink: "https://maps.app.goo.gl/sGpjDHroHiAuLgEq6",
  about: "Backend Developer",
  summary:
    "Backend-focused software engineer with 3+ years of hands-on experience in Taiwan, evolving from frontend development to building scalable backend systems. \n\nProficient in designing RESTful APIs with Java (Jersey, Spring Boot) in microservices environments. \n\nExperienced in MongoDB tuning, CI/CD pipeline planning (Jenkins), and document automation using poi-tl. \n\nContributed to core modules of ESG compliance platforms, logistics workflow systems, and chemical safety solutions. \n\nAlso skilled in interactive UI development from Figma designs, Phaser.js web games, and cross-functional full-stack delivery. \n\nOriginally from Malaysia and currently seeking fully remote opportunities to collaborate globally and contribute backend expertise to impactful systems.",
  avatarUrl: avatarImage,
  personalWebsiteUrl: "https://github.com/I-am-dNine",
  contact: {
    email: "baronchong23@gmail.com",
    tel: "(+60)102648978",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/I-am-dNine",
        icon: "GitHubIcon",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/baronchong-d9/",
        icon: "LinkedInIcon",
      },
    ],
  },
  education: [
    {
      school: "Feng Chia University",
      degree: "Bachelor's degree in Information Engineering and Computer Science",
      start: "February 2017",
      end: "July 2021",
    },
    {
      school: "Feng Chia University",
      degree:
        "Associate's degree in Information and Network Management (Overseas Youth Technical Class)",
      start: "March 2015",
      end: "December 2016",
    },
  ],
  work: [
    {
      company: "SYSTEX (SoftMobile), Taichung City, Taiwan",
      link: "https://tw.systex.com/",
      badges: [],
      title: "Intern → Programmer → Program Analyst",
      logo: "ConsultlyLogo",
      start: "February 2021",
      end: "July 2024",
      description:
        "### Key Projects & Achievements\n\n*   **Trade Logistics Platform**\n    Joined ongoing development to optimize document generation logic and Redis-based flow control under high-load scenarios.\n    → Improved system throughput and stability in high-load scenarios.\n\n*   **Completion Order System (Survey Architecture)**\n    Led backend module development and integration based on ESG platform architecture.\n    → Core architecture later extended to the ESG and Occupational Safety platforms.\n\n*   **Recruitment Assessment System**\n    Designed backend APIs for candidate scoring and page-wise evaluation, and implemented frontend logic using React.js + Redux.\n    → Built scoring module including RWD components and login/authentication logic.\n\n*   **ESG Survey Platform**\n    Built backend APIs and data validation logic for ESG self-assessment forms.\n    → Improved questionnaire flow and backend handling, resulting in better user experience and engagement.\n\n*   **Occupational Safety Survey Platform**\n    Developed backend APIs based on existing questionnaire system architecture.\n    → Ensured reusability across internal compliance platforms.\n\n*   **Chemical Substance Management System**\n    Designed backend logic for SDS document handling, hazard flagging, and regulation-specific SOP validation.\n    → Improved SOP compliance through better data validation and rule design.\n\n### Technical Highlights\n\n*   **MongoDB Optimization & Architecture**\n    Resolved replication delays by applying CAP theory and optimizing read/write consistency in distributed environments.\n\n*   **HTML5 Game Projects (Phaser.js)**\n    Enhanced gameplay responsiveness and animation smoothness in Phaser-based marketing games (e.g. darts, slot machine, claw machine).\n    → Improved animation and gameplay flow, enhancing user engagement.\n\n*   **Responsive Campaign Pages (HTML/CSS/JS)**\n    Developed responsive landing pages with animated UI from Figma designs, ensuring cross-browser and mobile compatibility.\n    → Supported mobile/tablet optimization and browser compatibility.\n\n*   **CI/CD Flow Design Research (Jenkins)**\n    Researched Jenkins CI/CD pipeline architecture and proposed automated flow, later handed over for implementation.\n    → Final solution was handed over for implementation by successor team members.",
    },
  ],
  skills: {
    core: [
      "Java",
      "Spring Boot",
      "MongoDB",
      "RESTful APIs",
      "Redis",
      "Jenkins",
      "Git",
      "Docker",
    ],
    familiar: [
      "React.js",
      "Node.js",
      "MySQL/MSSQL",
      "HTML/CSS/JS",
      "Phaser.js",
      "Poi-tl（poi template language）",
    ],
    tools: ["GitLab", "Sourcetree", "Postman", "Figma", "Linux CLI"],
  },
  projects: [
    {
      title: "Monito",
      techStack: ["TypeScript", "Next.js", "Browser Extension", "PostgreSQL"],
      description:
        "Browser extension for debugging web applications. Includes taking screenshots, screen recording, E2E tests generation and generating bug reports",
      logo: "MonitoLogo",
      link: {
        label: "monito.dev",
        href: "https://monito.dev/",
      },
    },
  ],
} as const;