/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
const config: Config = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: [
    'js',
    'ts',
    'json'
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  testEnvironment: 'node',
  testRegex: ['.*\\.unit-(spec|test)\\.ts$'],
  transform: { '^.+\\.(t|j)s$': 'ts-jest' }
}

export default config
