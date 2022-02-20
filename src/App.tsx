import React from "react";
import './App.css'
import {Board, BoardProperties} from "./Board";

interface GameAppState {
    history: BoardProperties[],
    stepNumber:number
}

class GameApp extends React.Component<{}, GameAppState> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            history: Array.of({
                chess: Array(9).fill(null),
                xOrO: true,
                winner: "",
                handOnClick: this.handleClick.bind(this)
            }),
            stepNumber:0
        }
    }

    render() {
        let status;
        let property = this.state.history[this.state.stepNumber];
        if (property.winner != "") {
            status = "the winner is:" + property.winner;
        } else if(property.chess.findIndex(e=>e==null)==-1){
            status = "this play is 平局";
        }else{
            status = "the next player is :" + this.getXorO(property.xOrO);
        }
        return (
            <>
                <div className="game">
                    <div className="game-board">
                        <Board {...property} />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{this.renderGoto()}</ol>
                    </div>
                </div>
            </>
        );
    }

    Goto(props: any) {
        //回到过去
        return <li className={props.stepNumber == props.index?"stepSelected":""}>
            <button onClick={props.handleGoto.bind(this,props.index)}>goto 第{props.index+1}步</button>
        </li>
    }
    handleGoto(index:number){
        this.setState({
            stepNumber: index
        })
    }

    renderGoto() {
        return this.state.history.map((e, index) => {
            if(index == this.state.history.length -1){
                return  null;
            }
            return <this.Goto key={index} index={index} stepNumber={this.state.stepNumber} handleGoto={this.handleGoto.bind(this)}/>
        })
    }


    //在当前历史的基础上加一个
    handleClick(i: number) {
        if (this.state.history[this.state.stepNumber].chess[i]) {
            return
        }

        //copy整个历史记录，以便 react作比较
        let end = this.state.stepNumber+1;
        let currentHistory = this.state.history.slice(0,end);
        let current = currentHistory[currentHistory.length - 1];

        //copy并修改棋盘
        let newChess = current.chess.slice();
        newChess[i] = this.getXorO(current.xOrO)

        let winner = this.calculatorWinner(newChess, i, current.xOrO);
        currentHistory.push({
            chess: newChess,
            xOrO: !current.xOrO,
            winner: winner,
            handOnClick: this.handleClick.bind(this)
        })
        this.setState({
            history: currentHistory
            ,stepNumber:end
        })
    }

    getXorO(xOrO?: boolean): string {
        return xOrO ? "x" : "o";
    }

    calculatorWinner(chess: string[], index: number, xOrO: boolean): string {
        let x = index % 3;
        let y = index / 3;
        let hit = true;
        // 1. x轴变
        for (let i = 0; i < 2; i++) {
            if (chess[i] != chess[i + 1]) {
                hit = false
                break;
            }
        }
        if (hit) {
            return this.getXorO(xOrO);
        }
        hit = true;
        // 2. y轴变
        for (let i = 0; i < 2; i++) {
            if (chess[x + i * 3] != chess[x + (i + 1) * 3]) {
                hit = false
                break;
            }
        }
        if (hit) {
            return this.getXorO(xOrO);
        }
        hit = true;
        //正向变化
        for (let i = 0; i < 2; i++) {
            if ((!chess[i * 4]) ||　chess[i * 4] != chess[(i + 1) * 4]) {
                hit = false
                break;
            }
        }
        if (hit) {
            console.log("0-4-8")
            return this.getXorO(xOrO);
        }
        hit = true;
        //逆向变化
        for (let i = 0; i < 2; i++) {
            if ((!chess[2 + i * 2]) || chess[2 + i * 2] != chess[2 + (i + 1) * 2]) {
                hit = false
                break;
            }
        }
        if (hit) {
            console.log("2-4-6")
            return this.getXorO(xOrO);
        }
        return "";
    }
}

export default GameApp;
