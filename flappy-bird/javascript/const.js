/**
 * General Constants
 */
const SPRITE = new Image();
SPRITE.src = 'images/sprite.png';

const GET_READY_DIMS = {
    sourceX: 0,
    sourceY: 228,
    width: 173,
    height: 152,
    x: 0,
    y: 80
}

const GAME_OVER_DIMS = {
    sourceX: 175,
    sourceY: 228,
    width: 225,
    height: 202,
    x: 0,
    y: 90
}

/**
 * Pipe constants
 */
const TOP_PIPE_DIMS = {
    sourceX: 553,
    sourceY: 0
}

const BOTTOM_PIPE_DIMS = {
    sourceX: 502,
    sourceY: 0
}

const PIPE_MAX_Y_POSITION = -150;

/**
 * Bird constants
 */
const ANIMATION = [
    {
        sourceX: 276,
        sourceY: 112,
    },
    {
        sourceX: 276,
        sourceY: 139,
    },
    {
        sourceX: 276,
        sourceY: 164,
    },
    {
        sourceX: 276,
        sourceY: 139,
    },
];

const SLOW_FLAP_TIME = 5;
const FAST_FLAP_TIME = 10;


/***
 * State representations
 */
GET_READY = 0;
GAME = 1;
OVER = 2;

/**
 * Score constants
 */
const SCORE_SPRITE = new Image();
SCORE_SPRITE.src = 'images/numbers_sprite.png';