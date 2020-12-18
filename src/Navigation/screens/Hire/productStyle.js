import React from 'react';
import { View, StyleSheet, Button, BackHandler, Alert, Text } from 'react-native';

export default StyleSheet.create({
    // container: {
    //   flex: 1,
    // },
    largeREQText:{
      fontSize:20,
      fontWeight:'bold',
      color:'#0000ff'
    },
    largeREJText:{
      fontSize:20,
      fontWeight:'bold',
      color:'#ff3300'
    },
    largeACCText:{
      fontSize:20,
      fontWeight:'bold',
      color:'#00ff00'
    },
    largeDISText:{
      fontSize:20,
      fontWeight:'bold',
      // color:'#6600ff'
    },
    smallREQText:{
      fontSize:12,
      fontWeight:'bold',
      color:'#0000ff'
    },
    smallREJText:{
      fontSize:12,
      fontWeight:'bold',
      color:'#ff3300'
    },
    smallACCText:{
      fontSize:12,
      fontWeight:'bold',
      color:'#00ff00'
    },
    smallDISText:{
      fontSize:12,
      fontWeight:'bold',
      // color:'#6600ff'
    },
    categoryText:{
        fontSize:12,
        fontWeight:'bold',
        // marginVertical:'2%',
        marginBottom:'2%'
      },
    ratingText:{
      fontSize:14,
      fontWeight:'bold',
      marginVertical:'2%',
    },
    descriptionHeader:{
      fontSize:20,
      fontWeight:'bold',
      marginVertical:'2%',
    },
    descriptionText:{
      fontSize:14,
      // fontWeight:'bold',
      marginVertical:'2%',
    },
    ratingCount:{
      fontSize:14,
    },
    headerText:{
      fontSize:30,
      fontWeight:'bold',
    //   marginVertical:'2%'
      marginTop:'2%'
    },
    priceText:{
      fontSize:20,
      fontWeight:'bold',
      color:'#6600ff'
    },
    dividerStyle:{ 
        backgroundColor: '#6600ff', 
          marginVertical:'5%',
      },
    AvatarStyle:{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
    },
    container: {
      flex: 1,
      padding: 20,
      alignItems: "stretch",
      backgroundColor: '#ffffff',
    },
    control:{
      ...Platform.select({
        android:{
          height:40
        },
        ios:{
          borderBottomWidth:StyleSheet.hairlineWidth,
          borderBottomColor:'grey',
          marginTop:20,
          marginBottom:20
        }
      })
    },
    additionalInfo:{
      ...Platform.select({
        ios:{
          height:80
        }
      })
    }
  });