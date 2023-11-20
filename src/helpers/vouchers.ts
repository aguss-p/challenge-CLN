export type Voucher = {
  id: string;
  name: string;
  imgUrl: string;
  voucherUrl: string;
};
export const parceVoucher: (accounts: any) => Array<Voucher> = (
  accounts: any
) => {
  return accounts.map((a: any) => ({
    id: a.id,
    name: a.name,
    imgUrl: a.images[0].url,
    voucherUrl: `https://club.lanacion.com.ar/${a.crmid}`,
  }));
};
