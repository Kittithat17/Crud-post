// lib/products.ts
export const products = {
  "air-jordan-1-low-travis-scott": {
    id: "1",
    name: "Nike Air Jordan 1 Low",
    subtitle: "Travis Scott x Fragment",
    price: "฿5,900",
    mainImage: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/a27a438e-3142-4bd1-b504-bd126bafd87c/วันเปิดตัว-air-jordan-1-low-“travis-scott-x-fragment”.jpg",
    colors: 1,
    tagline: "Collaboration Edition",//use
    environmentalInfo: "Limited edition",
    description: "Special edition of Air Jordan 1 Low from the collaboration with Travis Scott and Fragment, unique design.",
    colorName: "Black/White/Blue",
    styleCode: "DM7866-140",
    madeIn: "China",
    isNew: true,
    thumbnails: [
      { id: "thumb1", img: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/a27a438e-3142-4bd1-b504-bd126bafd87c/วันเปิดตัว-air-jordan-1-low-“travis-scott-x-fragment”.jpg", alt: "Air Jordan 1 Low view 3" },
      { id: "thumb2", img: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/c93e8b7a-81f6-4bb4-a1a6-734240341ca3/วันเปิดตัว-air-jordan-1-low-“travis-scott-x-fragment”.jpg", alt: "Air Jordan 1 Low view 2" },
      { id: "thumb3", img: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/15b77901-eb6e-46a8-8c2e-76beb0b5b42a/วันเปิดตัว-air-jordan-1-low-“travis-scott-x-fragment”.jpg", alt: "Air Jordan 1 Low view 1" },
      { id: "thumb4", img: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/68fae8b2-21c2-4842-942a-52e264345a37/วันเปิดตัว-air-jordan-1-low-“travis-scott-x-fragment”.jpg", alt: "Air Jordan 1 Low view 4" },
      { id: "thumb5", img: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/6da12027-0a9a-4d1d-869a-2feebfc0bd83/วันเปิดตัว-air-jordan-1-low-“travis-scott-x-fragment”.jpg", alt: "Air Jordan 1 Low view 4" },
      { id: "thumb6", img: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/2b2ba3c5-44aa-4071-a85c-72fb84a29d36/วันเปิดตัว-air-jordan-1-low-“travis-scott-x-fragment”.jpg", alt: "Air Jordan 1 Low view 4" }
    ],
    sizes: [
      { id: "size1", label: "US 6" },
      { id: "size2", label: "US 6.5" },
      { id: "size3", label: "US 7" },
      { id: "size4", label: "US 7.5" },
      { id: "size5", label: "US 8" },
      { id: "size6", label: "US 8.5" },
      { id: "size7", label: "US 9" },
      { id: "size8", label: "US 9.5" },
      { id: "size9", label: "US 10" },
      { id: "size10", label: "US 10.5" },
      { id: "size11", label: "US 11" },
      { id: "size12", label: "US 12" },
    ],
  },
  "adidas-samba-og": {
    id: "2",
    name: "Adidas Samba",
    subtitle: "OG Aluminum Gum",
    price: "฿6,400",
    mainImage: "/images/kkk.jpeg",
    colors: 4,
    tagline: "A Classic Reimagined",
    category: "Indoor Sports Shoes",
    environmentalInfo: "Made with 30% recycled materials",
    description: "The original Adidas Samba, a classic design suitable for everyday use.",
    colorName: "White/Black/Gum",
    styleCode: "B75806",
    madeIn: "Vietnam",
    thumbnails: [
      { id: "thumb1", img: "/images/samba-thumb1.jpg", alt: "Adidas Samba view 1" }
    ],
    sizes: [
      { id: "size1", label: "US 7" },
      // ... other sizes
    ],
    
  },
  "nike-vomero-18": {
    id: "3",
    name: "Nike Vomero 18",
    subtitle: "Running Shoes",
    price: "฿5,500",
    mainImage: "/images/shoe1.png",
    colors: 2,
    isNew: true,
    tagline: "Eco-friendly running",

    environmentalInfo: "Made with at least 20% recycled fibers by weight",
    description: "The Vomero 18 offers maximum comfort and cushioning for every pace and stride.",
    colorName: "Summit White/Dusty Cactus/Geode Teal/Black",
    styleCode: "HM6803-103",
    madeIn: "Vietnam",
    thumbnails: [
      { id: "thumb1", img: "/images/shoe_thumbnail1.png", alt: "Nike Vomero 18 view 1" },
      { id: "thumb2", img: "/images/shoe_thumbnail2.png", alt: "Nike Vomero 18 view 2" }
    ],
    sizes: [
      { id: "size1", label: "US 7" },
      // ... other sizes
    ],
   
  },
  "vans-classic": {
    id: "4",
    name: "Vans Classic",
    subtitle: "Original Skate Shoes",
    price: "฿7,500",
    mainImage: "/images/ff.webp",
    colors: 1,
    isBestSeller: true,
    tagline: "Classic Skateboarding Shoes",
   
    environmentalInfo: "Natural canvas material",
    description: "Vans Classic, the original style for skateboarders and streetwear lovers.",
    colorName: "Black/White",
    styleCode: "VN000D5IB8C",
    madeIn: "China",
    thumbnails: [
      { id: "thumb1", img: "/images/vans-thumb1.jpg", alt: "Vans Classic view 1" }
    ],
    sizes: [
      { id: "size1", label: "US 7" },
      // ... other sizes
    ],
    
  }
} as const;
