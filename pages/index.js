import Head from 'next/head';
import Link from 'next/link';
import Container from 'components/UI/Container/Container';
import Heading from 'components/UI/Heading/Heading';
import SectionTitle from 'components/SectionTitle/SectionTitle';
import SearchArea from 'container/Home/Search/Search';
import LocationGrid from 'container/Home/Location/Location';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import GetAPIData from 'library/helpers/get_api_data';
import { deviceType } from 'react-device-detect';
import { LISTING_POSTS_PAGE, SINGLE_POST_PAGE } from 'settings/constant';
import {
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_MOBILE_DEVICE,
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_TABLET_DEVICE,
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_DESKTOP_DEVICE,
  HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH,
} from 'settings/config';
import fs from 'fs/promises';
import path from 'path'

export default function HomePage(props) {
  let limit;

  if (deviceType === 'mobile') {
    limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_MOBILE_DEVICE;
  }
  if (deviceType === 'tablet') {
    limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_TABLET_DEVICE;
  }

  if (deviceType === 'desktop') {
    limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_DESKTOP_DEVICE;
  }
  return (
    <>
      <Head>
        <title>TripFinder. | A react next listing template</title>
      </Head>
      <SearchArea />
      <LocationGrid data={props.locationData} deviceType={deviceType} />
      <Container fluid={true}>
        <SectionTitle
          title={<Heading content="Travelers’ Choice: Top hotels" />}
          link={
            <Link href={LISTING_POSTS_PAGE}>
              <a>Show all</a>
            </Link>
          }
        />
        <SectionGrid
          link={SINGLE_POST_PAGE}
          columnWidth={HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH}
          data={props.topHotelData.slice(0, limit)}
          limit={limit}
          deviceType={deviceType}
        />
        <SectionTitle
          title={<Heading content="Best Rated: Luxary hotels" />}
          link={
            <Link href={LISTING_POSTS_PAGE}>
              <a>Show all</a>
            </Link>
          }
        />
        <SectionGrid
          link={SINGLE_POST_PAGE}
          columnWidth={HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH}
          data={props.luxaryHotelData.slice(0, limit)}
          limit={limit}
          deviceType={deviceType}
        />
      </Container>
    </>
  );
}

export async function getStaticProps() {
//Use when Loading data form DB
  // const apiUrl = [
  //   {
  //     endpoint: 'hotel',
  //     name: 'luxaryHotelData',
  //   },
  //   {
  //     endpoint: 'top-hotel',
  //     name: 'topHotelData',
  //   },
  //   {
  //     endpoint: 'location',
  //     name: 'locationData',
  //   },
  // ];
  // const pageData = await GetAPIData(apiUrl);
  // let locationData = [],
  //   topHotelData = [],
  //   luxaryHotelData = [];

  // if (pageData) {
  //   pageData.forEach((item, key) => {
  //     if (item.name === 'locationData') {
  //       locationData = item.data ? [...item.data] : [];
  //     } else if (item.name === 'topHotelData') {
  //       topHotelData = item.data ? [...item.data] : [];
  //     } else if (item.name === 'luxaryHotelData') {
  //       luxaryHotelData = item.data ? [...item.data] : [];
  //     }
  //   });
  // }
  //Loading data from local files
  const filePath = path.join(process.cwd(), 'static', 'data', 'location.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)
  const filePath2 = path.join(process.cwd(), 'static', 'data', 'top-hotel.json')
  const jsonData2 = await fs.readFile(filePath2)
  const data2 = JSON.parse(jsonData2)
  const filePath3 = path.join(process.cwd(), 'static', 'data', 'hotel.json')
  const jsonData3 = await fs.readFile(filePath3)
  const data3 = JSON.parse(jsonData3)
  return {
    props: { locationData: data, topHotelData: data2, luxaryHotelData: data3 },
  };
}
