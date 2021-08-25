import React, {Component} from 'react';
import Aux from '../Auxiliary';
import Modal from '../../components/Burger/UI/Modal/Modal';

const withErrorHandler =(WrappedComponent, axios) => {

        return class extends Component{

            state={
                error: null
            }

            componentWillMount(){
                this.reqInterceptor = axios.interceptors.request.use(req => {
                    this.setState({error: null})
                    return req
                })
                this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                    this.setState({error: error}) 
                    console.log(error.message);
                })
            }

            componentWillUnmount() {
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
            }

            errorConfirmedHandler = () => {
                this.setState({error: null})
            }

            render(){
                return(
                <Aux>
                    <Modal purchasing={this.state.error} cancelPurchase={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
                )
            }
        }
}

export default withErrorHandler;