import React from "react";
import Form from "../form/form";
import styles from './stylesApp.scss';
import Table from "../table/table";
import {connect} from "react-redux";
import {IAdList, ISetAdListAction} from "../../interface/interfaces";
import {Dispatch} from "redux";
import setItemAdListAction from "../../redux/actions/setItemAdListAction";

class App extends React.Component<IAdList & ISetAdListAction & any> {
    componentDidMount(){
        try {
            const arr = eval(localStorage.getItem('myKey'));
            for (let i of arr) {
                this.props.setAdListAction(i);
            }
        }catch (e) {

        }
    }

    render() {
        return (
            <div className={styles.app}>
                <Form/>
                <Table/>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({adList: state.adList});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setAdListAction: (adList: IAdList) => {
        dispatch(setItemAdListAction(adList))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);