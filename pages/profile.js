import React from 'react';
import Head from 'next/head';
import { AgentDetailsViewPage } from 'container/Agent/index';
import GetAPIData, { ProcessAPIData } from 'library/helpers/get_api_data';
import fs from 'fs/promises';
import path from 'path'
export default function profilePage(props) {
  return (
    <>
      <Head>
        <title>Agent | TripFinder.</title>
      </Head>
      <AgentDetailsViewPage {...props} />
    </>
  );
}

export async function getStaticProps() {
  const apiUrl = [
    {
      endpoint: 'agent',
      name: 'listingAgent',
    },
  ];
  // const pageData = await GetAPIData(apiUrl);
  // const processedData = ProcessAPIData(pageData);
  const filePath = path.join(process.cwd(), 'static', 'data', 'agent.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)
  return {
    props: { processedData: data },
  };
}
