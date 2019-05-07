// Interface
class Logger {
    // Operation()
    log(input) {
    }
}

class ConsoleLogger extends Logger {
    log(input) {
        console.log(input)
    }
}

class MemoryLogger extends Logger {
    constructor() {
        super()
        this._memory = []
    }
    log(input) {
        this._memory.push(input)
    }
}

// Interface
class LogCreator {
    // FactoryMethod()
    createLogger() {
    }
}

class ConsoleCreator extends LogCreator {
    createLogger() {
        return new ConsoleLogger()
    }
}

class MemoryCreator extends LogCreator {
    createLogger() {
        return new MemoryLogger()
    }
}

class Client {
    constructor() {
        this.consoleLogger = new ConsoleCreator().createLogger()
        this.memoryLogger = new MemoryCreator().createLogger()
    }

    doOperation(operationText, loggerType) {
        if (loggerType === 'memory') {
            this.memoryLogger.log(operationText)
        } else {
            this.consoleLogger.log(operationText)
        }
    }
}

module.exports = {
    ConsoleLogger,
    MemoryLogger,
    ConsoleCreator,
    MemoryCreator,
    Client
}
