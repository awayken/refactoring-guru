const {
    ConsoleLogger,
    MemoryLogger,
    ConsoleCreator,
    MemoryCreator,
    Client
} = require('./factory')

test('ConsoleLogger', () => {
    const log = new ConsoleLogger()

    console.log = jest.fn()
    expect(console.log).not.toHaveBeenCalled()

    log.log('My item')
    expect(console.log).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalledWith('My item')

    log.log('My item 2')
    expect(console.log).toHaveBeenCalledWith('My item 2')
})

test('ConsoleCreator', () => {
    const creator = new ConsoleCreator()
    const logger = creator.createLogger()

    expect(logger).toBeInstanceOf(ConsoleLogger)
})

test('MemoryLogger', () => {
    const log = new MemoryLogger()

    expect(log._memory.length).toBe(0)

    log.log('My item')
    expect(log._memory.length).toBe(1)
    expect(log._memory).toContain('My item')

    log.log('My item 2')
    expect(log._memory.length).toBe(2)
    expect(log._memory).toContain('My item')
    expect(log._memory).toContain('My item 2')
})

test('MemoryCreator', () => {
    const creator = new MemoryCreator()
    const logger = creator.createLogger()

    expect(logger).toBeInstanceOf(MemoryLogger)
})

test('Client', () => {
    const client = new Client()

    expect(client.consoleLogger).toBeInstanceOf(ConsoleLogger)
    expect(client.memoryLogger).toBeInstanceOf(MemoryLogger)

    client.consoleLogger.log = jest.fn()
    expect(client.consoleLogger.log).not.toHaveBeenCalled()

    client.memoryLogger.log = jest.fn()
    expect(client.memoryLogger.log).not.toHaveBeenCalled()

    client.doOperation('My item')
    expect(client.memoryLogger.log).toHaveBeenCalledTimes(0)
    expect(client.consoleLogger.log).toHaveBeenCalledTimes(1)
    expect(client.consoleLogger.log).toHaveBeenCalledWith('My item')

    client.doOperation('My item 2', 'memory')
    expect(client.memoryLogger.log).toHaveBeenCalledTimes(1)
    expect(client.memoryLogger.log).toHaveBeenCalledWith('My item 2')
    expect(client.consoleLogger.log).toHaveBeenCalledTimes(1)
})
