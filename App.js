// import { StatusBar } from 'expo-status-bar';
import React from 'react'
import {
  StyleSheet,
} from 'react-native'

import CameraScreen from './src/CameraScreen';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {YellowBox} from 'react-native';


import { Provider } from 'react-redux'
import store from './src/state/store';

import BaseApp from './src/Navigation/NavBundle';

// import { MenuProvider } from 'react-native-popup-menu';
// import {Provider as PaperProvider} from 'react-native-paper';

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);

export default function App() {
  return (

        <Provider store={store}>
          <BaseApp />
        </Provider>
  );
}


// <CameraScreen />

// <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <TouchableOpacity onPress={startRecorder} style={styles.btnCapture}>
//                 <Text style={styles.sectionTitle}>Capture video</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//       <VideoRecorder 
//         flashMode={true}
//         ref={videoRecorder} 
//         compressQuality={'medium'} 
//       />
//     </>

// <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
  btnCapture: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 25
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
