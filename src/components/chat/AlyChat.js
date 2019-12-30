import React, { Component } from 'react';
import PubNub from "pubnub";
import './App.css';
import ChatHistory from './ChatHistory';
import PubNubService from "./PubNubService";

const CHANNEL="SkiperDrive_1"
class AlyChat extends Component {
    
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            messages: [
                {
                    text:"foo1",
                }
            ],
            currentMessage: "",
            username: props.username,
            users:[]
        };

/**
 * export const PubNubPublishKey = "pub-c-bd68b062-738a-44e5-91a1-cfdab437d40f"
 * export const PubNubSubscribeKey = "sub-c-41661912-108b-11ea-9132-cacb72695e2d"
 */
        //init PubNub
        this.pubnub = new PubNub({
            publishKey: 'pub-c-bd68b062-738a-44e5-91a1-cfdab437d40f',
            subscribeKey: 'sub-c-41661912-108b-11ea-9132-cacb72695e2d',
            presenceTimeout: 30
        });

        //init presence service
        this.service = new PubNubService({
            pubnub:this.pubnub,
            channel: CHANNEL
        });

        //on users update, trigger screen refresh
        this.service.onUserChange((users) => this.setState({ users:users }));
        this.service.onMessage((evt) => {
            this.state.messages.push({
                text:evt.message.text,
                sender:evt.publisher
            });
            this.setState({
                messages: this.state.messages
            })
        });
        this.service.fetchHistory(10,(messages)=>{ this.setState({messages:messages}); });

        this.service.getSelfInfo((info)=>{
            if(info.username) this.setState({username: info.username})
        });
        
        this.service.setUserState({username:this.state.username})
        this.enterKeyHandler = this.enterKeyHandler.bind(this)
    }

    changedMessage() {
        this.setState({ currentMessage:this.refs.input.value });
    }
    sendMessage() {
        this.pubnub.publish({
            channel: CHANNEL,
            message: {
                text:this.refs.input.value,
                sender: this.pubnub.getUUID()

            }
        });
        this.setState({ currentMessage:"" })
    }

    enterKeyHandler(e){
        console.log(e.keyCode)
        console.log(this)
        if(e.keyCode == '13')
        {
            this.sendMessage();
        }
    }

    changedUsername() {
        this.setState({ username:this.refs.username.value });
    }
    setUsername() {
        this.service.setUserState({username:this.state.username})
    }


    renderUsers() {
        var users = this.state.users.map((user,i)=> {
            return <span key={i}>{user.username}</span>
        });
        return <div className="userlist">{users}</div>
    }

    render() {
        return (
            <div className="vbox fill">
                <div align="center" className="bg-secondary form-control">
                    <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                        <h4 className="fonts">Chat</h4>
                    </a>
                </div>
                <div className="collapse text-dark" id="collapseExample">
                    <div className="scroll grow ">
                        <ChatHistory messages={this.state.messages} service={this.service}/>
                    </div>
                    
                    <div className="hbox">
                        <input className="grow form-control"
                            ref="input"
                            type="text"
                            value={this.state.currentMessage}
                            onChange={this.changedMessage.bind(this)}
                            onKeyDown={this.enterKeyHandler}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={this.sendMessage.bind(this)}
                        >Enviar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AlyChat;
