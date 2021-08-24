import buble from '@rollup/plugin-buble'
import copy from 'rollup-plugin-copy'
import license from 'rollup-plugin-license'
import { terser } from 'rollup-plugin-terser'

const LICENSE_HEADER = `
This file is part of JS13kGames - SPACE.
Lido Space is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
Lido Space is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with Lido Space.  If not, see <https://www.gnu.org/licenses/>.`

const client = {
  input: './src/js/app.js',
  output: {
    file: './public/client.js',
    format: 'iife',
    name: 'lido'
  },
  plugins: [
    copy({
      flatten: true,
      verbose: true,
      targets: [{
        src: './node_modules/zzfx/ZzFXMicro.min.js',
        dest: './public/'
      }, {
        src: './src/index.html',
        dest: './public/'
      }, {
        src: './src/js/shared.js',
        dest: './public/'
      }]
    }),

    buble(),
    terser({
      output: {
        comments: false
      }
    }),

    license({
      banner: LICENSE_HEADER
    })
  ]
}

const server = {
  input: './src/js/server.js',
  output: {
    file: './public/server.js',
    format: 'cjs'
  },
  plugins: [
    terser({
      output: {
        comments: false
      }
    }),

    license({
      banner: LICENSE_HEADER
    })
  ]
}

export default [client, server]
