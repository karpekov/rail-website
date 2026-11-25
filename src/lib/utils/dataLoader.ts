import peopleYaml from '../../data/people.yaml';
import projectsYaml from '../../data/projects.yaml';
import newsYaml from '../../data/news.yaml';
import funYaml from '../../data/fun.yaml';
import teachingData from '../../data/teaching.yaml';
import labRobotsYaml from '../../data/lab_robots.yaml';

export interface Member {
    name: string;
    status: 'current' | 'alum';
    degree: string;
    degree_detail: string;
    photo: string;
    year_joined?: number;
    graduation?: number;
    next_role?: string;
    website?: string;
    linkedin?: string;
    scholar?: string;
    github?: string;
    twitter?: string;
    bluesky?: string;
}

export interface Robot {
    name: string;
    status: 'current' | 'alum';
    company_name: string;
    photo: string;
    gif?: string;
    website?: string;
    video?: string;
}

export interface Project {
    title: string;
    project_description: string;
    venue?: string;
    year: number;
    image: string;
    team: string[];
    tags: string[];
    website?: string;
    pdf?: string;
    github?: string;
    video?: string;
    blog?: string;
    featured?: boolean;
}

export interface Course {
    name: string;
    semester?: string;
    description: string;
    status: 'current' | 'upcoming' | 'past';
    website?: string;
}

export interface NewsItem {
    date: string;
    content: string;
}

export interface Activity {
    title: string;
    description: string;
    image: string;
    frequency: string;
}

export const people: { faculty?: Member[]; students?: Member[] } = peopleYaml;
export const labRobots: Robot[] = labRobotsYaml.robots || [];
export const projects: { project_list?: Project[] } = projectsYaml;
export const news: { recent_news?: NewsItem[] } = newsYaml;
export const fun: { activities?: Activity[] } = funYaml;
export const teaching: Course[] = teachingData.courses;

const DEGREE_ORDER = ['professor', 'postdoc', 'phd', 'ms', 'bs'];

/** Order by degree, then by the year the member joined. Unknown degrees go last. */
export function byDegree(a: Member, b: Member): number {
    const rank = (m: Member) => {
        const i = DEGREE_ORDER.indexOf(m.degree.toLowerCase());
        return i === -1 ? DEGREE_ORDER.length : i;
    };
    return rank(a) - rank(b) || (a.year_joined || 9999) - (b.year_joined || 9999);
}
