import { NextRequest } from 'next/server';
import {
  MOCK_COHORTS,
  MOCK_LESSONS,
  MOCK_LEARNERS,
  MOCK_INTERVENTIONS,
} from '@/lib/data';
import { Cohort, Lesson, Learner, Intervention } from '@/lib/types';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

interface SearchResult {
  id: string;
  type: string;
  title: string;
  description?: string;
  score: number;
}

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || ''; // Optional: filter by entity type

  const lowerCaseQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  // If query is empty, return first 5 learners as a default
  if (!query) {
    const defaultLearners = MOCK_LEARNERS.slice(0, 5).map((learner: Learner) => ({
      id: learner.id,
      type: 'learner',
      title: learner.name,
      description: `Email: ${learner.email}, Progress: ${learner.progress}%`,
      score: 1, // Default score
    }));
    return new Response(JSON.stringify({ ok: true, data: { results: defaultLearners, total: defaultLearners.length, query: query } }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  // Search Cohorts
  if (type === '' || type === 'cohort') {
    MOCK_COHORTS.forEach((cohort: Cohort) => {
      if (
        cohort.name.toLowerCase().includes(lowerCaseQuery) ||
        cohort.courseName.toLowerCase().includes(lowerCaseQuery)
      ) {
        results.push({
          id: cohort.id,
          type: 'cohort',
          title: cohort.name,
          description: `Course: ${cohort.courseName}, Status: ${cohort.status}`,
          score: 1,
        });
      }
    });
  }

  // Search Lessons
  if (type === '' || type === 'lesson') {
    MOCK_LESSONS.forEach((lesson: Lesson) => {
      if (lesson.title.toLowerCase().includes(lowerCaseQuery)) {
        results.push({
          id: lesson.id,
          type: 'lesson',
          title: lesson.title,
          description: `Content Type: ${lesson.contentType}, Order: ${lesson.orderIndex}`,
          score: 1,
        });
      }
    });
  }

  // Search Learners
  if (type === '' || type === 'learner') {
    MOCK_LEARNERS.forEach((learner: Learner) => {
      if (
        learner.name.toLowerCase().includes(lowerCaseQuery) ||
        learner.email.toLowerCase().includes(lowerCaseQuery)
      ) {
        results.push({
          id: learner.id,
          type: 'learner',
          title: learner.name,
          description: `Email: ${learner.email}, Progress: ${learner.progress}%`,
          score: 1,
        });
      }
    });
  }

  // Search Interventions (by type or status)
  if (type === '' || type === 'intervention') {
    MOCK_INTERVENTIONS.forEach((intervention: Intervention) => {
      if (
        intervention.type.toLowerCase().includes(lowerCaseQuery) ||
        intervention.status.toLowerCase().includes(lowerCaseQuery) ||
        (intervention.notes && intervention.notes.toLowerCase().includes(lowerCaseQuery))
      ) {
        results.push({
          id: intervention.id,
          type: 'intervention',
          title: `${intervention.type} for Learner ${intervention.learnerId}`,
          description: `Status: ${intervention.status}, Created: ${new Date(intervention.createdAt).toLocaleDateString()}`,
          score: 0.8, // Slightly lower score, might be less primary for general search
        });
      }
    });
  }

  // Sort results (e.g., by score, then alphabetically) and limit to 20
  results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  const limitedResults = results.slice(0, 20);

  return new Response(JSON.stringify({ ok: true, data: { results: limitedResults, total: limitedResults.length, query: query } }), {
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}