import React from "react";
import M from 'materialize-css';
import account_circle from '../../img/account_circle.png';
import mode_edit from '../../img/mode_edit.png';
import phone from '../../img/phone.png';
import common from '../../img/common.jpg';
import styles from './stylesForm.scss';
import {connect} from "react-redux";
import {IAdList, ISetAdListAction} from "../../interface/interfaces";
import {Dispatch} from "redux";
import setItemAdListAction from "../../redux/actions/setItemAdListAction";

class Form extends React.Component<IAdList & ISetAdListAction & any> {
    private Name: HTMLInputElement;
    private Phone: HTMLInputElement;
    private Message: HTMLTextAreaElement;
    private Photo: HTMLInputElement;
    private index: number;
    private re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    constructor(props) {
        super(props);
        this.handlerClick = this.handlerClick.bind(this);
    }

    componentDidMount() {
        M.updateTextFields();
    }

     handlerClick = () => {
        this.index = this.props.adList.length +1;
        const gg = this.re.test(this.Phone.value);
        let photoSrc:string;
        let obj: IAdList;
        if (
            this.Name.value.length === 0 ||
            this.Name.value.length > 100 ||
            this.Name.value === '') {
            M.toast({
                html:
                '<p>Неправильно заполнено поле имени, ' +
                '<br/> оно обязательно и должно иметь менее 100 символов' +
                '</p>'
            });
            return;
        }
        if (
            this.Phone.value.length === 0 ||
            this.Phone.value.length > 100 ||
            this.Phone.value === '' ||
            gg === false
        ) {
            M.toast({
                html:
                '<p>Неправильно заполнено поле тедефона, ' +
                '<br/> оно обязательно и должно иметь Российский формат' +
                '</p>'
            });
            return;
        }
        if (this.Message.value.length > 300) {
            return;
        }
        console.log(this.Photo.files[0]);
        let fr = new FileReader();
        fr.onload = (e) => {
            photoSrc = e.target.result;
            obj = {
                id: this.index,
                name: this.Name.value,
                phone: this.Phone.value,
                message: this.Message.value,
                photo: photoSrc
            };
            this.index++;
            this.props.setAdListAction(obj);
            localStorage.setItem('myKey', JSON.stringify(this.props.adList));
        };
        try {
            fr.readAsDataURL(this.Photo.files[0]);
        }
        catch (e) {
            obj = {
                id: this.index,
                name: this.Name.value,
                phone: this.Phone.value,
                message: this.Message.value,
                photo: 'https://avatars.mds.yandex.net/get-images-cbir/1079758/umz7j01c2PZv6iFHKCWVzg/preview'
            };
            this.index++;
            this.props.setAdListAction(obj);
            localStorage.setItem('myKey', JSON.stringify(this.props.adList));
        }



        console.log(fr);



    };

    render() {
        return (
            <div className={styles.form}>
                <form action="">
                    <div>
                        <div className="row">
                            <div className="col s12">
                                <div className={'row ' + styles.disflex}>
                                    <img className={styles.icon} src={account_circle} alt="#"/>
                                    <div className="input-field col s6">
                                        <input ref={input => this.Name = input}
                                               id="icon_prefix" type="text" className="validate"/>
                                        <label htmlFor="icon_prefix">Name</label>
                                    </div>
                                    <img className={styles.icon} src={phone} alt="#"/>
                                    <div className={'input-field col s6'}>
                                        <input
                                            ref={input => this.Phone = input}
                                            id="icon_telephone" type="tel" className="validate"/>
                                        <label htmlFor="icon_telephone">Telephone</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={'row ' + styles.disflex}>
                                <img className={styles.icon} src={mode_edit} alt="#"/>
                                <div className="col s12">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea
                                                ref={input => this.Message = input}
                                                id="icon_prefix2" className="materialize-textarea"/>
                                            <label htmlFor="icon_prefix2">Message</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'row '}>
                            <div className="file-field input-field col s9">
                                <div className="btn">
                                    <span>File</span>
                                    <input
                                        ref={input => this.Photo = input}
                                        type="file"/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"/>
                                </div>
                            </div>
                            <a
                                onClick={this.handlerClick}
                                style={{
                                    'marginTop': '18px',
                                    'marginLeft': '51px'
                                }}
                                className="col s2 waves-effect waves-light btn">button</a>
                        </div>
                    </div>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form);