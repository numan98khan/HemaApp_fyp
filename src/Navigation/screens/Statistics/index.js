const list = [
  {
    country: 'Pakistan',
    sessions: 83,
  },
  {
    country: 'US',
    sessions: 11,
  },
  {
    country: 'Australia',
    sessions: 69,
  },
]

import React from 'react'
import { StyleSheet, Platform, Image, Text, View, ScrollView,  Dimensions } from 'react-native'

// import {Snackbar, TextInput, Card, Avatar, Button, Dialog, Portal, Title,List, Checkbox , Paragraph  } from 'react-native-paper';

import { Header, Icon, ButtonGroup, Divider, Rating, AirbnbRating, ListItem } from 'react-native-elements';
import ProductStyles from '../../common/productStyle';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts,
  toggleFilter, updateCategory, updateScreenVar } from '../../../state/actions';

import database from '@react-native-firebase/database';

import NavBar from '../../navBar'

// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart
// } from "react-native-chart-kit";

class OrderCollection extends Array {
  sum(key) {
      return this.reduce((a, b) => a + (b[key] || 0), 0);
  }
}

class Statistics extends React.Component {
  state = { 
    currentUser: null,
    totalSession: 163,
    orderList: [],
    totalSales: 0,
    productOrder: [],
    productCount: 0,
    monthlySales: {
      labels: [
        'January',
        'February',
        'March',
        'April',
      ],
      datasets: [
        {
          data: [20, 45, 28, 40],
        },
      ],
    }  
  }

  onFocusFunction = () => {
    // do some stuff on every screen focus
    this.props.updateScreenVar({screen:'statistics'});
    console.log("statistics focused");
  }

  // and don't forget to remove the listener
  componentWillUnmount () {
    this.focusListener.remove()
  }

  countTotalSales(){
    var i;

    var totalSum = 0;
    for (i = 0; i < this.state.orderList.length; i++) {
      totalSum += this.state.orderList[i].bill;
    }  

    this.setState({ totalSales: totalSum });
    // console.log(totalSum);
  }

  getMonthlySales(){
    var orders = this.state.orderList 

    const monthData=['Jan', 'Feb', 'Mar', 'Apr',
                    'May', 'Jun', 'Jul', 'Aug',
                    'Sep', 'Oct', 'Nov', 'Dec']

        const dataStruct = []

      if (orders.length > 0) {
        var date;// = new Date(1578154896000);
        // var month = date.getMonth();

        orders = orders.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1).reverse()
        
        // console.log(orders[0].createdAt)
        // date = new Date(orders[0].createdAt*1000)
        // console.log(date.getMonth())

        var sumOrdersMonthly;// = new OrderCollection(...orders)
        var monthCounter = 0;
        var prevBracket = 0;
        var currMonth = (new Date(orders[0].createdAt*1000)).getMonth();
        var isDone = false;
        // console.log(orders)

        // console.log()

        var uniqueMonths = [];
        

        var order;
        for (order = 0; order < orders.length; ++order){
            
            orders[order]['month'] = monthData[(new Date(orders[order].createdAt*1000)).getMonth()]
            // console.log('arr ', orders[order])

            if (uniqueMonths.indexOf(orders[order].month) === -1){
                uniqueMonths.push(orders[order].month)
            }
        }

        // console.log(uniqueMonths)

        for (var month in uniqueMonths){
            // console.log('uniquer ', orders.filter(obj => { return obj.month === month }))
            sumOrdersMonthly = new OrderCollection(...orders.filter(obj => { return obj.month === uniqueMonths[month] }))
            // console.log('sumOrder ', sumOrdersMonthly)
            dataStruct.push([uniqueMonths[month], sumOrdersMonthly.sum('bill')]);
        }


        // dataStruct.push(['Month', 'Sales'])

        dataStruct.reverse()
      }
    
      var final = { labels: [], datasets: [{ data: new Array }] }

