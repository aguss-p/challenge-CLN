import mockedData from "../../mocks/accounts.json";

import type { NextApiRequest, NextApiResponse } from "next";
import { dataPagination, sortData } from "@/helpers/api";
import { Voucher, parceVoucher } from "@/helpers/vouchers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Voucher> | { error: string }>
) {
  if (req.method === "GET") {
    try {
      const {
        query: {
          orderType = "asc",
          orderBy = "id",
          page = 0,
          perPage = 4,
          haveVoucher,
          name,
        },
      } = req;

      const accounts: any = mockedData.accounts;
      let accountsLength: number = 0;
      const filters = {
        status: (a: any) => a.status === "Activo",
        tag: (a: any) => !haveVoucher || a.haveVoucher,
        name: (a: any) =>
          !name ||
          (a.name &&
            !!a.name.toUpperCase().includes((name as string).toUpperCase())),
      };
      const filteredResults = accounts.filter((a: any) =>
        Object.values(filters).every((filterFunc) => filterFunc(a))
      );
      accountsLength = filteredResults.length;
      let parsedData: Array<Voucher> = parceVoucher(filteredResults);
      if ((orderType == "asc" || orderType == "desc") && orderBy) {
        parsedData = sortData(orderBy as string, orderType, parsedData);
      }
      parsedData = dataPagination(
        page as number,
        perPage as number,
        parsedData
      );

      res.status(200).json({
        accounts: parsedData,
        totalAccounts: accountsLength,
      } as any);
    } catch (e) {
      console.log("error", e);
      res.status(500).json({ error: "Hubo un error en el servidor" });
    }
  }
}
