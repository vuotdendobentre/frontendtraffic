import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class PieChartBodyComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataPie: {
                labels: ["Vi phạm cả 2 lỗi", "Vượt đèn đỏ", "Không đội mũ bảo hiểm"],
                datasets: [
                    {
                        data: Object.values(this.props.data),
                        backgroundColor: [
                            "#F7464A",
                            "#46BFBD",
                            "#FDB45C",

                        ],
                        hoverBackgroundColor: [
                            "#FF5A5E",
                            "#5AD3D1",
                            "#FFC870",

                        ]
                    }
                ]
            }
        }
    }

   

    render() {
        console.log(this.state)
        return (
            <MDBContainer>
                <Pie data={this.state.dataPie} options={{ responsive: true }} />
            </MDBContainer>
        )
    }
}

export default PieChartBodyComponent