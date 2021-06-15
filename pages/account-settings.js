import React from 'react';
import Head from 'next/head';
import { AgentAccountSettingsPage } from 'container/Agent/';
import GetAPIData, { ProcessAPIData } from 'library/helpers/get_api_data';
import fs from 'fs/promises';
import path from 'path'
export default function accountSettingsPage(props) {
  return (
    <>
      <Head>
        <title>Account Settings | TripFinder.</title>
      </Head>
      <AgentAccountSettingsPage processedData={props.processedData} />
    </>
  );
}

export async function getStaticProps() {
  //Use when Loading data form DB
  // const apiUrl = [
  //   {
  //     endpoint: 'agent',
  //     name: 'agentProfile',
  //   },
  // ];
  // const pageData = await GetAPIData(apiUrl);
  // const processedData = ProcessAPIData(pageData);
    //Loading data from local files
  const filePath = path.join(process.cwd(), 'static', 'data', 'agent.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)
  return {
    props: { processedData: data },
  };
}
