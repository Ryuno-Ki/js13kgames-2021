import buble from '@rollup/plugin-buble'
import license from 'rollup-plugin-license'
import { terser } from 'rollup-plugin-terser'

const LICENSE_HEADER = `
This file is part of JS13kGames - SPACE.
Combat Scorched Earth from Outer Space is free software:
you can redistribute it and/or modify it under the terms of the
GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.
Combat Scorched Earth from Outer Space is distributed in the hope
that it will be useful, but WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
details. You should have received a copy of the GNU General Public License
along with Combat Scorched Earth from Outer Space.
If not, see <https://www.gnu.org/licenses/>.`

export default {
  input: './src/js/app.js',
  output: {
    file: './dist/app.js',
    format: 'iife',
    name: 'game'
  },
  plugins: [
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
