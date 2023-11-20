export type Benefits = {
  id: string;
  name: string;
  imgUrl: string;
  accountUrl: string;
  discountPercentages: Array<number>;
  location: number;
};

export const parceBenefits: (benefits: any) => Array<Benefits> = (
  benefits: any
) => {
  return benefits.map((a: any) => ({
    id: a.id,
    name: a.name,
    imgUrl: a.images[0].url,
    accountUrl: `https://club.lanacion.com.ar/${a.crmid}`,
    discountPercentages: getBenefitsValues(a.benefits),
    location: getNearLocation(a.branches),
  }));
};

export const getBenefitsValues = (benefits: Array<any>) => {
  let bestBenefits = [0, 0, 0];
  benefits.forEach((b) => {
    const parsedPercentage = Number(b.type.replace("%", ""));
    if (
      b.program_name.includes("Club La Nación Premium") &&
      parsedPercentage > bestBenefits[1]
    ) {
      bestBenefits[1] = parsedPercentage;
    }
    if (
      b.program_name.includes("Club La Nación Classic") &&
      parsedPercentage > bestBenefits[2]
    ) {
      bestBenefits[2] = parsedPercentage;
    }
    if (
      b.program_name.includes("Club La Nación Black") &&
      parsedPercentage > bestBenefits[0]
    ) {
      bestBenefits[0] = parsedPercentage;
    }
  });
  return bestBenefits;
};
export const getNearLocation = (branches: Array<any>) => {
  let nearLocation = Number.MAX_VALUE;
  branches.forEach((b) => {
    if (b.location < nearLocation) {
      nearLocation = b.location;
    }
  });
  return nearLocation;
};
