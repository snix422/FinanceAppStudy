import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, registerables } from 'chart.js';

const ChartExpenses = (props:any) => {
    ChartJS.register(...registerables);
    return( 
        <Doughnut data={{
                    labels:["Kredyt","Zakupy","Rachunki","Paliwo"],
                    datasets:[{
                        label:'Wydatki',
                        data: [props.kredyt,props.zakupy,props.rachunki,props.paliwo],
                        backgroundColor:['green','red','lightblue','yellow']
                    }],    
                }}
                height={200}
                width={200}
                options={{
                    maintainAspectRatio:false
                }}>
        </Doughnut>
    )
}

export default ChartExpenses