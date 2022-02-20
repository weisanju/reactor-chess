import React from "react";

interface SquareProperties {
    value: string
    onClick:()=>void,
    disabled?:boolean;
}

export class Square extends React.Component<SquareProperties, {}> {

    constructor(props: Readonly<SquareProperties>) {
        super(props);
    }

    render() {
        return (
            <button className="square" onClick={()=>this.props.onClick()}  disabled={this.props.disabled}>
                {this.props.value}
            </button>
        );
    }
}

