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
      background: "img/hexagon.png",
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
      background: "grass.png",
      bricks: [
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
    }
  ];
})(window,undefined);