      var i;
      for (i = 0; i < dataStruct.length; ++i) {
        final.labels.push(dataStruct[i][0])
        final.datasets[0].data.push(dataStruct[i][1])
      }

      
      console.log({
        labels: [
          'January',
          'February',
          'March',
          'April',
        ],
        datasets: [ 
          {
            data: [20, 45, 28, 40],
          },
        ],
      })

    this.setState({monthlySales: final})
    console.log('STRUCTURE :', dataStruct, final)
    // return dataStruct.reverse()
  }

  orderProducts(){

    var orders = this.state.orderList 
    var products = this.state.productList

    // var i;
    // var totalProd = [];

    var uniqueIds = []

    for (var order in orders){
        // console.log(uniqueIds.indexOf(orders[order].product))
        if (uniqueIds.indexOf(orders[order].product) === -1){
            uniqueIds.push(orders[order].product)
        }
    }

    // console.log(uniqueIds)
    // console.log(products)

    // console.log(products.filter(obj => { return obj.id === uniqueIds[0] })[0])

    const dataStruct = [];
    for (var id in uniqueIds){
        dataStruct.push([products.filter(obj => { return obj.id === uniqueIds[id] })[0],
                        orders.filter((obj) => obj.product === uniqueIds[id]).length])
        // console.log('yeah', orders.filter((obj) => obj.product === uniqueIds[id]).length)
        // dataStruct.push([products.filter(obj => { return obj.id === uniqueIds[id] })[0],
        //                 3])
        
    }

    dataStruct.sort(function(a,b) {
        return a[1]-b[1]
    });

    dataStruct.reverse()

    console.log('dataStruct : ', dataStruct)

    this.setState({ productOrder: dataStruct })
    // return dataStruct.reverse()

  }

  componentDidMount() {
    // this.props.updateScreenVar({screen:'reviews'});

    console.log('toggle drawer')
    // this.props.navigation.toggleDrawer()

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })

    var productList = []

    database().ref('/').child('products').orderByChild('sellerId').equalTo(this.props.products.userObj.uid).on("value", function(snapshot) {
      
      snapshot.forEach(function(data) {
        var tempJSON = data.val()
        tempJSON['id'] = data.key

        productList.push(tempJSON);
      }.bind(this));
      
      database().ref('/').child('orders').orderByChild('sellerId').equalTo(this.props.products.userObj.uid).on("value", function(snapshot) {
          // uHrYlhp39KS7Bsl5FYsSQzm9m8x2  
        // console.log(snapshot);
          var orderList = [];
          snapshot.forEach(function(data) {
            orderList.push(data.val());
          }.bind(this));
          this.setState({orderList: orderList, productList: productList});
          this.countTotalSales();
          this.getMonthlySales();
          this.orderProducts();

          this.setState({ productCount: productList.length })
          // this.orderProducts();
          // console.log(orderList)
      }.bind(this));    
    }.bind(this));

    // connect to a Firebase table
    //  var dbref = this.props.products.dbh.ref('products');
    // save database reference for later
    //  this.props.products.setState ( {dbulref: dbref});
    // meat: this is where it all happens
    //  dbref.on('value', (e) => {
        // var rows = [];
        // eJSON = e.toJSON()
        // for(var i in eJSON){
        //   rows.push(eJSON[i]);
        // }
        // var ds = rows;

    //  });

  }

  getPercentage(count){
    // total = 163
    return Math.round(((count/this.state.totalSession)*100) * 10) / 10
  }

