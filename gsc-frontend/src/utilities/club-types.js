const clubs = [];

let serialCount = 0;
// woods
for (let i = 1; i <= 7; i++) {
  const club = {
    serial: serialCount,
    category: "Woods",
    name: `${i}-wood`,
    abbrvName: `${i}W`,
  };
  clubs.push(club);
  serialCount++;
}

// hybrids
for (let i = 2; i <= 6; i++) {
  const club = {
    serial: serialCount,
    category: "Hybrids",
    name: `${i}-hybrid`,
    abbrvName: `${i}h`,
  };
  clubs.push(club);
  serialCount++;
}

// irons
for (let i = 4; i <= 10; i++) {
  const club = {
    serial: serialCount,
    category: "Irons",
    name: `${i}-iron`,
    abbrvName: `${i}i`,
  };
  clubs.push(club);
  serialCount++;
}

// wedges
for (let i = 50; i <= 60; i++) {
  const club = {
    serial: serialCount,
    category: "Wedges",
    name: `${i}-deg wedge`,
    abbrvName: `W${i}`,
  };
  clubs.push(club);
  serialCount++;
}

clubs.push({
  serial: serialCount,
  category: "Wedges",
  name: "pitching wedge",
  abbrvName: "PW",
});
serialCount++;

clubs.push({
  serial: serialCount,
  category: "Wedges",
  name: "gap wedge",
  abbrvName: "GW",
});
serialCount++;

clubs.push({
  serial: serialCount,
  category: "Wedges",
  name: "sand wedge",
  abbrvName: "SW",
});
serialCount++;

clubs.push({
  serial: serialCount,
  category: "Wedges",
  name: "lob wedge",
  abbrvName: "LW",
});
serialCount++;

clubs.push({
  serial: serialCount,
  category: "Putters",
  name: "putter",
  abbrvName: "Pt",
});

export default clubs;
