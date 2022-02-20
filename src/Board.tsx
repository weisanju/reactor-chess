import React from "react";
import {Square} from "./Square";

export interface BoardProperties {
    chess: string[];
    xOrO: boolean,
    winner:string,
    handOnClick:(i:number)=>void
}

export class Board extends React.Component<BoardProperties,{}> {

    constructor(props: Readonly<BoardProperties>) {
        super(props);
    }

    renderSquare(i: number) {
        return <Square
            disabled={this.props.winner!=''}
            value={this.props.chess[i]} onClick={
            this.props.handOnClick.bind(this, i)
        }/>;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
