import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import Header from './components/Header'
import { Provider } from 'jotai'
import Bus from './components/Bus'
import { useState, useCallback, useEffect } from 'react'
import Station from './components/Station'
import { NativeBaseProvider, Center, Spinner, Modal, Button } from 'native-base'
import TicketBar from './components/TicketBar'
import { getAllLines, getStation } from './api'
import NfcManager, { NfcTech } from 'react-native-nfc-manager'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from './constants/colors'

export default function App() {
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef)
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag()
      console.warn('Tag found', tag)
      if(tag.id==stationApi.NFCToken)
        setNFCModal(false)
      //
    } catch (ex) {
      console.warn('Oops!', ex)
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest()
    }
  }
  const [ticket, setTicket] = useState(null)
  const [linesApi, setLinesApi] = useState([])
  const [stationApi, setStationApi] = useState(null)
  const [NFCModal, setNFCModal] = useState(true)
  
  const fetchStation = useCallback(async () => {
    const res_station = await getStation()
    setStationApi(res_station)
  }, [])

  const fetchLines = useCallback(async () => {
    const res = await getAllLines()
    setLinesApi(res)
  }, [])
  const renderLines = (lines) => {
    return (
      <FlatList
        showsVerticalScrollIndicator={true}
        style={styles.list}
        data={lines}
        renderItem={(itemData) => (
          <Bus
            key={itemData.id}
            line={itemData.item.lineNumber}
            frequency={itemData.item.time}
            start={itemData.item.start}
            destination={itemData.item.finalDestination}
            addTicket={addTicket}
            availableSeats={itemData.item.availableSeats}
            ticket={ticket}
          ></Bus>
        )}
      ></FlatList>
    )
  }
  useEffect(() => {
    fetchLines()
    fetchStation()
    NfcManager.start()
  }, [])
  renderStation = (station) => {
    return <Station name={station.name} id={station.stationNumber} />
  }
  const addTicket = (userId, ticket) => {
    setTicket(ticket)
  }
  const removeTicket = () => {
    setTicket(null)
  }
  return (
    <NativeBaseProvider>
      <Provider>
        <View style={styles.container}>
          <Modal maxWidth="450px" style={styles.modalContent} isOpen={NFCModal}>
            <Center>
            <Text style={styles.headerTitle}>Firseat</Text>
              <MaterialCommunityIcons
                name="cellphone-nfc"
                size={120}
                color="white"
              />
              <Button
                onPress={readNdef}
                variant="outline"
                colorScheme={'dark'}
                borderRadius={20}
                margin={5}
                style={styles.button}
              >
                Press to Scan
              </Button>
            </Center>
          </Modal>

          <Header />
          <TicketBar ticket={ticket} removeTicket={removeTicket}></TicketBar>
          {stationApi ? renderStation(stationApi) : <Spinner size="lg" />}
          {renderLines(linesApi)}
          <StatusBar style="light" backgroundColor="transparent" />
        </View>
      </Provider>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  list: {
    width: '85%',
    height: '100%',
    marginBottom: 2,
  },
  modalContent: {
    backgroundColor: Colors.accent,
  },
  button: {
    marginTop: 10,
  },
  headerTitle:{
    color: 'white',
    fontSize: 28,
    fontFamily:'sans-serif-condensed',
    fontWeight:'bold'
  }
})
