import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller()
export class AppController {
  // --- Quarterly updates (stub) ---
@Get('updates/quarterly')
updates() {
  return [
    {
      id: '2025-Q1',
      title: 'Quarterly Update — Q1 2025',
      period: '2025-Q1',
      pdfUrl: 'https://example.com/updates/q1-2025.pdf'
    },
    {
      id: '2025-Q2',
      title: 'Quarterly Update — Q2 2025',
      period: '2025-Q2',
      pdfUrl: 'https://example.com/updates/q2-2025.pdf'
    }
  ];
}

// --- Projects list (stub) ---
@Get('projects')
projects() {
  return [
    { code: 'PULSE', name: 'FirstPulse', gate: 'G1', budgetCap: 15000000 },
    { code: 'KINV',  name: 'K‑Invest Platform', gate: 'G0', budgetCap: 20000000 },
    { code: 'KLABS', name: 'K‑Labs Ops Suite', gate: 'G2', budgetCap: 12000000 }
  ];
}

  @Get('/')
  home() {
    return {
      ok: true,
      name: 'Kryterion Minimal API (Vercel)',
      endpoints: {
        health: '/health',
        currentRound: '/rounds/current',
        myCommitments: '/commitments/me',
        createCommitment: 'POST /commitments'
      }
    };
  }

  @Get('favicon.ico')
  favicon(@Res() res: Response) {
    return res.status(204).send();
  }

  @Get('health')
  health() {
    return { ok: true, ts: new Date().toISOString() };
  }

  @Get('rounds/current')
  currentRound() {
    return {
      code: 'BASKET-A-2025',
      name: 'K-Labs Basket A',
      targetAmount: 100000000,
      minAmount: 50000000,
      status: 'OPEN',
      instrument: { cap: 2500000000, discount: 0.20 },
      openAt: new Date().toISOString(),
      closeAt: new Date(Date.now() + 30*24*3600*1000).toISOString(),
      documents: [
        { title: 'Invitation Pack', url: 'https://example.com/invitation.pdf', type: 'INVITATION' },
        { title: 'Studio SAFE', url: 'https://example.com/safe.pdf', type: 'SAFE' }
      ]
    };
  }

  @Get('commitments/me')
  myCommitments() {
    return [];
  }

  @Post('commitments')
  createCommitment(@Body() body: any) {
    const amount = Number(body?.amount ?? 0);
    return { id: 'stub-' + Math.random().toString(36).slice(2), roundId: 'BASKET-A-2025', amount, status: 'SOFT' };
  }
}
