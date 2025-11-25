"use client";

import React, { useState, useEffect } from "react";
import { RESUME_DATA } from "@/data/resume-data";
import { Header } from "./Header";
import { Summary } from "./Summary";
import { WorkExperience } from "./WorkExperience";
import { Education } from "./Education";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { CommandMenu } from "@/components/command-menu";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, Save, Pencil, Eye } from "lucide-react";

type ResumeData = typeof RESUME_DATA;

interface ResumeBuilderProps {
    initialData: ResumeData;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
    initialData,
}) => {
    const [resumeData, setResumeData] = useState<ResumeData>(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const savedData = localStorage.getItem("resume-data");
        if (savedData) {
            try {
                setResumeData(JSON.parse(savedData));
            } catch (e) {
                console.error("Failed to parse saved resume data", e);
            }
        }
    }, []);

    useEffect(() => {
        if (hasMounted) {
            localStorage.setItem("resume-data", JSON.stringify(resumeData));
        }
    }, [resumeData, hasMounted]);

    const handleReset = () => {
        if (confirm("Are you sure you want to reset to default data?")) {
            setResumeData(initialData);
            localStorage.removeItem("resume-data");
        }
    };

    const handleDownload = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "resume-data.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const updateData = (path: string, value: any) => {
        setResumeData((prev) => {
            const newData = { ...prev };
            const keys = path.split(".");
            let current: any = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    // Helper to get command menu links
    const getCommandMenuLinks = () => {
        const links: { url: string; title: string }[] = [];
        // if (resumeData.personalWebsiteUrl) {
        //   links.push({
        //     url: resumeData.personalWebsiteUrl,
        //     title: "Personal Website",
        //   });
        // }
        // return [
        //     ...links,
        //     ...resumeData.contact.social.map((socialMediaLink) => ({
        //         url: socialMediaLink.url,
        //         title: socialMediaLink.name,
        //     })),
        // ];
        return [];
    };

    if (!hasMounted) return null;

    return (
        <main
            className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-11 md:p-16"
            id="main-content"
        >
            <div className="fixed bottom-4 right-4 z-50 flex gap-2 print:hidden">
                <Button
                    variant={isEditing ? "default" : "outline"}
                    size="icon"
                    onClick={() => setIsEditing(!isEditing)}
                    title={isEditing ? "Preview" : "Edit"}
                >
                    {isEditing ? <Eye className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                </Button>
                {isEditing && (
                    <>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleReset}
                            title="Reset to Default"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleDownload}
                            title="Download JSON"
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                    </>
                )}
            </div>

            <div className="sr-only">
                <h1>{resumeData.name}&apos;s Resume</h1>
            </div>

            <section
                className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4 print:max-w-none"
                aria-label="Resume Content"
            >
                <Header
                    resumeData={resumeData}
                    isEditing={isEditing}
                    onUpdate={updateData}
                />

                <div className="space-y-8 print:space-y-4">
                    <Summary
                        summary={resumeData.summary}
                        isEditing={isEditing}
                        onUpdate={(val) => updateData("summary", val)}
                    />

                    <Skills
                        skills={resumeData.skills}
                        isEditing={isEditing}
                        onUpdate={(val) => updateData("skills", val)}
                    />

                    <WorkExperience
                        work={resumeData.work}
                        isEditing={isEditing}
                        onUpdate={(val) => updateData("work", val)}
                    />

                    <Education
                        education={resumeData.education}
                        isEditing={isEditing}
                        onUpdate={(val) => updateData("education", val)}
                    />

                    {/* <Projects
                        projects={resumeData.projects}
                        isEditing={isEditing}
                        onUpdate={(val) => updateData("projects", val)}
                    /> */}
                </div>
            </section>

            <nav className="print:hidden" aria-label="Quick navigation">
                <CommandMenu links={getCommandMenuLinks()} />
            </nav>
        </main>
    );
};
