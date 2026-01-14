const { DRY_RUN } = require('./dist/scripts/migrate/migration-utils');
console.log('Environment DRY_RUN value:', process.env.DRY_RUN);
console.log('Computed DRY_RUN constant:', DRY_RUN);

if (process.env.DRY_RUN === 'false' && DRY_RUN === false) {
  console.log('Logic is CORRECT: DRY_RUN is false when env is "false"');
} else if (process.env.DRY_RUN === 'true' && DRY_RUN === true) {
  console.log('Logic is CORRECT: DRY_RUN is true when env is "true"');
} else {
  console.log('Logic is STILL WRONG');
}
