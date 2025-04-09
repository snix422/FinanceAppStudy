import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, registerables } from 'chart.js';

interface ChartExpensesProps {
    kredyt:number,
    zakupy:number,
    rachunki:number,
    paliwo:number
}

const ChartExpenses : React.FC<ChartExpensesProps> = ({kredyt,zakupy,rachunki,paliwo}) => {
    ChartJS.register(...registerables);
    return( 
        <div style={{width:'50%',height:"20vh"}}>
        
        <h2>Kategorie wydatków</h2>
        <Doughnut data={{
                    labels:["Kredyt","Zakupy","Rachunki","Paliwo"],
                    datasets:[{
                        label:'Wydatki',
                        data: [kredyt,zakupy,rachunki,paliwo],
                        backgroundColor:['green','red','lightblue','yellow']
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

export default ChartExpenses