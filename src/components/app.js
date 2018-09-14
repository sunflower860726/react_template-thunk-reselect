import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Graph from './graph';
import * as paths from '../common/path';
import 'react-tabs/style/react-tabs.css';
export default class App extends Component {
    render() {
        return (
            <Tabs>
                <TabList>
                    <Tab>BITCOIN</Tab>
                    <Tab>Ethereum</Tab>
                </TabList>
                <TabPanel>
                    <Graph src={paths.BITCOIN_URL} />
                </TabPanel>
                <TabPanel>
                    <Graph src={paths.ETHEREUML_URL} />
                </TabPanel>
            </Tabs>
        );
  }
}
