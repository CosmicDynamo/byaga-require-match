/*
 * MIT License
 *
 * Copyright (c) 2019 CosmicDynamo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const glob = require('glob');
const path = require('path');

module.exports = function (match, baseDir = '') {
    const fullPath = path.resolve(path.relative('./', baseDir), match);
    return new Promise((resolve, reject) => {
        glob(fullPath, null, function (err, files) {
            if (err) {
                return reject(err);
            }

            resolve(files.map(path => {
                const parts = path.split('/');
                const file = parts[parts.length - 1];
                console.log();
                return {
                    file,
                    name: file.split('.')[0],
                    path: path.substring(baseDir.length, path.lastIndexOf('/') + 1),
                    exports: require(path)
                };
            }));
        });
    });
};