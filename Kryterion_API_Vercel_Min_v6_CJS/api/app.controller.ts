import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller()
export class AppController {
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
