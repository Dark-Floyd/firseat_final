import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Colors from '../constants/colors'
const Station = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitleStation}>Station</Text>
      <Text style={styles.headerTitle}>{props.name}</Text>
      <Text style={styles.headerTitle}>{props.id}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
  },
  headerTitleStation: {
    color: 'white',
    fontSize: 22,
    width:'100%',
    textAlign:'center',
    borderBottomColor:Colors.headline,
    borderBottomWidth:0.75,
    padding:3,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
  },
})
export default Station;
