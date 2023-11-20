import { FullScreenSliderDesktop } from "@/components/common/slider";
import Header from "@/components/common/header";
import Card from "@/components/common/card";
import LocationMark from "@/components/icons/LocationMark";
import { Carousel } from "@/components/common/carousel";
import { GetServerSidePropsContext } from "next";
import { useEffect, useMemo, useState } from "react";
import { Benefits } from "@/helpers/benefits";
import { Voucher } from "@/helpers/vouchers";
import { fetchData } from "@/helpers/api";
import Title from "@/components/common/card/title";
import PercentagesRow from "@/components/common/percentagesRow";
import DistanceLabel from "@/components/common/distanceLabel";
import Button from "@/components/common/card/button";

type Props = {
  tourismAccounts: Array<Benefits>;
  tourismAccountsTotal: number;
  vouchers: Array<Voucher>;
  vouchersTotal: number;
};

export default function Home(props: Props) {
  const { tourismAccounts, tourismAccountsTotal, vouchers, vouchersTotal } =
    props;

  const [turismData, setTurismData] = useState([...tourismAccounts]);
  const [turismDataPage, setTurismDataPage] = useState(1);
  const [turismDataPerPage, setTurismDataPerPage] = useState(4);
  const [loadingBenefits, setLoadingBenefits] = useState(false);
  const [voucherData, setVoucherData] = useState([...vouchers]);
  const [voucherPage, setVoucherPage] = useState(1);
  const [voucherPerPage, setVoucherPerPage] = useState(4);
  const [loadingVouchers, setLoadingVouchers] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchByName, setSearchByName] = useState("");
  const [onClickSearch, setOnClickSearch] = useState(false);
  const benefitsUrl = useMemo(
    () =>
      `http://localhost:3000/api/benefits?tag=Turismo en Buenos Aires&name=${searchByName}&orderBy=location&orderType=asc&page=${turismDataPage}&perPage=${turismDataPerPage}`,
    [turismDataPage, turismDataPerPage, searchByName]
  );
  const vouchersUrl = useMemo(
    () =>
      `http://localhost:3000/api/vouchers?haveVoucher=true&name=${searchByName}&orderBy=name&orderType=asc&page=${voucherPage}&perPage=${voucherPerPage}`,
    [voucherPage, voucherPerPage, searchByName]
  );
  useEffect(() => {
    const asyncFetch = async () => {
      setLoadingBenefits(true);
      const data = await fetchData(benefitsUrl);
      setTurismData(data?.accounts);
      setLoadingBenefits(false);
    };
    if (!initialLoad) {
      asyncFetch();
    }
  }, [turismDataPage, onClickSearch]);

  useEffect(() => {
    const asyncFetch = async () => {
      setLoadingVouchers(true);
      const data = await fetchData(vouchersUrl);
      setVoucherData(data?.accounts);
      setLoadingVouchers(false);
    };
    if (!initialLoad) {
      asyncFetch();
    }
  }, [voucherPage, onClickSearch]);

  const arrayHardcoded = [
    "https://pbs.twimg.com/media/EzrHTloXIAU3Kww.jpg",
    "https://pbs.twimg.com/media/EzrHTloXIAU3Kww.jpg",
    "https://pbs.twimg.com/media/EzrHTloXIAU3Kww.jpg",
  ];

  return (
    <main className={`flex flex-col gap-4 min-h-screen pb-14`}>
      <Header
        nameInputValue={searchByName}
        onChangeNameInput={(val: string) => {
          setInitialLoad(false);
          setSearchByName(val);
        }}
        onClickSearch={() => setOnClickSearch(!onClickSearch)}
      />
      <FullScreenSliderDesktop>
        {arrayHardcoded.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt="slider-img"
            className="w-screen pt-[96px] h-[50vh] sm:pt-0 sm:h-screen"
          />
        ))}
      </FullScreenSliderDesktop>
      <section className="flex flex-col gap-3 py-4 sm:px-20 md:px-40">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-medium">Turismo en Buenos Aires</h4>
          {turismData.length > 0 && (
            <button className="font-bold p-1 rounded-2xl border-solid border-[1px] border-blue-500  text-blue-500 text-xs">
              TODOS LOS BENEFICIOS
            </button>
          )}
        </div>
        <div className="flex items-center h-auto">
          <Carousel
            customRightAction={() => {
              setInitialLoad(false);
              setTurismDataPage(turismDataPage + 1);
            }}
            customLeftAction={() => {
              setInitialLoad(false);
              setTurismDataPage(turismDataPage - 1);
            }}
            totalPages={Math.ceil(tourismAccountsTotal / turismDataPerPage)}
            currentPage={turismDataPage}
            setFetchBy={(val: number) => setTurismDataPerPage(val)}
          >
            {turismData?.map((b: Benefits) => (
              <Card
                key={b.id}
                img={b.imgUrl}
                url={b.accountUrl}
                title={
                  <a
                    href={b.accountUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Title text={b.name} />
                  </a>
                }
                description={
                  <PercentagesRow percentages={b.discountPercentages} />
                }
                footer={<DistanceLabel distance={b.location} />}
              />
            ))}
          </Carousel>
        </div>
      </section>
      <section className="bg-[rgb(247,247,244)] flex flex-col gap-3 py-4 sm:px-20 md:px-40">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-xl font-medium">Códigos de descuento</h4>
          </div>
          {voucherData.length > 0 && (
            <button className="font-bold p-1 rounded-2xl border-solid border-[1px] border-blue-500  text-blue-500 text-xs">
              TODOS LOS CÓDIGOS
            </button>
          )}
        </div>
        <p className="text-xs  mb-4">
          ¿Sos socio de Club LA NACION? Descargá tu código y disfrutá beneficios
          exclusivos en tus mascas favoritas
        </p>
        <div className="flex items-center">
          <Carousel
            totalPages={Math.ceil(vouchersTotal / voucherPerPage)}
            customRightAction={() => {
              setInitialLoad(false);
              setVoucherPage(voucherPage + 1);
            }}
            customLeftAction={() => {
              setInitialLoad(false);
              setVoucherPage(voucherPage - 1);
            }}
            setFetchBy={(val: number) => setVoucherPerPage(val)}
          >
            {voucherData.map((v, i) => (
              <Card
                className="!bg-blue-500"
                key={v.id}
                img={v.imgUrl}
                title={<Title text={v.name} className="text-white" />}
                footer={<Button url={v.voucherUrl} text="QUIERO MI CÓDIGO" />}
              />
            ))}
          </Carousel>
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const accountsResponse = await fetch(
      "http://localhost:3000/api/benefits?tag=Turismo en Buenos Aires&orderBy=location&orderType=asc&page=1&perPage=4"
    );
    const vouchersResponse = await fetch(
      "http://localhost:3000/api/vouchers?haveVoucher=true&orderBy=name&orderType=asc&page=1&perPage=4"
    );
    const accounts = await accountsResponse.json();
    const vouchers = await vouchersResponse.json();

    return {
      props: {
        tourismAccounts: accounts.accounts,
        tourismAccountsTotal: accounts.totalAccounts,
        vouchers: vouchers.accounts,
        vouchersTotal: vouchers.totalAccounts,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        tourismAccounts: null,
        tourismAccountsTotal: null,
        vouchers: null,
        vouchersTotal: null,
      },
    };
  }
}
