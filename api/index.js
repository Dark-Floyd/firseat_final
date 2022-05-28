import axios from 'axios'

const getAllLines = async () => {
  try {
    let lines = []
    const BusLines = await axios('http://firseat-api.herokuapp.com/trips?size=10')
    for (let line of BusLines.data.trips) {
      lines.push(line)
    }
    return lines
  } catch (error) {
    console.log(error)
  }
}
const getStation = async () => {
  try {
    const stationsFetched = await axios(
      'http://firseat-api.herokuapp.com/stations',
    )
    return stationsFetched.data.stations[0]
  } catch (error) {
    console.log(error)
  }
}
const getStationbyNFCToken = async () => {
  try {
    const stationsFetched = await axios(
      'http://firseat-api.herokuapp.com/stations/tag',
    )
    return stationsFetched.data.stations[0]
  } catch (error) {
    console.log(error)
  }
}
export { getAllLines, getStation, getStationbyNFCToken }
