import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import selector from './selector';
import actions from '../actions';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../../node_modules/react-vis/dist/style.css';
import {DiscreteColorLegend} from 'react-vis';

const options = ['Open', 'High', 'Low', 'Close', 'All'];

const ITEMS = [
    'Show/Hide',
];
class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graphState:0,
            showFlag:true
        };

    }
    onSelect(e) {
        console.log(e.value)
        const options = {Open:0, High:1, Low:2, Close:3, All: 4}
        this.setState({graphState: options[[e.value]]});
    }
    onLegendClick(){
        this.setState(prevState => ({
            showFlag: !prevState.showFlag
        }));
    }
    componentDidMount() {
        console.log(this.props);
        const { getPageData } = this.props;
        getPageData(this.props.src);
    }

    getExtractedData(data) {
        var extractData = {'Open': [], 'Close': [], 'High': [], 'Low': []};
        data.map((item) => {
            extractData['Open'].push({x:item.time, y:item.open});
            extractData['Close'].push({x:item.time, y:item.close});
            extractData['High'].push({x:item.time, y:item.high});
            extractData['Low'].push({x:item.time, y:item.low});
        });
        return extractData;
    }
    render() {

        const data = this.props.pageData.Data;
        const graphState = this.state.graphState;
        var extractData = {};
        var showFlag = this.state.showFlag;
        if (this.props.isPageDataLoaded)
            extractData = this.getExtractedData(data, this.state.graphState);

        return (
            <div className="contain">
                <Dropdown options={options} onChange={this.onSelect.bind(this)} value={options[[graphState]]} placeholder="Select an option" />
                <XYPlot height={500} width={1000}>
                    <LineSeries data={extractData['Open']} style={{display: [4,0].includes(graphState)&&showFlag?'block':'none'}}/>
                    <LineSeries data={extractData['Close']} style={{display: [4,1].includes(graphState)&&showFlag?'block':'none'}}/>
                    <LineSeries data={extractData['High']} style={{display: [4,2].includes(graphState)&&showFlag?'block':'none'}}/>
                    <LineSeries data={extractData['Low']} style={{display: [4,3].includes(graphState)&&showFlag?'block':'none'}}/>
                    <XAxis />
                    <YAxis />
                </XYPlot>
                <DiscreteColorLegend
                    height={200}
                    width={300}
                    items={ITEMS}
                    onItemClick = {this.onLegendClick.bind(this)}
                />
            </div>
        );
    }
}
Graph.propTypes = {
    getPageData: PropTypes.func.isRequired,
};

export default connect(
    selector,
    { ...actions },
)(Graph);