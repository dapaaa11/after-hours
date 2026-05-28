import { frontendCategory } from './frontend';
import { backendCategory } from './backend';
import { renderingCategory } from './rendering';
import { toolingCategory } from './tooling';

export type Topic = {
    id: string;
    title: string;
    titleId?: string;
    content: string;
    contentId?: string;
    keywords: string[];
};

export type Category = {
    id: string;
    label: string;
    labelId?: string;
    topics: Topic[];
};

export const referenceData: Category[] = [
    frontendCategory,
    backendCategory,
    renderingCategory,
    toolingCategory,
];
