import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, registerables } from 'chart.js';

interface ChartStatisticSavingsProps {
    budget:number,
    expenses:number,
    savings:number
}

const CharStatisticSavings : React.FC<ChartStatisticSavingsProps> = ({budget,expenses,savings}) => {
    ChartJS.register(...registerables);
    return(
        <div style={{width:'50%',height:"20vh"}}>
        <h2>Podsumowanie budżetu</h2>
        <Doughnut data={{
            labels:["Przychody","Wydatki","Zaoszczędzone pieniądze"],
            datasets:[{
                label:'Podsumowanie budżetu',
                data: [budget,expenses,savings],
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