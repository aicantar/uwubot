const UwU = require('../lib/uwu')

test('convert simple English sentence to UwUspeak', () => {
  expect(UwU('Hello how are you doing today?')).toBe('Hewwo how awe you doing today?')
})

test('convert elaborate English sentence to UwUspeak', () => {
  expect(UwU('Serverless deployment with no maintenance at all')).toBe('Sewvewless depwoyment wif nyo maintenyance at aww')
})