render() {
    const { currentUser } = this.state
return (
    <View>
      <NavBar/>
      <ScrollView>
      {/*
      <Card style={styles.firstCardContainer}>
        <Card.Title title="Sales" titleStyle={styles.purpDreams} subtitle="Last Week" />
        <Card.Content style={{paddingBottom:'1%'}}>
          <Text style={{fontSize:40, color:'#b380ff'}}>{this.state.totalSales} Rs.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.cardContainer}>
      <Card.Title title="Sales" titleStyle={styles.purpDreams} subtitle="Monthly" />
      <Card.Content style={{paddingBottom:'1%'}}>
        <BarChart
          data={
            this.state.monthlySales
          //   {
          //   labels: [
          //     'January',
          //     'February',
          //     'March',
          //     'April',
          //   ],
          //   datasets: [
          //     {
          //       data: [20, 45, 28, 40],
          //     },
          //   ],
          // }
        }
          width={Dimensions.get('window').width*0.81}
          // width={'80%'}
          height={200}
          // yAxisLabel={'Rs'}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#f0e6ff',
            backgroundGradientTo: '#f0e6ff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(102, 0, 255, ${opacity})`,
            style: {
              borderRadius: 30,
              // padding:50
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />
      </Card.Content>
    </Card>

      <Card style={styles.cardContainer}>
        <Card.Title title="Products" titleStyle={styles.purpDreams} subtitle="On The Market" />
        <Card.Content style={{paddingBottom:'1%'}}>
          <Text style={{fontSize:40, color:'#b380ff'}}>{this.state.productCount}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.cardContainer}>
        <Card.Title title="World Domination" titleStyle={styles.purpDreams} subtitle="Audience" />
        <Card.Content>
          <View style={{justifyContent: 'center', flexDirection:'row'}}>
            <Text style={{marginVertical:'1%', marginHorizontal:'2%', width:'56%', fontSize:11}}>
                Country
            </Text>
            <Text style={{marginVertical:'1%', marginHorizontal:'2%', width:'18%', fontSize:11}}>
                Sessions
            </Text>
            <Text style={{marginVertical:'1%', marginHorizontal:'2%', width:'18%', fontSize:11}}>
              Total %
            </Text>
            
          </View>
          <Divider style={{ 
            backgroundColor: '#6600ff', 
              marginVertical:'1%',
            }} />

            {
              // list.map((l, i) => (
              list.map((l, i) => (
                <View>
                <View style={{justifyContent: 'center', flexDirection:'row'}}>
                  <Text style={{color:"#6600ff", marginVertical:'1%', marginHorizontal:'2%', width:'56%', fontSize:11}}>
                      {l.country}
                  </Text>
                  <Text style={{color:"#6600ff", marginVertical:'1%', marginHorizontal:'2%', width:'18%', fontSize:11}}>
                      {l.sessions}
                  </Text>
                  <Text style={{color:"#6600ff", marginVertical:'1%', marginHorizontal:'2%', width:'18%', fontSize:11}}>
                      {this.getPercentage(l.sessions)}%
                  </Text>
                  
                </View>
                <Divider style={{ 
                  backgroundColor: '#6600ff', 
                    marginVertical:'1%',
                    height:3,
                    marginRight: String(100-this.getPercentage(l.sessions))+'%'
                  }} />
                </View>
              ))
            }
        </Card.Content>
      </Card>

      <Card style={styles.cardContainer}>
        <Card.Title title="Top Sold Products" titleStyle={styles.purpDreams}/>
        <Card.Content>
        {
          // list.map((l, i) => (
          this.state.productOrder.map((l, i) => (
            <ListItem
                containerStyle={{width:'100%'}}
                key={i}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                leftAvatar={{ source: { uri: l[0].image } }}
                title={l[0].name}
                subtitle={"Sold "+l[1]+" Times"}
                titleStyle={{color:"#6600ff"}}
                // bottomDivider
                // chevron={myMenu}
              />
          ))
        }
        </Card.Content>
      </Card>

      <Card style={styles.cardContainer}>
        <Card.Title title="Bumper" titleStyle={styles.purpDreams}/>
        <Card.Content>
        
        </Card.Content>
      </Card>*/}

      </ScrollView>
      

    </View>
    )
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    margin:'5%',
    marginVertical:'2.5%'
  },
  firstCardContainer: {
    margin:'5%',
    marginVertical:'2.5%',
    marginTop:'5%'
  },
  
  purpDreams: {
    color:"#6600ff"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => {
  const { products } = state
  return { products }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateProducts,
    initiateProducts,
    toggleFilter,
    updateCategory,
    updateScreenVar,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);