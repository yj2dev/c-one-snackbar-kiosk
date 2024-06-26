export const randomColor = () => {
  const colors = [
    "#99A9E1",
    "#B967C7",
    "#EF87A6",
    "#F16365",
    "#F13C1F",
    "#37A19C",
    "#E9D149",
    "#F879A0",
    "#6C88D1",
    "#E17C82",
    "#ECC766",
    "#EDD69F",
    "#49F0CB",
    "#5FC48D",
    "#41C2C2",
    "#6AD08A",
    "#0088D3",
    "#DCB0D9",
    "#F98DA3",
    "#C03930",
    "#F4D3A1",
    "#B2202A",
    "#BFD12E",
    "#3B32DC",
    "#A2D477",
    "#E9C77E",
    "#C68D20",
    "#5FA2DC",
    "#BE605E",
    "#98C53B",
    "#9FEC44",
    "#DB8CE0",
    "#48A9D5",
    "#B4BBE1",
    "#6EDFD8",
    "#ED9E9C",
    "#E8D188",
    "#F2827B",
    "#FDBEA8",
    "#0267C2",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
};
