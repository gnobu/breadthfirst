import {Component} from 'react';

class UserDetail {
    constructor(bank, acctNo){
        this.bank= bank;
        this.acctNo= acctNo;
    }
}

const zero = new UserDetail('GTBank', '1423');
const one = new UserDetail('FirstBank', '2845');
const two = new UserDetail('Zenith', '0913');

class BankDetail extends Component {
    constructor(props){
        super(props);
        this.detail = {
            0: zero,
            1: one,
            2: two
        }
    }
    render(){
        return (
            <>
                <li>Bank Name: {this.detail[this.props.id].bank}</li>
                <li>Account Number: {this.detail[this.props.id].acctNo}</li>
            </>
        )
    }
}
export default BankDetail;

class ClassUser extends Component {
    constructor(props){
        super(props);
        this.users = [
            {n: 'Ubong', id: 0},
            {n: 'Mitchel', id: 1},
            {n: 'Eddy', id: 2}
        ]
    }
    render(){
        return (
            <div>
                <p>Name: {this.users[this.props.idx].n}</p>
                <BankDetail id={this.users[this.props.idx].id} />
            </div>
        )
    }
}

class ClassCount extends Component {
    constructor(props){
        super(props);
        this.state = {
            x: 0,
            y: 0
        }
        this.inc = this.inc.bind(this);
        this.dec = this.dec.bind(this);
    }
    inc = () => {
        this.setState(state => {
            return {x: state.x+1}
        })
    }
    dec = () => {
        this.setState(state => {
            return {x: state.x-1}
        })
    }
    render(){
        return (
            <div>
              <span>
                <button onClick={this.dec}>decrease</button>
                <span>User({this.state.x})</span>
                <button onClick={this.inc}>increase</button>
              </span>
              <ClassUser idx={this.state.x} />
            </div>
          )
    }
}
export {ClassCount};