import { DoughnutController } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, registerables } from 'chart.js';

const CharStatisticSavings = (props:any) => {
    ChartJS.register(...registerables);
    return(
        <div style={{width:'50%',height:"20vh"}}>
        <h2>Podsumowanie budżetu</h2>
        <Doughnut data={{
            labels:["Przychody","Wydatki","Zaoszczędzone pieniądze"],
            datasets:[{
                label:'Podsumowanie budżetu',
                data: [props.budget,props.expenses,props.savings],
                backgroundColor:['green','red','lightblue']
            }],    
        }}
        height={200}
        width={200}
        options={{
            maintainAspectRatio:false
        }}>
        </Doughnut>  
        </div>
    )
}

export default CharStatisticSavings