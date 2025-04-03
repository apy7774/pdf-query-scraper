
/**
 * List of NHS Integrated Care Board (ICB) websites
 */
export interface ICBSite {
  name: string;
  url: string;
  region?: string;
}

export const icbSites: ICBSite[] = [
  // East of England
  { name: "Bedfordshire, Luton and Milton Keynes", url: "https://bedfordshirelutonandmiltonkeynes.icb.nhs.uk", region: "East of England" },
  { name: "Cambridgeshire & Peterborough", url: "https://www.cpics.org.uk", region: "East of England" },
  { name: "Hertfordshire and West Essex", url: "https://hertsandwestessex.ics.nhs.uk", region: "East of England" },
  { name: "Mid and South Essex", url: "https://www.midandsouthessex.ics.nhs.uk", region: "East of England" },
  { name: "Norfolk and Waveney", url: "https://improvinglivesnw.org.uk", region: "East of England" },
  { name: "Suffolk and North East Essex", url: "https://suffolkandnortheastessex.icb.nhs.uk", region: "East of England" },
  
  // London
  { name: "North Central London", url: "https://nclhealthandcare.org.uk", region: "London" },
  { name: "North East London", url: "https://northeastlondon.icb.nhs.uk", region: "London" },
  { name: "North West London", url: "https://www.nwlondonics.nhs.uk", region: "London" },
  { name: "South East London", url: "https://www.selondonics.org", region: "London" },
  { name: "South West London", url: "https://www.southwestlondon.icb.nhs.uk", region: "London" },
  
  // Midlands
  { name: "Birmingham and Solihull", url: "https://www.birminghamsolihull.icb.nhs.uk", region: "Midlands" },
  { name: "Black Country", url: "https://blackcountry.icb.nhs.uk", region: "Midlands" },
  { name: "Coventry and Warwickshire", url: "https://www.happyhealthylives.uk", region: "Midlands" },
  { name: "Derby and Derbyshire", url: "https://joinedupcarederbyshire.co.uk", region: "Midlands" },
  { name: "Herefordshire and Worcestershire", url: "https://herefordshireandworcestershire.icb.nhs.uk", region: "Midlands" },
  { name: "Leicester, Leicestershire and Rutland", url: "https://leicesterleicestershireandrutland.icb.nhs.uk", region: "Midlands" },
  { name: "Lincolnshire", url: "https://www.lincolnshire.icb.nhs.uk", region: "Midlands" },
  { name: "Northamptonshire", url: "https://www.icnorthamptonshire.org.uk", region: "Midlands" },
  { name: "Nottingham and Nottinghamshire", url: "https://www.notts.icb.nhs.uk", region: "Midlands" },
  { name: "Shropshire, Telford and Wrekin", url: "https://www.shropshiretelfordandwrekin.nhs.uk", region: "Midlands" },
  { name: "Staffordshire and Stoke-on-Trent", url: "https://staffsstoke.icb.nhs.uk", region: "Midlands" },
  
  // North East and Yorkshire
  { name: "Humber and North Yorkshire", url: "https://www.humberandnorthyorkshire.icb.nhs.uk", region: "North East and Yorkshire" },
  { name: "North East and North Cumbria", url: "https://northeastnorthcumbria.nhs.uk", region: "North East and Yorkshire" },
  { name: "South Yorkshire", url: "https://www.southyorkshire.icb.nhs.uk", region: "North East and Yorkshire" },
  { name: "West Yorkshire", url: "https://www.westyorkshire.icb.nhs.uk", region: "North East and Yorkshire" },
  
  // North West
  { name: "Cheshire and Merseyside", url: "https://www.cheshireandmerseyside.nhs.uk", region: "North West" },
  { name: "Greater Manchester", url: "https://www.gmintegratedcare.org.uk", region: "North West" },
  { name: "Lancashire and South Cumbria", url: "https://www.lancashireandsouthcumbria.icb.nhs.uk", region: "North West" },
  
  // South East
  { name: "Buckinghamshire, Oxfordshire and Berkshire West", url: "https://www.bucksoxonberksw.icb.nhs.uk", region: "South East" },
  { name: "Frimley", url: "https://www.frimley.icb.nhs.uk", region: "South East" },
  { name: "Hampshire and Isle of Wight", url: "https://www.hantsiowhealthandcare.org.uk", region: "South East" },
  { name: "Kent and Medway", url: "https://www.kentandmedway.icb.nhs.uk", region: "South East" },
  { name: "Surrey Heartlands", url: "https://www.surreyheartlands.org", region: "South East" },
  { name: "Sussex", url: "https://www.sussex.icb.nhs.uk", region: "South East" },
  
  // South West
  { name: "Bath and North East Somerset, Swindon and Wiltshire", url: "https://bsw.icb.nhs.uk", region: "South West" },
  { name: "Bristol, North Somerset and South Gloucestershire", url: "https://bnssg.icb.nhs.uk", region: "South West" },
  { name: "Cornwall and the Isles of Scilly", url: "https://cios.icb.nhs.uk", region: "South West" },
  { name: "Devon", url: "https://onedevon.org.uk", region: "South West" },
  { name: "Dorset", url: "https://www.nhsdorset.nhs.uk", region: "South West" },
  { name: "Gloucestershire", url: "https://www.nhsglos.nhs.uk", region: "South West" },
  { name: "Somerset", url: "https://www.nhssomerset.nhs.uk", region: "South West" }
];

/**
 * Get an ICB site by its URL
 */
export const getICBSiteByUrl = (url: string): ICBSite | undefined => {
  return icbSites.find(site => site.url === url);
};

/**
 * Get ICB sites grouped by region
 */
export const getICBSitesByRegion = (): Record<string, ICBSite[]> => {
  return icbSites.reduce((acc, site) => {
    if (site.region) {
      if (!acc[site.region]) {
        acc[site.region] = [];
      }
      acc[site.region].push(site);
    }
    return acc;
  }, {} as Record<string, ICBSite[]>);
};
