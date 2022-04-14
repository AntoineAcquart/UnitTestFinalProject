import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    rootDir: 'src',
    coverageDirectory: 'src',
    coveragePathIgnorePatterns: ['./migrations'],
    maxWorkers: 1
}
export default config