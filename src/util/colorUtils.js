// src/util/colorUtils.js
const colors = [
    '#FFB6C1', '#FFC0CB', '#DC143C', '#FFF0F5', '#DB7093', '#FF69B4', '#FF1493', 
    '#C71585', '#DA70D6', '#D8BFD8', '#DDA0DD', '#EE82EE', '#FF00FF', '#FF00FF',
    '#BA55D3', '#9370DB', '#8A2BE2', '#9400D3', '#9932CC', '#8B008B', '#800080',
    '#4B0082', '#6A5ACD', '#483D8B', '#E6E6FA', '#F8F8FF', '#0000FF', '#0000CD',
    '#191970', '#00008B', '#000080', '#4169E1', '#6495ED', '#B0C4DE', '#778899',
    '#708090', '#1E90FF', '#F0F8FF', '#4682B4', '#87CEEB', '#87CEFA', '#00BFFF',
    '#ADD8E6', '#B0E0E6', '#5F9EA0', '#F0FFFF', '#E1FFFF', '#AFEEEE', '#00CED1',
    '#48D1CC', '#20B2AA', '#40E0D0', '#7FFFD4', '#66CDAA', '#8FBC8F', '#3CB371',
    '#2E8B57', '#F5FFFA', '#00FF7F', '#F0FFF0', '#90EE90', '#98FB98', '#8FBC8F',
    '#32CD32', '#00FF00', '#228B22', '#008000', '#006400', '#7FFF00', '#7CFC00',
    '#ADFF2F', '#556B2F', '#6B8E23', '#FAFAD2', '#FFFFF0', '#FFFFE0', '#FFFF00',
    '#FFD700', '#FFFAFA', '#F0FFF0', '#F5F5DC', '#FFF8DC', '#FFFACD', '#FAFAD2',
    '#FFEFD5', '#FFE4B5', '#FFDAB9', '#EEE8AA', '#F0E68C', '#BDB76B', '#EEE8AA',
    '#F0E68C', '#E6E6FA', '#FFF0F5', '#FAEBD7', '#D3D3D3', '#C0C0C0', '#A9A9A9',
    '#696969', '#808080', '#000000'
  ];
  
  export const getColorFromLetter = (letter) => {
    const index = letter.toUpperCase().charCodeAt(0) - 65;
    return colors[index % colors.length];
  };
  