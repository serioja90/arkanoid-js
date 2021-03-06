/*************************************************************
 * W - white    (50pt)
 * O - orange   (60pt)
 * C - cyan     (70pt)
 * G - green    (80pt)
 * R - red      (90pt)
 * B - blue     (100pt)
 * V - violet   (110pt)
 * Y - yellow   (120pt)
 * 
 * I - oro (indestructible)   (50pt each hit)
 * S - silver                 (50pt * level) necessary hits = 2 + level % 8
 *************************************************************/

(function(window,undefined){
  window.Arkanoid = window.Arkanoid || {};
  Arkanoid.Levels = [
    {
      level: 1,
      background: "#background-hexagon",
      bricks: [
        "             ",
        "             ",
        "             ",
        "             ",
        "SSSSSSSSSSSSS",
        "RRRRRRRRRRRRR",
        "YYYYYYYYYYYYY",
        "BBBBBBBBBBBBB",
        "VVVVVVVVVVVVV",
        "GGGGGGGGGGGGG"
      ]
    },
    {
      level: 2,
      background: "#background-grass",
      bricks: [
        "             ",
        "             ",
        "W            ",
        "WO           ",
        "WOC          ",
        "WOCG         ",
        "WOCGR        ",
        "WOCGRB       ",
        "WOCGRBV      ",
        "WOCGRBVY     ",
        "WOCGRBVYW    ",
        "WOCGRBVYWO   ",
        "WOCGRBVYWOC  ",
        "WOCGRBVYWOCG ",
        "SSSSSSSSSSSSR"
      ]
    },
    {
      level: 3,
      background: "#background-tubes",
      bricks: [
        "             ",
        "             ",
        "             ",
        "GGGGGGGGGGGGG",
        "             ",
        "WWWYYYYYYYYYY",
        "             ",
        "RRRRRRRRRRRRR",
        "             ",
        "GGGGGGGGGGWWW",
        "             ",
        "VVVVVVVVVVVVV",
        "             ",
        "BBBGGGGGGGGGG",
        "             ",
        "CCCCCCCCCCCCC",
        "             ",
        "GGGGGGGGGGCCC"
      ]
    },
    {
      level: 4,
      background: "#background-alien",
      bricks: [
        "             ",
        "             ",
        "             ",
        "             ",
        " GCGSB YWOCG ",
        " CGSBV WOCGS ",
        " GSBVY OCGSB ",
        " SBVYW CGSBV ",
        " BVYWO GSBVY ",
        " VYWOC SBVYW ",
        " YWOCG BVYWO ",
        " WOCGS VYWOC ",
        " GCGSB YWOCG ",
        " CGSBV WOCGS ",
        " GSBVY OCGSB ",
        " SBVYW CGSBV ",
        " BVYWO GSBVY ",
        " VYWOC SBVYW ",
      ]
    }
  ];
})(window,undefined);