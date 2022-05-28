import React from 'react'
import { useState } from 'react'
import { Box, Center } from 'native-base'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import OrderTicketModal from './OrderTicketModal'
import Colors from '../constants/colors'
import { FontAwesome5 } from '@expo/vector-icons'
const Bus = (props) => {
  const [isOrderTicket, setIsOrderTicket] = useState(false)
  return (
    <View>
      <Center>
        <OrderTicketModal
          isOpen={isOrderTicket}
          close={() => setIsOrderTicket(false)}
          line={props.line}
          start={props.start}
          destination={props.destination}
          frequency={props.frequency}
          addTicket={props.addTicket}
          ticket={props.ticket}
          availableSeats={props.availableSeats}
        />
      </Center>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsOrderTicket(true)}
      >
        <View style={styles.card}>
          <Text style={styles.headerTitle}>{props.line}</Text>
          <Text style={styles.details}>Destination: {props.destination}</Text>
          <Text style={styles.details}>Next Bus: {props.frequency}</Text>
          <Center>
            <Box style={styles.icon} width={24}>
              <FontAwesome5 name="ticket-alt" size={32} color="white" />
              <Text style={{color:'white'}}>Order Ticket</Text>
            </Box>
          </Center>
        </View>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    margin: 10,
    height: 140,
    borderRadius: 15,
    marginVertical: 5,
  },
  headerTitle: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    fontSize: 20,
    color: Colors.notification,
    fontWeight: 'bold',
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  details: {
    color: 'grey',
    borderBottomWidth: 0.5,
    paddingLeft: 5,
    fontSize:15,
  },
  icon: {
    margin: 4,
    alignItems: 'center',
    backgroundColor: Colors.notification,
    padding:5,
    borderRadius:10,
  },
  iconBox:{
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Bus
