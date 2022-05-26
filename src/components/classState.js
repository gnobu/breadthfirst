import {Component} from "react";

class ClassMirrorInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: 'ClassMirrorInput'
        }
        this.update = this.update.bind(this);
    }
    update(e){
        this.setState(state => {
            return {data: e.target.value}
        })
    }
    render(){
        return (
            <>
                <input onChange={this.update} value={this.state.data} />
                <div>{this.state.data}</div>
            </>
        )
    }
}
export default ClassMirrorInput;