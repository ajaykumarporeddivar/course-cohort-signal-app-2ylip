import { NextRequest } from 'next/server';
import {
  MOCK_COHORTS,
  MOCK_LESSONS,
  MOCK_LEARNERS,
  MOCK_ACTIVITY_LOGS,
  MOCK_INTERVENTIONS,
  STATS,
} from '@/lib/data';
import { ApiResponse } from '@/lib/types';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(): Promise<Response> {
  const data = {
    cohorts: MOCK_COHORTS,
    lessons: MOCK_LESSONS,
    learners: MOCK_LEARNERS,
    activityLogs: MOCK_ACTIVITY_LOGS,
    interventions: MOCK_INTERVENTIONS,
    stats: STATS,
  };

  const totals = {
    cohorts: MOCK_COHORTS.length,
    lessons: MOCK_LESSONS.length,
    learners: MOCK_LEARNERS.length,
    activityLogs: MOCK_ACTIVITY_LOGS.length,
    interventions: MOCK_INTERVENTIONS.length,
  };

  const overallTotal = Object.values(totals).reduce((sum, count) => sum + count, 0);

  const response: ApiResponse = {
    ok: true,
    data: {
      ...data,
      totals,
    },
    total: overallTotal,
  };

  return new Response(JSON.stringify(response), {
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

export async function POST(request: NextRequest): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch (error: unknown) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  const response: ApiResponse = {
    ok: true,
    message: 'Demo mode — data not persisted',
    received: body,
  };

  return new Response(JSON.stringify(response), {
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}