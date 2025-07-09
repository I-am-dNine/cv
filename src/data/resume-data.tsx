import {
  ClevertechLogo,
  ConsultlyLogo,
  JojoMobileLogo,
  MonitoLogo,
  NSNLogo,
  ParabolLogo,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import avatarImage from "../images/d9.jpeg";  // Using relative path

export const RESUME_DATA = {
  name: "Baron Chong",
  initials: "D9",
  location: "Johor, Malaysia",
  locationLink: "https://maps.app.goo.gl/sGpjDHroHiAuLgEq6",
  about:
    "Backend Developer",
  summary: (
    <>
      Backend-focused software engineer with 3+ years of hands-on experience in Taiwan, evolving from frontend development to building scalable backend systems. Proficient in designing RESTful APIs with Java (Jersey, Spring Boot) in microservices environments.
      Experienced in MongoDB tuning, CI/CD pipeline planning (Jenkins), and document automation using poi-tl.
      Contributed to core modules of ESG compliance platforms, logistics workflow systems, and chemical safety solutions.
      Also skilled in interactive UI development from Figma designs, Phaser.js web games, and cross-functional full-stack delivery.
      Originally from Malaysia and currently seeking new opportunities in Singapore, where I aim to contribute my cross-border experience and backend expertise to impactful systems.
    </>
  ),
  avatarUrl: avatarImage,
  // avatarI amUrl: "https://avatars.githubusercontent.com/u/91861324?v=4",
  //personalWebsiteUrl: "https://jarocki.me",
  contact: {
    email: "baronchong23@gmail.com",//"honghoe1996@gmail.com",
    tel: "(+60)102648978",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/I-am-dNine",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/baronchong-d9/",
        icon: LinkedInIcon,
      }
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
      degree: "Associate's degree in Information and Network Management (Overseas Youth Technical Class)",
      start: "March 2015",
      end: "December 2016",
    }
  ],
  work: [
    {
      company: "SYSTEX (SoftMobile), Taichung City, Taiwan",
      link: "https://tw.systex.com/", //https://tw.systex.com/about_affiliate/
      badges: [""],
      title: "Intern → Programmer → Program Analyst",
      logo: ConsultlyLogo,
      start: "February 2021",
      end: "July 2024",
      description: (
        <>
          <div className="font-bold text-lg mt-6">Key Projects & Achievements</div>
          <ul className="list-disc pl-5 mt-2 space-y-4">
            <li>
              <div className="font-semibold">Trade Logistics Platform</div>
              Joined ongoing development to optimize document generation logic and Redis-based flow control under high-load scenarios.
              <br />
              → Improved system throughput and stability in high-load scenarios.
            </li>
            <li>
              <div className="font-semibold">Completion Order System (Survey Architecture)</div>
              Led backend module development and integration based on ESG platform architecture.
              <br />
              → Core architecture later extended to the ESG and Occupational Safety platforms.
            </li>
            <li>
              <div className="font-semibold">Recruitment Assessment System</div>
              Designed backend APIs for candidate scoring and page-wise evaluation, and implemented frontend logic using React.js + Redux.
              <br />
              → Built scoring module including RWD components and login/authentication logic.
            </li>
            <li>
              <div className="font-semibold">ESG Survey Platform</div>
              Built backend APIs and data validation logic for ESG self-assessment forms.
              <br />
              → Improved questionnaire flow and backend handling, resulting in better user experience and engagement.
            </li>
            <li>
              <div className="font-semibold">Occupational Safety Survey Platform</div>
              Developed backend APIs based on existing questionnaire system architecture.
              <br />
              → Ensured reusability across internal compliance platforms.
            </li>
            <li>
              <div className="font-semibold">Chemical Substance Management System</div>
              Designed backend logic for SDS document handling, hazard flagging, and regulation-specific SOP validation.
              <br />
              → Improved SOP compliance through better data validation and rule design.
            </li>
          </ul>
          
          <div className="font-bold text-lg mt-6">Technical Highlights</div>
          <ul className="list-disc pl-5 mt-2 space-y-4">
            <li>
              <div className="font-semibold">MongoDB Optimization & Architecture</div>
              Resolved replication delays by applying CAP theory and optimizing read/write consistency in distributed environments.
            </li>
            <li>
              <div className="font-semibold">HTML5 Game Projects (Phaser.js)</div>
              Enhanced gameplay responsiveness and animation smoothness in Phaser-based marketing games (e.g. darts, slot machine, claw machine).
              <br />
              → Improved animation and gameplay flow, enhancing user engagement.
            </li>
            <li>
              <div className="font-semibold">Responsive Campaign Pages (HTML/CSS/JS)</div>
              Developed responsive landing pages with animated UI from Figma designs, ensuring cross-browser and mobile compatibility.
              <br />
              → Supported mobile/tablet optimization and browser compatibility.
            </li>
            <li>
              <div className="font-semibold">CI/CD Flow Design Research (Jenkins)</div>
              Researched Jenkins CI/CD pipeline architecture and proposed automated flow, later handed over for implementation.
              <br />
              → Final solution was handed over for implementation by successor team members.
            </li>
          </ul>
        </>
      ),
    }
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
      "Docker"
    ],
    familiar: [
      "React.js",
      "Node.js",
      "MySQL/MSSQL",
      "HTML/CSS/JS",
      "Phaser.js",
      "Poi-tl（poi template language）"
    ],
    tools: [
      "GitLab",
      "Sourcetree",
      "Postman",
      "Figma",
      "Linux CLI",
    ]
  },
  projects: []
  // projects: [
  //   {
  //     title: "Monito",
  //     techStack: ["TypeScript", "Next.js", "Browser Extension", "PostgreSQL"],
  //     description:
  //       "Browser extension for debugging web applications. Includes taking screenshots, screen recording, E2E tests generation and generating bug reports",
  //     logo: MonitoLogo,
  //     link: {
  //       label: "monito.dev",
  //       href: "https://monito.dev/",
  //     },
  //   },
  // ],
} as const;