# Simulation Storage Implementation

## Overview
This document describes the changes made to enable storing simulation inputs and outputs in the database, along with an optional email field for each simulation.

## Database Changes

### Prisma Schema Updates
- **Model renamed**: `Simulations` → `Simulation`
- **New enum**: `SimulatorType` with values: `AMORTIZACAO`, `JUROS_COMPOSTOS`, `EMPRESTIMO`, `INVESTIMENTOS`
- **New field**: `email` (String, nullable) - optional user email
- **New field**: `simulatorType` (SimulatorType) - tracks which simulator was used
- **Renamed field**: `originUrl` removed (no longer needed)
- **Renamed field**: `resultData` → `outputData` (more semantic)

### Migration
- Migration created: `20251016232426_add_simulator_type_and_email`
- Successfully applied to the database

## Backend Changes

### 1. Prisma Module (NEW)
- **File**: `src/prisma/prisma.module.ts`
- **File**: `src/prisma/prisma.service.ts`
- Global module that provides database connection across all services
- Handles connection lifecycle (connect on init, disconnect on destroy)
- Includes logging for database operations

### 2. Amortização Service
- **File**: `src/simuladores/amortizacao/amortizacao.service.ts`
- Added `PrismaService` dependency injection
- New method: `salvarSimulacao()` - saves input/output to database
- Database save happens after calculation, doesn't block response if it fails
- Automatically includes `SimulatorType.AMORTIZACAO`

### 3. Juros Compostos Service
- **File**: `src/simuladores/juros-composts/juros-compostos.service.ts`
- Added `PrismaService` dependency injection
- New method: `salvarSimulacao()` - saves input/output to database
- Database save happens after calculation, doesn't block response if it fails
- Automatically includes `SimulatorType.JUROS_COMPOSTOS`

### 4. DTOs Updated
- **File**: `src/simuladores/amortizacao/dto/amortizacao-input.dto.ts`
  - Added optional `email` field with validation
  
- **File**: `src/simuladores/juros-composts/dto/juros-compostos-input.dto.ts`
  - Added optional `email` field with validation
  - Added missing imports: `IsOptional`, `ApiPropertyOptional`

### 5. App Module
- **File**: `src/app.module.ts`
- Added `PrismaModule` import to make it globally available

## Frontend Changes

### Schema Updates
- **File**: `web/src/lib/schemas/amortizacao.schema.ts`
  - Added optional `email` field with email validation
  - Accepts empty string or valid email

- **File**: `web/src/lib/schemas/juros-compostos.schema.ts`
  - Added optional `email` field with email validation
  - Accepts empty string or valid email

## How It Works

### Flow
1. User submits simulation form (with optional email)
2. Backend receives request with input data
3. Backend performs calculation
4. Backend saves both input and output to database (non-blocking)
5. Backend returns calculation results to user
6. If database save fails, error is logged but user still gets results

### Database Record Structure
```json
{
  "id": 1,
  "createdAt": "2024-10-16T12:00:00Z",
  "simulatorType": "AMORTIZACAO",
  "email": "user@example.com",
  "inputData": { /* original input */ },
  "outputData": { /* calculation results */ }
}
```

## Benefits

1. **Data Analytics**: Track which simulators are most used
2. **User Communication**: Contact users who provided email (marketing, updates)
3. **Performance Monitoring**: Analyze calculation patterns and edge cases
4. **Debugging**: Review exact inputs/outputs when users report issues
5. **Feature Development**: Understand user behavior to improve features
6. **Non-intrusive**: Email is optional, simulation works without it

## Future Enhancements

Potential additions based on this foundation:
- User authentication to view simulation history
- Email notifications with simulation results
- Simulation comparison across time periods
- Export simulation data to PDF/Excel
- Analytics dashboard for simulation usage
- Rate limiting based on email/IP
- Saved simulations for registered users

## Testing

To test the implementation:

1. **Without email**:
```bash
curl -X POST http://localhost:3000/simulators/juros-compostos \
  -H "Content-Type: application/json" \
  -d '{
    "valorInicial": 10000,
    "aporteMensal": 500,
    "tempoAplicacao": 3,
    "tempoAplicacaoUnidade": "anos",
    "taxaJuros": 11
  }'
```

2. **With email**:
```bash
curl -X POST http://localhost:3000/simulators/juros-compostos \
  -H "Content-Type: application/json" \
  -d '{
    "valorInicial": 10000,
    "aporteMensal": 500,
    "tempoAplicacao": 3,
    "tempoAplicacaoUnidade": "anos",
    "taxaJuros": 11,
    "email": "user@example.com"
  }'
```

3. **Check database**:
```sql
SELECT * FROM simulations ORDER BY created_at DESC LIMIT 10;
```

## Notes

- All simulations are saved regardless of whether email is provided
- Database saves are non-blocking - failures won't affect user experience
- The `simulatorType` enum is extensible for future simulators
- JSON fields allow flexibility - no schema changes needed for new input/output fields
