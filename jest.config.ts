const config = {
    verbose: true,
    preset: 'ts-jest',
    testMatch: ['**/?(*.)+(test).ts'],
    globals: {
        'ts-jest': {
            diagnostics: {
                ignoreCodes: [
                    'TS151001',
                ],
            }
        }
    }
}

export default config
