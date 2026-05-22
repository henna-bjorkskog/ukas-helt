// node tests.js

function isoWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

let passed = 0;
let failed = 0;

function check(label, got, expected) {
  if (got === expected) {
    console.log(`  PASS  ${label}`);
    passed++;
  } else {
    console.log(`  FAIL  ${label} — expected ${expected}, got ${got}`);
    failed++;
  }
}

console.log('\nNormal weeks');
check('Mon 2025-01-06 → week 2',  isoWeek(new Date(2025, 0,  6)), 2);
check('Mon 2025-01-13 → week 3',  isoWeek(new Date(2025, 0, 13)), 3);
check('Mon 2025-05-19 → week 21', isoWeek(new Date(2025, 4, 19)), 21);

console.log('\nWeek 1 of year');
check('Mon 2024-01-01 → week 1',  isoWeek(new Date(2024, 0,  1)), 1);
check('Mon 2025-12-29 → week 1 (2026)', isoWeek(new Date(2025, 11, 29)), 1);
check('Mon 2024-12-30 → week 1 (2025)', isoWeek(new Date(2024, 11, 30)), 1);

console.log('\nYear boundary: late Dec belongs to next year');
check('Mon 2018-12-31 → week 1 (2019)', isoWeek(new Date(2018, 11, 31)), 1);
check('Mon 2023-01-02 → week 1 (2023)', isoWeek(new Date(2023, 0,   2)), 1);

console.log('\nWeek 53 years (years that have 53 ISO weeks)');
check('Mon 2015-12-28 → week 53', isoWeek(new Date(2015, 11, 28)), 53);
check('Mon 2020-12-28 → week 53', isoWeek(new Date(2020, 11, 28)), 53);
check('Mon 2026-12-28 → week 53', isoWeek(new Date(2026, 11, 28)), 53);

console.log('\nEarly Jan belonging to previous year\'s last week');
check('Mon 2015-12-28 is NOT week 1 of 2016', isoWeek(new Date(2015, 11, 28)), 53);
check('Mon 2016-01-04 → week 1 (2016)', isoWeek(new Date(2016, 0,  4)), 1);

console.log('\ngetInitials');
function getInitials(name) {
  return name.split(/[\s-]+/).map(w => w[0]).join('').toUpperCase();
}

check('Two names → two initials',         getInitials('Ola Nordmann'), 'ON');
check('Three names → three initials',         getInitials('Ola Elmer Nordmann'), 'OEN');
check('Name with hyphen → all initials', getInitials('Ola-Elmer Nordmann'), 'OEN');
check('Single name → one letter',         getInitials('Ola'), 'O');
check('Already uppercase',                getInitials('KARI NORDMANN'), 'KN');
check('Lowercase → uppercased',           getInitials('kari nordmann'), 'KN');

console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
