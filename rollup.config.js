import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: pkg.source,
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    plugins: [
      babel({ runtimeHelpers: true }),
      // for @babel/runtime (a common js package)
      resolve(),
      commonjs()
    ]
  },
  {
    input: pkg.source,
    output: {
      file: pkg.module,
      format: 'es',
      plugin: [
        babel({ runtimeHelpers: true }),
        // for @babel/runtime (a common js package)
        resolve(),
        commonjs()
      ]
    }
  },
  {
    input: pkg.source,
    output: {
      file: 'dist/keep-try.browser.js',
      format: 'iife',
      plugin: [
        babel({ runtimeHelpers: true }),
        // for @babel/runtime (a common js package)
        resolve(),
        commonjs()
      ],
      name: 'keepTry'
    }
  },
  {
    input: pkg.source,
    output: {
      file: 'dist/keep-try.browser.min.js',
      format: 'iife',
      plugin: [
        babel({ runtimeHelpers: true }),
        // for @babel/runtime (a common js package)
        resolve(),
        commonjs(),
        uglify()
      ],
      name: 'keepTry'
    }
  }
]
