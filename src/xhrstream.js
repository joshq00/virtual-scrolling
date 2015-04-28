var stream = require('stream')

class XHRStream extends stream.Stream {
  constructor (xhr) {
    super();
    this.xhr = xhr
    this.offset = 0
    xhr.onreadystatechange = this.handle.bind(this)
    xhr.send(null)
  }
  handle () {
    // readyState 3 will be fired many times during a large download
    if (this.xhr.readyState === 3) this.write()
    if (this.xhr.readyState === 4) this.emit('end')
  }

  write () {
    // if (!this.responseArray) this.responseArray = new Int8Array(this.xhr.response)
    // if (this.responseArray.byteLength > this.offset) {
    //   this.emit('data', this.responseArray.slice(this.offset))
    //   this.offset = this.responseArray.byteLength
    // }
    let { response } = this.xhr;
    if (response.length > this.offset) {
      this.emit('data', response.substring(this.offset))
      this.offset = response.length;
    }
  }
}
export default XHRStream;
