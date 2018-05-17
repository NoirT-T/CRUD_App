import React from "react";
import styles from './stylesTable.scss';
import {IAdList} from "../../interface/interfaces";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import removeItemAdListAction from "../../redux/actions/removeAdListItem.action";

class Table extends React.Component<any> {
    constructor(props){
        super(props);
    }
    handlerClick = (item) =>{
        this.props.removeItemAdListAction(item);
    };
    componentDidUpdate(){
        localStorage.clear();
        localStorage.setItem('myKey',JSON.stringify(this.props.adList));
    }
    showAD() {
        return this.props.adList.map((e:IAdList) => {
            return (
                <tr key={e.id}>
                    <th>{e.id}</th>
                    <th>{e.name}</th>
                    <th>{e.phone}</th>
                    <th>{e.message}</th>
                    <th style={{'width':'100px'}}>
                        <img width={'100px'} height={'100px'} src={e.photo} alt="#"/>
                    </th>
                    <th style={{'width':'100px'}}>
                        <a
                            onClick={()=>this.handlerClick(e.id)}
                            className="col s2 waves-effect waves-light btn">Удалить</a>
                    </th>
                </tr>
            )
        });
    }

    render() {
        return (
            <div className={styles.table}>
                <table className={'striped'}>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Photo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.showAD()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => ({adList: state.adList});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    removeItemAdListAction:(id:number)=>{
        dispatch(removeItemAdListAction(id))
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Table);