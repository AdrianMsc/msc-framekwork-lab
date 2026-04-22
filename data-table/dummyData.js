const fractionalInchData = [
  {
    millDia: "1/64",
    loc: "1/32",
    shankDia: "1/8",
    oal: "1.5",
    helix: "30",
    stock: 41,
    locStock: 13,
    location: "Harrisburg, PA",
    mfrPart: "30031",
    rating: 0,
    brands: {
      hertel: { msc: "-", price: "-" },
      accupro: { msc: "-", price: "-" },
      widia: { msc: "-", price: "-" },
      seco: { msc: "-", price: "-" },
      maford: { msc: "-", price: "-" },
      sgs: { msc: "81748386", price: "$48.20" }
    }
  },
  {
    millDia: "1/32",
    loc: "5/64",
    shankDia: "1/8",
    oal: "1.5",
    helix: "30",
    stock: 25,
    locStock: 8,
    location: "Elkhart, IN",
    mfrPart: "30032",
    rating: 4,
    brands: {
      hertel: { msc: "-", price: "-" },
      accupro: { msc: "-", price: "-" },
      widia: { msc: "-", price: "-" },
      seco: { msc: "-", price: "-" },
      maford: { msc: "59544056", price: "$35.93" },
      sgs: { msc: "89095632", price: "$25.81" }
    }
  },
  {
    millDia: "3/64",
    loc: "3/32",
    shankDia: "1/8",
    oal: "1.5",
    helix: "30",
    stock: 12,
    locStock: 5,
    location: "Columbus, OH",
    mfrPart: "30033",
    rating: 5,
    brands: {
      hertel: { msc: "00123456", price: "$12.50" },
      accupro: { msc: "11223344", price: "$14.20" },
      widia: { msc: "-", price: "-" },
      seco: { msc: "-", price: "-" },
      maford: { msc: "-", price: "-" },
      sgs: { msc: "99887766", price: "$18.90" }
    }
  },
  {
    millDia: "1/16",
    loc: "3/16",
    shankDia: "1/8",
    oal: "1.5",
    helix: "30",
    stock: 88,
    locStock: 22,
    location: "Harrisburg, PA",
    mfrPart: "30034",
    rating: 3,
    brands: {
      hertel: { msc: "55443322", price: "$10.15" },
      accupro: { msc: "-", price: "-" },
      widia: { msc: "66778899", price: "$15.75" },
      seco: { msc: "-", price: "-" },
      maford: { msc: "12348765", price: "$13.40" },
      sgs: { msc: "-", price: "-" }
    }
  },
  {
    millDia: "5/64",
    loc: "1/4",
    shankDia: "1/8",
    oal: "1.5",
    helix: "30",
    stock: 15,
    locStock: 2,
    location: "Atlanta, GA",
    mfrPart: "30035",
    rating: 0,
    brands: {
      hertel: { msc: "-", price: "-" },
      accupro: { msc: "44556677", price: "$16.80" },
      widia: { msc: "-", price: "-" },
      seco: { msc: "88990011", price: "$22.30" },
      maford: { msc: "-", price: "-" },
      sgs: { msc: "33221100", price: "$19.50" }
    }
  },
  {
    millDia: "3/32",
    loc: "3/8",
    shankDia: "1/8",
    oal: "1.5",
    helix: "30",
    stock: 64,
    locStock: 18,
    location: "Harrisburg, PA",
    mfrPart: "30036",
    rating: 4,
    brands: {
      hertel: { msc: "77889900", price: "$11.20" },
      accupro: { msc: "22334455", price: "$13.90" },
      widia: { msc: "55667788", price: "$17.40" },
      seco: { msc: "99001122", price: "$21.10" },
      maford: { msc: "44551122", price: "$15.60" },
      sgs: { msc: "11223344", price: "$18.30" }
    }
  },
  {
    millDia: "7/64",
    loc: "3/8",
    shankDia: "1/8",
    oal: "1.5",
    helix: "30",
    stock: 33,
    locStock: 9,
    location: "Dallas, TX",
    mfrPart: "30037",
    rating: 0,
    brands: {
      hertel: { msc: "11112222", price: "$12.45" },
      accupro: { msc: "-", price: "-" },
      widia: { msc: "33334444", price: "$16.20" },
      seco: { msc: "-", price: "-" },
      maford: { msc: "55556666", price: "$14.80" },
      sgs: { msc: "-", price: "-" }
    }
  },
  {
    millDia: "1/8",
    loc: "1/2",
    shankDia: "1/8",
    oal: "1.5",
    helix: "30",
    stock: 120,
    locStock: 45,
    location: "Harrisburg, PA",
    mfrPart: "30038",
    rating: 5,
    brands: {
      hertel: { msc: "99990000", price: "$9.99" },
      accupro: { msc: "88887777", price: "$12.50" },
      widia: { msc: "77776666", price: "$14.75" },
      seco: { msc: "66665555", price: "$19.20" },
      maford: { msc: "55554444", price: "$13.90" },
      sgs: { msc: "44443333", price: "$16.50" }
    }
  },
  {
    millDia: "9/64",
    loc: "9/16",
    shankDia: "3/16",
    oal: "2.0",
    helix: "30",
    stock: 19,
    locStock: 4,
    location: "Phoenix, AZ",
    mfrPart: "30039",
    rating: 2,
    brands: {
      hertel: { msc: "22223333", price: "$15.30" },
      accupro: { msc: "44445555", price: "$17.80" },
      widia: { msc: "-", price: "-" },
      seco: { msc: "66667777", price: "$24.50" },
      maford: { msc: "-", price: "-" },
      sgs: { msc: "88889999", price: "$21.40" }
    }
  },
  {
    millDia: "5/32",
    loc: "5/8",
    shankDia: "3/16",
    oal: "2.0",
    helix: "30",
    stock: 5,
    locStock: 0,
    location: "Reno, NV",
    mfrPart: "30040",
    rating: 0,
    brands: {
      hertel: { msc: "-", price: "-" },
      accupro: { msc: "12123434", price: "$18.20" },
      widia: { msc: "56567878", price: "$22.90" },
      seco: { msc: "-", price: "-" },
      maford: { msc: "90901212", price: "$19.60" },
      sgs: { msc: "-", price: "-" }
    }
  },
  {
    millDia: "11/64",
    loc: "5/8",
    shankDia: "3/16",
    oal: "2.0",
    helix: "30",
    stock: 28,
    locStock: 11,
    location: "Harrisburg, PA",
    mfrPart: "30041",
    rating: 4,
    brands: {
      hertel: { msc: "12312312", price: "$16.70" },
      accupro: { msc: "-", price: "-" },
      widia: { msc: "45645645", price: "$21.10" },
      seco: { msc: "-", price: "-" },
      maford: { msc: "78978978", price: "$18.40" },
      sgs: { msc: "-", price: "-" }
    }
  },
  {
    millDia: "3/16",
    loc: "5/8",
    shankDia: "3/16",
    oal: "2.0",
    helix: "30",
    stock: 50,
    locStock: 15,
    location: "Chicago, IL",
    mfrPart: "30042",
    rating: 5,
    brands: {
      hertel: { msc: "32132132", price: "$14.90" },
      accupro: { msc: "65465465", price: "$17.30" },
      widia: { msc: "98798798", price: "$20.50" },
      seco: { msc: "13513513", price: "$26.20" },
      maford: { msc: "24624624", price: "$19.10" },
      sgs: { msc: "35735735", price: "$22.80" }
    }
  },
  {
    millDia: "13/64",
    loc: "5/8",
    shankDia: "1/4",
    oal: "2.5",
    helix: "30",
    stock: 9,
    locStock: 3,
    location: "Harrisburg, PA",
    mfrPart: "30043",
    rating: 0,
    brands: {
      hertel: { msc: "-", price: "-" },
      accupro: { msc: "11122233", price: "$21.40" },
      widia: { msc: "-", price: "-" },
      seco: { msc: "44455566", price: "$29.80" },
      maford: { msc: "-", price: "-" },
      sgs: { msc: "77788899", price: "$25.60" }
    }
  },
  {
    millDia: "7/32",
    loc: "5/8",
    shankDia: "1/4",
    oal: "2.5",
    helix: "30",
    stock: 44,
    locStock: 12,
    location: "Harrisburg, PA",
    mfrPart: "30044",
    rating: 4,
    brands: {
      hertel: { msc: "22233344", price: "$19.20" },
      accupro: { msc: "55566677", price: "$22.50" },
      widia: { msc: "88899900", price: "$27.10" },
      seco: { msc: "-", price: "-" },
      maford: { msc: "11100099", price: "$23.40" },
      sgs: { msc: "-", price: "-" }
    }
  },
  {
    millDia: "15/64",
    loc: "5/8",
    shankDia: "1/4",
    oal: "2.5",
    helix: "30",
    stock: 12,
    locStock: 5,
    location: "Atlanta, GA",
    mfrPart: "30045",
    rating: 0,
    brands: {
      hertel: { msc: "99988877", price: "$20.80" },
      accupro: { msc: "-", price: "-" },
      widia: { msc: "66655544", price: "$28.40" },
      seco: { msc: "-", price: "-" },
      maford: { msc: "33322211", price: "$24.90" },
      sgs: { msc: "-", price: "-" }
    }
  }
];

export default fractionalInchData;
