import React from 'react'; 

import {  Row } from 'antd';
import { DashboardProvider } from '../../context/context'; 
import SearchForm from './SearchForm'; 
import Graph from './Graph';  

 class Index extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      value: {legends:[],date:[], series:[]},
      setValue: this.setValue
    }; 
  }

  setValue = value => { 
    this.setState({ value });
  }; 
   

  render(){
    const { value } = this.state;
    return (
      <DashboardProvider value={this.state}>
        <Row justify="space-between">
          <Row style={{  marginTop: 20 }} >
            <SearchForm/>
          </Row>
          <Row style={{  marginTop: 20 }} >
            <Graph/> 
          </Row>
        </Row>
      </DashboardProvider>
    );
  }

}
 
export default Index;
