import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Cell from './Cell'

import 'bootstrap/dist/css/bootstrap.min.css';

//<Cell color={"blue"} width={100} height={100} />
//<Cell color={"red"} width={100} height={100} />


export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      word: '',
      groups: []
    }
    this.setWordChange = this.setWordChange.bind(this)
    this.colorize = this.colorize.bind(this)
    this.enterPress = this.enterPress.bind(this)
  }

  setWordChange(event) {
    // console.log(event.target.value)
    this.setState({word: event.target.value})
  }

  enterPress(event) {
    if (event.charCode === 13) {
      this.colorize()
      event.preventDefault()
    }
  }

  colorize() {
    if (this.state.word !== '') {
      this.setState({groups: []})
      let hex_keys = {
        "0000":"0","0001":"1","0010":"2","0011":"3","0100":"4","0101":"5","0110":"6",
        "0111":"7","1000":"8","1001":"9","1010":"A","1011":"B","1100":"C","1101":"D",
        "1110":"E","1111":"F"
      }
      let binary = "";
      for (let letter in this.state.word) {
        let b_letter = this.state.word[letter].charCodeAt(0).toString(2);
        while (b_letter.length < 8){
          b_letter = "0" + b_letter;
        }
        binary += b_letter
        // console.log(b_letter);
      }
      // console.log(binary);
      let hex_groups = binary.match(/.{1,4}/g)
      // console.log(hex_groups);
      let hex = "";
      for (let group in hex_groups) {
        hex += hex_keys[hex_groups[group]];
      }
      // console.log(hex);
      hex_groups = hex.match(/.{1,6}/g);
      console.log(hex_groups)
      this.setState({groups: hex_groups})
      this.setState({word: ''})
    } else {
      alert("No word to colorize entered")
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Form>
            <Form.Control 
              placeholder="Message to Colorize" 
              value={this.state.word} 
              onChange={this.setWordChange}
              onKeyPress={this.enterPress}/>
          </Form>
          <Button type="submit" onClick={this.colorize}>Colorize</Button>
        </Row>
        <Row>
          {this.state.groups.map(
            color =>
            <Cell color={'#' + color.toString()} height={100} />
          )}
        </Row>
      </Container>
    )
  }
}