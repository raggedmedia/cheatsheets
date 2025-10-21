/**
 * Modern JavaScript Debugging Techniques Demo
 *
 * This file demonstrates professional debugging approaches that go beyond console.log
 * Run this in a browser with DevTools open to see the debugging features in action
 */

// =============================================================================
// 1. CONDITIONAL BREAKPOINTS & LOGPOINTS DEMO
// =============================================================================

function processUsers(users) {
    console.group('🔍 Processing Users');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // Set a conditional breakpoint here: right-click → "Add conditional breakpoint"
        // Condition: user.age > 65 || user.status === 'premium'

        // Set a logpoint here: right-click → "Add logpoint"
        // Expression: `Processing user ${user.name} (${user.age}yo, ${user.status})`

        if (user.age < 18) {
            user.category = 'minor';
        } else if (user.age > 65) {
            user.category = 'senior';
        } else {
            user.category = 'adult';
        }

        // Calculate premium discount
        if (user.status === 'premium') {
            user.discount = user.age > 65 ? 0.2 : 0.1;
        }
    }

    console.groupEnd();
    return users;
}

// =============================================================================
// 2. SMART CONSOLE METHODS DEMO
// =============================================================================

function demonstrateSmartLogging() {
    console.group('📊 Smart Logging Techniques');

    // Sample data
    const users = [
        { id: 1, name: 'Alice', age: 28, status: 'premium', email: 'alice@example.com' },
        { id: 2, name: 'Bob', age: 72, status: 'basic', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', age: 16, status: 'basic', email: 'charlie@example.com' },
        { id: 4, name: 'Diana', age: 45, status: 'premium', email: 'diana@example.com' }
    ];

    // ❌ BAD: Bare console.log
    console.log('--- BAD APPROACH ---');
    console.log(users[0].name, users[0].age, users[0].status);

    // ✅ GOOD: Labeled object logging
    console.log('--- GOOD APPROACH ---');
    const user = users[0];
    console.log('User details:', { name: user.name, age: user.age, status: user.status });

    // 🔥 EXCELLENT: console.table for arrays/objects
    console.log('\n📋 Users Table:');
    console.table(users);

    // 🔥 EXCELLENT: console.dir for deep object inspection
    const complexObject = {
        user: users[0],
        metadata: {
            timestamp: new Date(),
            source: 'api',
            nested: {
                level1: { level2: { level3: 'deep value' } }
            }
        }
    };
    console.log('\n🔍 Deep Object Inspection:');
    console.dir(complexObject, { depth: 4 });

    // 🔥 EXCELLENT: console.group for organized logging
    console.group('🛠 Processing Pipeline');
    console.log('Step 1: Validation');
    console.log('Step 2: Transformation');
    console.group('🔄 Substeps');
    console.log('  - Normalize data');
    console.log('  - Apply business rules');
    console.groupEnd();
    console.log('Step 3: Persistence');
    console.groupEnd();

    console.groupEnd();
}

// =============================================================================
// 3. TIMING & PERFORMANCE DEBUGGING
// =============================================================================

function demonstratePerformanceDebugging() {
    console.group('⏱️ Performance Debugging');

    // Time expensive operations
    console.time('Data Processing');

    const largeArray = Array.from({ length: 100000 }, (_, i) => ({
        id: i,
        value: Math.random() * 1000,
        processed: false
    }));

    console.timeLog('Data Processing', 'Array created');

    // Simulate processing
    const processed = largeArray.map(item => ({
        ...item,
        processed: true,
        doubled: item.value * 2
    }));

    console.timeLog('Data Processing', 'Mapping complete');

    const filtered = processed.filter(item => item.doubled > 500);

    console.timeEnd('Data Processing');

    console.log(`Processed ${largeArray.length} items, ${filtered.length} passed filter`);

    console.groupEnd();
}

// =============================================================================
// 4. ASSERTION-BASED DEBUGGING
// =============================================================================

function demonstrateAssertions() {
    console.group('✅ Assertion-Based Debugging');

    function validateUser(user) {
        console.assert(user, 'User object is required');
        console.assert(user.email, 'User email is required', { user });
        console.assert(user.email.includes('@'), 'Invalid email format', { email: user.email });
        console.assert(user.age >= 0, 'Age cannot be negative', { age: user.age });
        console.assert(typeof user.name === 'string', 'Name must be a string', { name: user.name });

        return true;
    }

    // Valid user
    validateUser({ name: 'John', email: 'john@example.com', age: 30 });

    // Invalid users (will trigger assertions)
    try {
        validateUser(null);
    } catch (e) { /* ignore */ }

    try {
        validateUser({ name: 'Jane', email: 'invalid-email', age: 25 });
    } catch (e) { /* ignore */ }

    try {
        validateUser({ name: 123, email: 'test@example.com', age: -5 });
    } catch (e) { /* ignore */ }

    console.groupEnd();
}

// =============================================================================
// 5. EXCEPTION HANDLING & DEBUGGING
// =============================================================================

function demonstrateExceptionDebugging() {
    console.group('🚨 Exception Debugging');

    function riskyOperation(data) {
        if (!data) {
            throw new Error('Data is required');
        }

        if (!Array.isArray(data)) {
            throw new TypeError('Data must be an array');
        }

        return data.map(item => {
            if (typeof item !== 'object') {
                throw new Error(`Invalid item type: ${typeof item}`);
            }

            return {
                ...item,
                processed: true,
                timestamp: new Date().toISOString()
            };
        });
    }

    // Success case
    try {
        const result = riskyOperation([{ id: 1, name: 'test' }]);
        console.log('✅ Success:', result);
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Stack trace:', error.stack);
    }

    // Error cases
    const testCases = [
        null,
        'not an array',
        [1, 2, 3], // invalid items
        [{ valid: true }, 'invalid item']
    ];

    testCases.forEach((testCase, index) => {
        try {
            console.log(`\nTest case ${index + 1}:`);
            riskyOperation(testCase);
        } catch (error) {
            console.error(`❌ Test ${index + 1} failed:`, {
                message: error.message,
                type: error.constructor.name,
                input: testCase
            });
        }
    });

    console.groupEnd();
}

// =============================================================================
// 6. PROFESSIONAL LOGGER IMPLEMENTATION
// =============================================================================

class Logger {
    constructor(context = 'App') {
        this.context = context;
        this.level = 'debug'; // debug, info, warn, error
    }

    setLevel(level) {
        this.level = level;
    }

    _shouldLog(level) {
        const levels = ['debug', 'info', 'warn', 'error'];
        return levels.indexOf(level) >= levels.indexOf(this.level);
    }

    _formatMessage(level, message, data) {
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}] [${this.context}]`;

        if (data) {
            console.group(`${prefix} ${message}`);
            console.log(data);
            console.groupEnd();
        } else {
            console.log(`${prefix} ${message}`);
        }
    }

    debug(message, data) {
        if (this._shouldLog('debug')) {
            this._formatMessage('debug', message, data);
        }
    }

    info(message, data) {
        if (this._shouldLog('info')) {
            this._formatMessage('info', message, data);
        }
    }

    warn(message, data) {
        if (this._shouldLog('warn')) {
            console.warn(`[${this.context}] ${message}`, data || '');
        }
    }

    error(message, error) {
        if (this._shouldLog('error')) {
            console.error(`[${this.context}] ${message}`);
            if (error) {
                console.error('Error details:', {
                    message: error.message,
                    stack: error.stack,
                    type: error.constructor.name
                });
            }
        }
    }

    table(data, columns) {
        if (this._shouldLog('debug')) {
            console.log(`[${this.context}] Data table:`);
            console.table(data, columns);
        }
    }

    time(label) {
        console.time(`[${this.context}] ${label}`);
    }

    timeEnd(label) {
        console.timeEnd(`[${this.context}] ${label}`);
    }
}

// =============================================================================
// 7. DEMO RUNNER
// =============================================================================

function runAllDemos() {
    console.clear();
    console.log('🚀 Modern JavaScript Debugging Techniques Demo');
    console.log('Open DevTools (F12) to see all debugging features in action\n');

    // Professional logger demo
    const logger = new Logger('DemoApp');

    logger.info('Starting debugging demonstration');

    // Smart logging
    demonstrateSmartLogging();

    // Performance debugging
    demonstratePerformanceDebugging();

    // Assertions
    demonstrateAssertions();

    // Exception debugging
    demonstrateExceptionDebugging();

    // Process users with debugging opportunities
    const sampleUsers = [
        { name: 'Alice', age: 28, status: 'premium' },
        { name: 'Bob', age: 72, status: 'basic' },
        { name: 'Charlie', age: 16, status: 'basic' },
        { name: 'Diana', age: 45, status: 'premium' }
    ];

    logger.time('User Processing');
    const processedUsers = processUsers(sampleUsers);
    logger.timeEnd('User Processing');

    logger.table(processedUsers);

    logger.info('Demo completed successfully! 🎉');

    console.log('\n📝 Next Steps:');
    console.log('1. Set conditional breakpoints in processUsers function');
    console.log('2. Add logpoints to trace execution');
    console.log('3. Enable "Pause on exceptions" in DevTools');
    console.log('4. Try different logger levels: logger.setLevel("info")');
}

// =============================================================================
// 8. BROWSER DEBUGGING TIPS
// =============================================================================

function showDebuggingTips() {
    console.group('💡 Browser DevTools Tips');

    console.log(`
🔧 DevTools Shortcuts:
• F12 / Cmd+Opt+I - Open DevTools
• Ctrl+Shift+J / Cmd+Opt+J - Open Console directly
• F8 - Resume script execution
• F10 - Step over
• F11 - Step into
• Shift+F11 - Step out

🎯 Breakpoint Types:
• Line breakpoints - Click line number
• Conditional breakpoints - Right-click line number
• Logpoints - Right-click line number, choose "Add logpoint"
• Exception breakpoints - Sources panel → Pause on exceptions

🔍 Console Commands:
• $0 - Last selected element
• $1, $2... - Previously selected elements
• $$ - querySelectorAll shorthand
• copy() - Copy variable to clipboard
• inspect() - Jump to element in Elements panel

📊 Memory & Performance:
• Performance tab - Record runtime performance
• Memory tab - Take heap snapshots
• Network tab - Monitor requests
• Coverage tab - See unused code
    `);

    console.groupEnd();
}

// Auto-run demo when file is loaded
if (typeof window !== 'undefined') {
    // Browser environment
    console.log('🌐 Running in browser - full demo available');
    runAllDemos();
    showDebuggingTips();
} else {
    // Node.js environment
    console.log('🟢 Running in Node.js - limited demo');
    demonstrateSmartLogging();
    demonstratePerformanceDebugging();
    demonstrateAssertions();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Logger,
        processUsers,
        demonstrateSmartLogging,
        demonstratePerformanceDebugging,
        demonstrateAssertions,
        demonstrateExceptionDebugging
    };
}
