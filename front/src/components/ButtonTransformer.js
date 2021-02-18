import * as React from 'react';

class ButtonTransformer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            status: 'before'
        }
        this.wrapperRef = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = event => {
        console.log(this.wrapperRef.current)
        if (this.wrapperRef
            && this.wrapperRef.current
            && !this.wrapperRef.current.contains(event.target)) {
                if (this.state.status === 'after'){
                    if (this.props.onUnfocus) {
                        this.props.onUnfocus(this.wrapperRef.current)
                    }
                    this.setState({status: 'before'})
                    console.log('b')
                }
        }
    };

    render(){
        return this.state.status === 'before'
            ? React.cloneElement(this.props.before, {
                onClick: () => {
                    if (this.state.status === 'before'){
                        this.setState({status: 'after'})
                    }
                }
            })
            : React.cloneElement(this.props.after, {
                ref: this.wrapperRef
            })
    }

}

export default ButtonTransformer