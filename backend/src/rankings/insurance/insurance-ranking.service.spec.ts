import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceRankingService } from './insurance-ranking.service';
import { InsuranceScoreCalculator } from './calc/score-calculator';
import { INSURANCE_DATA } from './data/insurance.data';

describe('InsuranceRankingService', () => {
  let service: InsuranceRankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsuranceRankingService],
    }).compile();

    service = module.get<InsuranceRankingService>(InsuranceRankingService);
  });

  it('should calculate weighted score correctly', () => {
    const sample = INSURANCE_DATA[0];
    const score = InsuranceScoreCalculator.calculateScore(sample.raw_scores);

    expect(score).toBeCloseTo(9.07, 2);
  });

  it('should rank insurances by score and flag best option', async () => {
    const result = await service.getRanking();

    expect(result.total).toBeGreaterThan(0);
    expect(result.bestOption.rank).toBe(1);
    expect(result.bestOption.isBestOption).toBe(true);
    expect(result.items[0].name).toBe(result.bestOption.name);

    // Scores should be in descending order
    const scores = result.items.map((item) => item.score);
    for (let i = 0; i < scores.length - 1; i++) {
      expect(scores[i]).toBeGreaterThanOrEqual(scores[i + 1]);
    }
  });

  it('should apply filters before ranking', async () => {
    const result = await service.getRanking({
      max_preco_mensal: 450,
    });

    expect(result.total).toBe(3);
    expect(
      result.items.every(
        (item) => item.pricing.preco_mensal_estimado_max <= 450,
      ),
    ).toBe(true);
    expect(result.items[0].rank).toBe(1);
  });
});
