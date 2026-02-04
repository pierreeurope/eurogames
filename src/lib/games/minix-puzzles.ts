// MiniX Daily Puzzles
// Each puzzle has a 5x5 grid, clues for across and down

import { PuzzleData } from '@/types/minix';

export const PUZZLES: PuzzleData[] = [
  {
    id: 1,
    date: '2024-01-01',
    grid: [
      ['S', 'T', 'A', 'R', 'S'],
      ['H', 'O', 'U', 'S', 'E'],
      ['A', 'R', 'E', 'N', 'A'],
      ['R', 'I', 'V', 'E', 'R'],
      ['P', 'E', 'A', 'R', 'S'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Celestial bodies', answer: 'STARS', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'Home', answer: 'HOUSE', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Sports venue', answer: 'ARENA', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Flowing water body', answer: 'RIVER', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Green fruits', answer: 'PEARS', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Pointed', answer: 'SHARP', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Journeys', answer: 'TOURS', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Avenue (abbr.)', answer: 'AVEAA', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Rascal', answer: 'RISER', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Listens', answer: 'SEARS', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 2,
    date: '2024-01-02',
    grid: [
      ['B', 'R', 'A', 'V', 'E'],
      ['L', 'I', 'G', 'H', 'T'],
      ['A', 'N', 'G', 'E', 'R'],
      ['Z', 'E', 'B', 'R', 'A'],
      ['E', 'N', 'D', 'E', 'D'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Courageous', answer: 'BRAVE', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'Not heavy', answer: 'LIGHT', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Strong emotion', answer: 'ANGER', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Striped animal', answer: 'ZEBRA', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Finished', answer: 'ENDED', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Fire', answer: 'BLAZE', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Ring-shaped', answer: 'RINGER', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Old', answer: 'AGED', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Worth', answer: 'VALUE', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Consumed food', answer: 'ETARD', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 3,
    date: '2024-01-03',
    grid: [
      ['P', 'L', 'A', 'N', 'T'],
      ['R', 'A', 'D', 'I', 'O'],
      ['I', 'D', 'E', 'A', 'S'],
      ['D', 'E', 'A', 'L', 'S'],
      ['E', 'R', 'A', 'S', 'E'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Green living thing', answer: 'PLANT', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'AM/FM device', answer: 'RADIO', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Thoughts', answer: 'IDEAS', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Business agreements', answer: 'DEALS', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Remove marks', answer: 'ERASE', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Satisfaction', answer: 'PRIDE', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Stairway', answer: 'LADDER', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Plus', answer: 'ADDED', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Fingertip protector', answer: 'NAILS', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Burdens', answer: 'TOSS', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 4,
    date: '2024-01-04',
    grid: [
      ['C', 'L', 'E', 'A', 'N'],
      ['R', 'I', 'V', 'E', 'R'],
      ['A', 'G', 'E', 'N', 'T'],
      ['F', 'I', 'N', 'A', 'L'],
      ['T', 'R', 'E', 'N', 'D'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Spotless', answer: 'CLEAN', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'Flowing stream', answer: 'RIVER', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Spy', answer: 'AGENT', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Last', answer: 'FINAL', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Fashion direction', answer: 'TREND', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Skillful', answer: 'CRAFT', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Residing', answer: 'LIVING', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Occurrence', answer: 'EVENT', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Region', answer: 'ARENA', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Lease', answer: 'RENTAL', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 5,
    date: '2024-01-05',
    grid: [
      ['G', 'R', 'A', 'P', 'E'],
      ['R', 'O', 'U', 'N', 'D'],
      ['E', 'V', 'E', 'N', 'T'],
      ['E', 'I', 'G', 'H', 'T'],
      ['N', 'E', 'S', 'T', 'S'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Wine fruit', answer: 'GRAPE', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'Circular', answer: 'ROUND', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Happening', answer: 'EVENT', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'After seven', answer: 'EIGHT', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Bird homes', answer: 'NESTS', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Verdant', answer: 'GREEN', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Stove part', answer: 'OVEN', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Visitors', answer: 'AUGES', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Puncture', answer: 'PNHT', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Consumes', answer: 'EDTTS', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 6,
    date: '2024-01-06',
    grid: [
      ['S', 'P', 'A', 'C', 'E'],
      ['T', 'O', 'W', 'E', 'R'],
      ['O', 'P', 'E', 'R', 'A'],
      ['R', 'E', 'E', 'D', 'S'],
      ['M', 'A', 'T', 'E', 'S'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Outer region', answer: 'SPACE', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'Tall structure', answer: 'TOWER', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Musical drama', answer: 'OPERA', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Marsh plants', answer: 'REEDS', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Friends', answer: 'MATES', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Weather event', answer: 'STORM', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Verse', answer: 'POEM', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Aweather', answer: 'AWEE', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Credit', answer: 'CEDES', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Periods', answer: 'ERAS', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 7,
    date: '2024-01-07',
    grid: [
      ['W', 'A', 'T', 'E', 'R'],
      ['A', 'L', 'O', 'N', 'E'],
      ['V', 'I', 'N', 'E', 'S'],
      ['E', 'N', 'T', 'E', 'R'],
      ['S', 'E', 'E', 'D', 'S'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'H2O', answer: 'WATER', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'By oneself', answer: 'ALONE', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Climbing plants', answer: 'VINES', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Go in', answer: 'ENTER', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Plant starters', answer: 'SEEDS', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Ocean movement', answer: 'WAVES', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Extraterrestrial', answer: 'ALIEN', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Pitches', answer: 'TONES', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Conclusions', answer: 'ENDED', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Uses a rubber', answer: 'RESER', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 8,
    date: '2024-01-08',
    grid: [
      ['M', 'O', 'N', 'E', 'Y'],
      ['A', 'R', 'E', 'N', 'A'],
      ['P', 'I', 'A', 'N', 'O'],
      ['L', 'I', 'N', 'E', 'S'],
      ['E', 'D', 'G', 'E', 'S'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Cash', answer: 'MONEY', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'Stadium', answer: 'ARENA', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Musical instrument', answer: 'PIANO', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Queues', answer: 'LINES', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Borders', answer: 'EDGES', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Tree product', answer: 'MAPLE', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Beginning', answer: 'ORIG', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Close by', answer: 'NEANG', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Power source', answer: 'ENEES', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Affirmatives', answer: 'YAOSS', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 9,
    date: '2024-01-09',
    grid: [
      ['F', 'L', 'A', 'M', 'E'],
      ['R', 'I', 'V', 'E', 'R'],
      ['U', 'N', 'I', 'T', 'S'],
      ['I', 'D', 'E', 'A', 'L'],
      ['T', 'E', 'N', 'S', 'E'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Fire part', answer: 'FLAME', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'Water flow', answer: 'RIVER', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Measurements', answer: 'UNITS', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Perfect', answer: 'IDEAL', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Strained', answer: 'TENSE', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Berry', answer: 'FRUIT', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Coating', answer: 'LINED', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Lively', answer: 'AVIAN', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Plates', answer: 'METAL', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Renting', answer: 'ERLSE', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 10,
    date: '2024-01-10',
    grid: [
      ['H', 'E', 'A', 'R', 'T'],
      ['O', 'C', 'E', 'A', 'N'],
      ['U', 'N', 'D', 'E', 'R'],
      ['S', 'T', 'A', 'R', 'S'],
      ['E', 'A', 'R', 'T', 'H'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Love symbol', answer: 'HEART', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'Sea', answer: 'OCEAN', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Below', answer: 'UNDER', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Celebrities', answer: 'STARS', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Our planet', answer: 'EARTH', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Dwelling', answer: 'HOUSE', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Consume', answer: 'EATER', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Assist', answer: 'ADARA', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Contest', answer: 'RACES', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Hazard', answer: 'TRASH', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 11,
    date: '2024-01-11',
    grid: [
      ['D', 'R', 'E', 'A', 'M'],
      ['R', 'I', 'V', 'E', 'R'],
      ['A', 'G', 'E', 'N', 'T'],
      ['M', 'A', 'N', 'O', 'R'],
      ['A', 'R', 'T', 'S', 'Y'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Night vision', answer: 'DREAM', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'Stream', answer: 'RIVER', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Representative', answer: 'AGENT', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Estate', answer: 'MANOR', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Creative', answer: 'ARTSY', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Theater', answer: 'DRAMA', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Competition', answer: 'RIGAR', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Occurrences', answer: 'EVENT', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Solitary', answer: 'ALONS', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Customs', answer: 'MERRY', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 12,
    date: '2024-01-12',
    grid: [
      ['T', 'R', 'A', 'I', 'N'],
      ['O', 'U', 'T', 'E', 'R'],
      ['W', 'I', 'N', 'D', 'S'],
      ['E', 'A', 'G', 'L', 'E'],
      ['R', 'A', 'N', 'C', 'H'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Rail transport', answer: 'TRAIN', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'External', answer: 'OUTER', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Air currents', answer: 'WINDS', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Bird of prey', answer: 'EAGLE', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Farm estate', answer: 'RANCH', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Building', answer: 'TOWER', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Regulations', answer: 'RUIAR', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Aerial', answer: 'ATNGN', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Inactive', answer: 'IEDLC', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Openings', answer: 'NRSEH', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 13,
    date: '2024-01-13',
    grid: [
      ['L', 'I', 'G', 'H', 'T'],
      ['E', 'A', 'G', 'E', 'R'],
      ['A', 'V', 'O', 'I', 'D'],
      ['R', 'I', 'D', 'E', 'S'],
      ['N', 'E', 'E', 'D', 'S'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Illumination', answer: 'LIGHT', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'Keen', answer: 'EAGER', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Evade', answer: 'AVOID', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Journeys', answer: 'RIDES', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Requirements', answer: 'NEEDS', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Acquire', answer: 'LEARN', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Alive', answer: 'IVID', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Excellent', answer: 'GOODE', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Conceals', answer: 'HIDES', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Vegetation', answer: 'TREDS', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
  {
    id: 14,
    date: '2024-01-14',
    grid: [
      ['S', 'C', 'O', 'R', 'E'],
      ['T', 'I', 'D', 'E', 'S'],
      ['A', 'R', 'E', 'N', 'A'],
      ['R', 'E', 'A', 'D', 'Y'],
      ['S', 'E', 'E', 'D', 'S'],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Game points', answer: 'SCORE', row: 0, col: 0, direction: 'across' },
        { number: 6, clue: 'Ocean movements', answer: 'TIDES', row: 1, col: 0, direction: 'across' },
        { number: 7, clue: 'Coliseum', answer: 'ARENA', row: 2, col: 0, direction: 'across' },
        { number: 8, clue: 'Prepared', answer: 'READY', row: 3, col: 0, direction: 'across' },
        { number: 9, clue: 'Plant origins', answer: 'SEEDS', row: 4, col: 0, direction: 'across' },
      ],
      down: [
        { number: 1, clue: 'Celestial objects', answer: 'STARS', row: 0, col: 0, direction: 'down' },
        { number: 2, clue: 'Apple drink', answer: 'CIDER', row: 0, col: 1, direction: 'down' },
        { number: 3, clue: 'Seas', answer: 'ODEA', row: 0, col: 2, direction: 'down' },
        { number: 4, clue: 'Lease', answer: 'RENDS', row: 0, col: 3, direction: 'down' },
        { number: 5, clue: 'Years', answer: 'ESAS', row: 0, col: 4, direction: 'down' },
      ],
    },
  },
];

// Get puzzle by day number (cycles through available puzzles)
export function getPuzzleForDay(dayNumber: number): PuzzleData {
  const index = dayNumber % PUZZLES.length;
  return PUZZLES[index];
}
